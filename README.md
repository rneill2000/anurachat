# Anura Connect Chat Agent

An AI-powered chat widget that converses with Epic consulting candidates, collects their information, filters out CTs/ATEs, and pushes qualified leads to email + Bullhorn CRM.

## How It Works

1. **Candidate visits** the Join Our Team page on anuraconnect.com
2. **Chat widget** opens with a friendly greeting
3. **AI agent** (Claude) has a natural conversation to learn about them
4. **If they're a CT/ATE** — politely declines and ends the chat
5. **If qualified** — collects role type, Epic certs, pay rate, availability, contact info
6. **On completion** — emails you a summary + pushes to Bullhorn as a new Candidate record

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up your environment
cp .env.example .env
# Edit .env with your API keys (see below)

# 3. Run the server
npm start
# Server runs on http://localhost:3001
```

## Environment Setup

### Claude API Key (Required)
1. Go to https://console.anthropic.com
2. Create an API key
3. Add to `.env` as `ANTHROPIC_API_KEY`

### Email Notifications (Required)
For Gmail:
1. Enable 2FA on your Google account
2. Go to Google Account > Security > App Passwords
3. Generate a password for "Mail"
4. Add SMTP settings to `.env`

### Bullhorn CRM (Optional — but recommended)
1. Get API credentials from Bullhorn admin
2. Add client ID, secret, username, password to `.env`
3. The chatbot maps candidate data to these Bullhorn fields:
   - `firstName` / `lastName` — from candidate name
   - `email` / `phone` — contact info
   - `status` — "New Lead" or "Disqualified"
   - `source` — "Anura Connect Chat Widget"
   - `customText1` — Desired Role
   - `customText2` — Pay Rate
   - `customText3` — Availability
   - `customText4` — Epic Certifications
   - `customText5` — Experience

> **Note:** You may need to adjust the `customText` field mappings to match your Bullhorn configuration. Check your Bullhorn field setup and update `server.js` accordingly.

## Embedding on Your Website

### Option A: Squarespace (anuraconnect.com)

Since your site is on Squarespace, you'll embed via Code Injection:

1. **Deploy the server** (see Deployment below)
2. In Squarespace, go to the **Join Our Team** page
3. Click the page settings gear > **Advanced** > **Page Header Code Injection**
4. Paste this snippet, replacing `YOUR_SERVER_URL`:

```html
<script>
  // Load the Anura Connect chat widget
  (function() {
    var s = document.createElement('script');
    s.src = 'YOUR_SERVER_URL/widget-embed.js';
    s.async = true;
    document.body.appendChild(s);
  })();
</script>
```

### Option B: Any Website

Add this before `</body>`:

```html
<iframe
  src="YOUR_SERVER_URL/chat-widget.html"
  style="position:fixed; bottom:0; right:0; width:420px; height:620px; border:none; z-index:9999;"
  allow="clipboard-read; clipboard-write">
</iframe>
```

## Deployment Options

### Render.com (Recommended — free tier available)
1. Push this folder to a GitHub repo
2. Go to render.com > New Web Service
3. Connect your repo
4. Set environment variables from `.env`
5. Deploy — you'll get a URL like `https://anura-chat.onrender.com`

### Railway.app
1. `npm install -g @railway/cli`
2. `railway login && railway init`
3. `railway up`
4. Set env vars in Railway dashboard

### Vercel (Serverless)
Would need refactoring to serverless functions — not recommended for this use case since we need persistent Bullhorn auth state.

## File Structure

```
Chatbot/
  chat-widget.html  — The frontend chat UI (can be served standalone or embedded)
  server.js         — Express backend: Claude API, email, Bullhorn integration
  package.json      — Dependencies
  .env.example      — Environment variable template
  README.md         — This file
```

## Customization

### Change the conversation style
Edit the `SYSTEM_PROMPT` in `chat-widget.html` — this is the instruction set that tells Claude how to behave, what to ask, and when to disqualify.

### Change the color scheme
Edit the CSS variables at the top of `chat-widget.html` under `:root`.

### Add more disqualification rules
Update the system prompt and the `EXTRACTION_PROMPT` in `server.js`.

### Adjust Bullhorn field mapping
Edit the `candidatePayload` object in the `pushToBullhorn` function in `server.js`.
