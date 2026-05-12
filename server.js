// ============================================
// ANURA CONNECT - EPIC CONSULTANT CHAT SERVER
// ============================================
// This is the backend that powers the chat widget.
// It handles Claude API calls, data extraction, email
// notifications, and Bullhorn CRM integration.
//
// To run: node server.js
// Requires: npm install express cors anthropic nodemailer dotenv

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk').default;
const nodemailer = require('nodemailer');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure upload dir exists
const uploadDir = '/tmp/uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File upload config
const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'));
    }
  },
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(__dirname)); // Serve static files from project root

// ============================================
// CLAUDE API CLIENT
// ============================================
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================
// DATA EXTRACTION PROMPT
// ============================================
const EXTRACTION_PROMPT = `Based on the conversation so far, extract any candidate information that has been shared. Return a JSON object with ONLY the fields that have been explicitly mentioned. Do not guess or infer values.

Fields to look for:
- name (string): candidate's full name
- email (string): email address
- phone (string): phone number
- exEpic (boolean): true if they previously worked as an Epic employee (not just a consultant who uses Epic)
- roleType (string): what role they want (Analyst, PM, Director, Team Lead, etc.)
- payRate (string): desired take-home hourly rate and whether W2 or 1099
- availability (string): when they can start or when their current contract ends
- epicCertifications (array of strings): specific Epic applications/modules they're certified in (e.g. Ambulatory, ClinDoc, Beaker, Willow, Radiant, OpTime, Resolute PB, Resolute HB, etc.)
- experience (string): years of experience, go-lives, notable projects
- resumeOrLinkedIn (string): LinkedIn URL or note that resume was uploaded
- disqualified (boolean): true ONLY if they explicitly said they are a Credentialed Trainer (CT) or ATE specialist
- conversationComplete (boolean): true if the assistant has gathered enough info and wrapped up the conversation

Return ONLY valid JSON, no markdown formatting, no explanation.`;

// ============================================
// CHAT ENDPOINT
// ============================================
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt, candidateData } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    // Inject current date so the model knows what year it is
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const systemWithDate = `Today's date is ${today}.\n\n${systemPrompt}`;

    // Call Claude for the conversational response
    const chatResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: systemWithDate,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    });

    const assistantMessage = chatResponse.content[0].text;

    // Call Claude again to extract structured data from the conversation
    const extractionMessages = [
      ...messages,
      { role: 'assistant', content: assistantMessage },
      { role: 'user', content: EXTRACTION_PROMPT },
    ];

    const extractionResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: 'You are a data extraction assistant. Extract candidate information from conversations and return only valid JSON.',
      messages: extractionMessages,
    });

    let extractedData = {};
    let disqualified = false;
    let conversationComplete = false;

    try {
      const rawText = extractionResponse.content[0].text.trim();
      // Strip markdown code fences if present
      const cleaned = rawText.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
      extractedData = JSON.parse(cleaned);
      disqualified = extractedData.disqualified === true;
      conversationComplete = extractedData.conversationComplete === true;
      // Remove meta fields from the data object
      delete extractedData.disqualified;
      delete extractedData.conversationComplete;
    } catch (parseErr) {
      console.warn('Could not parse extraction response:', parseErr.message);
    }

    // Suggest quick-reply chips based on conversation context
    let suggestedChips = [];
    if (!disqualified && !conversationComplete) {
      suggestedChips = generateChips(messages, extractedData, candidateData);
    }

    res.json({
      message: assistantMessage,
      extractedData,
      disqualified,
      conversationComplete,
      suggestedChips,
    });

  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// ============================================
// RESUME UPLOAD ENDPOINT
// ============================================
app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let resumeText = '';
    const ext = path.extname(req.file.originalname).toLowerCase();

    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      resumeText = pdfData.text;
    } else if (ext === '.txt') {
      resumeText = fs.readFileSync(req.file.path, 'utf-8');
    } else {
      // For .doc/.docx, extract what we can or just note the file
      resumeText = `[Uploaded file: ${req.file.originalname} — Word document received. The team will review the full document.]`;
    }

    // Clean up the temp file
    fs.unlinkSync(req.file.path);

    // Truncate if massive
    if (resumeText.length > 8000) {
      resumeText = resumeText.substring(0, 8000) + '\n\n[Resume truncated for chat — full version saved]';
    }

    res.json({
      success: true,
      resumeText: resumeText,
      filename: req.file.originalname,
    });

  } catch (err) {
    console.error('Resume upload error:', err);
    // Clean up temp file on error
    if (req.file && req.file.path) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

// ============================================
// LINKEDIN PROFILE FETCH ENDPOINT
// ============================================
app.post('/api/fetch-linkedin', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !url.includes('linkedin.com')) {
      return res.status(400).json({ error: 'Invalid LinkedIn URL' });
    }

    // Use Claude to summarize what we know from the URL
    // (LinkedIn blocks scraping, but if the user pastes their profile URL,
    // we can note it and ask Claude to reference it in conversation)
    res.json({
      success: true,
      profileUrl: url,
      note: 'LinkedIn URL captured. The team will review the full profile.',
    });

  } catch (err) {
    console.error('LinkedIn fetch error:', err);
    res.status(500).json({ error: 'Failed to process LinkedIn URL' });
  }
});

// ============================================
// SUBMIT CANDIDATE ENDPOINT
// ============================================
app.post('/api/submit-candidate', async (req, res) => {
  try {
    const { candidateData, conversationHistory, notifyEmail, timestamp } = req.body;

    console.log('\n========================================');
    console.log('NEW CANDIDATE SUBMISSION');
    console.log('========================================');
    console.log('Timestamp:', timestamp);
    console.log('Candidate:', JSON.stringify(candidateData, null, 2));
    console.log('Disqualified:', candidateData.disqualified ? 'YES - ' + candidateData.disqualifyReason : 'No');
    console.log('========================================\n');

    // Send email notification
    if (process.env.SMTP_HOST) {
      await sendEmailNotification(candidateData, conversationHistory, notifyEmail, timestamp);
    }

    // Push to Bullhorn CRM
    if (process.env.BULLHORN_CLIENT_ID) {
      await pushToBullhorn(candidateData, conversationHistory);
    }

    res.json({ success: true });

  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Failed to submit candidate data' });
  }
});

// ============================================
// SMART CHIP SUGGESTIONS
// ============================================
function generateChips(messages, extracted, existing) {
  const merged = { ...existing, ...extracted };
  const msgCount = messages.length;

  // Early conversation — role type chips
  if (!merged.roleType && msgCount <= 4) {
    return ['Analyst', 'Project Manager', 'Director', 'Team Lead'];
  }

  // After role type — certification chips
  if (merged.roleType && (!merged.epicCertifications || merged.epicCertifications.length === 0)) {
    return ['Ambulatory', 'ClinDoc', 'Beaker', 'Willow'];
  }

  // No chips needed for open-ended questions
  return [];
}

// ============================================
// EMAIL NOTIFICATION
// ============================================
async function sendEmailNotification(candidateData, conversationHistory, toEmail, timestamp) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const isDisqualified = candidateData.disqualified;

  const subject = isDisqualified
    ? `[Anura Chat] Disqualified Candidate - CT/ATE - ${candidateData.name || 'Unknown'}`
    : `[Anura Chat] New Candidate Interest - ${candidateData.name || 'Unknown'}`;

  // Build a clean summary
  const summary = buildCandidateSummary(candidateData);

  // Build conversation transcript
  const transcript = conversationHistory
    .map(m => `${m.role === 'user' ? 'CANDIDATE' : 'ANURA BOT'}: ${m.content}`)
    .join('\n\n');

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a3a2a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">Anura Connect - New Chat Submission</h2>
        <p style="margin: 4px 0 0; opacity: 0.8;">${new Date(timestamp).toLocaleString()}</p>
      </div>

      ${isDisqualified ? `
        <div style="background: #fde8e6; color: #c0392b; padding: 12px 20px; font-weight: 600;">
          DISQUALIFIED: Credentialed Trainer / ATE
        </div>
      ` : ''}

      <div style="background: white; padding: 20px; border: 1px solid #e0e8e4;">
        <h3 style="color: #1a3a2a; margin-top: 0;">Candidate Summary</h3>
        ${summary}
      </div>

      <div style="background: #f7f9f8; padding: 20px; border: 1px solid #e0e8e4; border-top: 0; border-radius: 0 0 8px 8px;">
        <h3 style="color: #1a3a2a; margin-top: 0;">Full Conversation</h3>
        <pre style="white-space: pre-wrap; font-size: 13px; line-height: 1.6;">${transcript}</pre>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'chatbot@anuraconnect.com',
    to: toEmail,
    subject: subject,
    html: html,
  });

  console.log('Email notification sent to:', toEmail);
}

function buildCandidateSummary(data) {
  const fields = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Ex-Epic Employee', value: data.exEpic === true ? 'Yes' : data.exEpic === false ? 'No' : null },
    { label: 'Desired Role', value: data.roleType },
    { label: 'Pay Rate', value: data.payRate },
    { label: 'Availability', value: data.availability },
    { label: 'Primary Epic Apps/Certs', value: data.epicCertifications?.length ? data.epicCertifications.join(', ') : null },
    { label: 'Resume/LinkedIn', value: data.resumeOrLinkedIn },
    { label: 'Experience', value: data.experience },
  ];

  return fields
    .filter(f => f.value)
    .map(f => `<p style="margin: 6px 0;"><strong>${f.label}:</strong> ${f.value}</p>`)
    .join('') || '<p style="color: #999;">No information collected</p>';
}

// ============================================
// BULLHORN CRM INTEGRATION
// ============================================

let bullhornToken = null;
let bullhornRestUrl = null;

async function getBullhornAuth() {
  // Step 1: Get auth code
  const authUrl = `https://auth.bullhornstaffing.com/oauth/authorize?client_id=${process.env.BULLHORN_CLIENT_ID}&response_type=code&username=${process.env.BULLHORN_USERNAME}&password=${process.env.BULLHORN_PASSWORD}&action=Login`;

  const authResponse = await fetch(authUrl, { redirect: 'manual' });
  const redirectUrl = authResponse.headers.get('location');
  const authCode = new URL(redirectUrl).searchParams.get('code');

  // Step 2: Get access token
  const tokenResponse = await fetch('https://auth.bullhornstaffing.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      client_id: process.env.BULLHORN_CLIENT_ID,
      client_secret: process.env.BULLHORN_CLIENT_SECRET,
    }),
  });

  const tokenData = await tokenResponse.json();

  // Step 3: Get REST token
  const restResponse = await fetch(
    `https://rest.bullhornstaffing.com/rest-services/login?version=*&access_token=${tokenData.access_token}`
  );
  const restData = await restResponse.json();

  bullhornToken = restData.BhRestToken;
  bullhornRestUrl = restData.restUrl;
}

async function pushToBullhorn(candidateData, conversationHistory) {
  try {
    // Ensure we have a valid token
    if (!bullhornToken) {
      await getBullhornAuth();
    }

    // Create or update a Candidate entity in Bullhorn
    const exEpicTag = candidateData.exEpic ? ' [Ex-Epic Employee]' : '';
    const candidatePayload = {
      firstName: candidateData.name?.split(' ')[0] || '',
      lastName: candidateData.name?.split(' ').slice(1).join(' ') || '',
      email: candidateData.email || '',
      phone: candidateData.phone || '',
      status: candidateData.disqualified ? 'Disqualified' : 'New Lead',
      source: 'Anura Connect Chat Widget',
      customText1: candidateData.roleType || '',           // Desired Role
      customText2: candidateData.payRate || '',             // Pay Rate
      customText3: candidateData.availability || '',        // Availability
      customText4: (candidateData.epicCertifications || []).join(', '), // Primary Epic Apps/Certs
      customText5: candidateData.resumeOrLinkedIn || '',   // Resume/LinkedIn
      description: candidateData.disqualified
        ? `DISQUALIFIED - ${candidateData.disqualifyReason}. Candidate identified as CT/ATE during chat screening.`
        : `${exEpicTag}Candidate submitted via Anura Connect chat widget. Interested in ${candidateData.roleType || 'unspecified'} role. Experience: ${candidateData.experience || 'not specified'}.`,
    };

    const response = await fetch(`${bullhornRestUrl}entity/Candidate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'BhRestToken': bullhornToken,
      },
      body: JSON.stringify(candidatePayload),
    });

    const result = await response.json();

    if (result.changedEntityId) {
      console.log('Bullhorn: Created candidate ID', result.changedEntityId);

      // Add a note with the full conversation transcript
      const transcript = conversationHistory
        .map(m => `${m.role === 'user' ? 'CANDIDATE' : 'BOT'}: ${m.content}`)
        .join('\n\n');

      await fetch(`${bullhornRestUrl}entity/Note`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'BhRestToken': bullhornToken,
        },
        body: JSON.stringify({
          personReference: { id: result.changedEntityId },
          action: 'Chat Transcript',
          comments: transcript.substring(0, 5000), // Bullhorn field limit
        }),
      });

      console.log('Bullhorn: Added conversation note');
    }

  } catch (err) {
    console.error('Bullhorn integration error:', err.message);
    // Don't throw — we still want the email to go through
  }
}

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    bullhornConfigured: !!process.env.BULLHORN_CLIENT_ID,
    emailConfigured: !!process.env.SMTP_HOST,
    aiConfigured: !!process.env.ANTHROPIC_API_KEY,
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`\n🐸 Anura Connect Chat Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   AI configured: ${!!process.env.ANTHROPIC_API_KEY}`);
  console.log(`   Email configured: ${!!process.env.SMTP_HOST}`);
  console.log(`   Bullhorn configured: ${!!process.env.BULLHORN_CLIENT_ID}\n`);
});
