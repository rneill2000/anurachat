// ============================================
// ANURA CONNECT - EMBEDDABLE CHAT WIDGET
// ============================================
// Drop this script on any page to add the Leap chat widget.
// Usage: <script src="https://anurachat-production.up.railway.app/widget-embed.js" async></script>
//
// The widget creates its own isolated DOM elements with prefixed
// class names and inline styles so it won't conflict with the host site.

(function () {
  'use strict';

  // Prevent double-loading
  if (window.__anuraChatLoaded) return;
  window.__anuraChatLoaded = true;

  // ============================================
  // CONFIGURATION
  // ============================================
  var API_URL = 'https://anurachat-production.up.railway.app/api/chat';
  var NOTIFY_EMAIL = 'hello@anuraconnect.com';

  // ============================================
  // SYSTEM PROMPT
  // ============================================
  var SYSTEM_PROMPT = "You are Leap — the chat assistant for Anura Connect, named after the Anura frog mascot. You're chatting with Epic consultants who are visiting the Anura Connect website. Some found the site on their own and are actively exploring, others were sent a link by someone on the Anura team. You don't know which — so don't assume either way. Your job is to hook them fast with something they care about (what the market looks like for their modules, rate transparency, what they could be making) and get their info before they bounce. If someone asks your name, tell them you're Leap.\n\n## YOUR CONVERSATION FLOW\n\nYou're warm but efficient. Respect their time. Get to the point, then build the relationship.\n\nThey might be actively looking or just casually browsing. Either way, you have a small window. Every message needs to either give them something valuable or move toward getting their info. Don't waste messages on fluff.\n\n**Message 1 (greeting):** Already sent. It introduces you, drops the rate transparency hook, and asks what Epic apps they're in. Leads with value AND asks for info.\n**Message 2 (they respond with their apps/modules):** Give them something they can't get elsewhere — what the market looks like for their specific modules right now. Be specific: \"Beaker is on fire right now\" or \"Rev cycle is always steady.\" Then ask: are they on a contract right now or between gigs? When are they available?\n**Message 3:** Ask if they came out of Epic or the consulting side, and what kind of role they want next (analyst, PM, director, team lead). Keep giving value — relate their situation to what Anura is seeing.\n**Message 4:** Ask for a resume or LinkedIn. Be direct: \"If you drop your resume or LinkedIn here I can get your profile set up with the right apps and certs — that way when something hits for your modules, we can move fast.\" If they don't have one handy, ask them to list their primary certifications.\n**Message 5:** Get their name and contact info. \"What's the best way to reach you — email or cell?\"\n**Message 6+:** Answer questions, share more about Anura's benefits, make warm handoffs to team members.\n\nThe goal: by message 5 you have their apps/certs, availability, ex-Epic status, role type, resume or LinkedIn, and contact info. That's a complete Bullhorn record. Everything after that is relationship building.\n\n## STYLE RULES\n\n- Short, casual messages. 1-3 sentences max. This is chat, not email.\n- React genuinely but briefly — then move the conversation forward.\n- ONE question at a time. Never stack questions.\n- Share useful market intel when relevant.\n- Use casual language: \"Oh nice.\" \"Gotcha.\" \"No kidding.\" \"That's solid.\"\n- Match their energy. Brief for brief, chatty for chatty.\n\nNEVER say:\n- \"I'd love to learn more about your experience\"\n- \"Could you tell me about your background?\"\n- \"What are your career goals?\"\n- Anything that sounds like a recruiter script or HR intake form\n\n## WHAT YOU MUST LEARN (in priority order)\n\n1. **Are they ex-Epic?** Did they work at Epic before becoming a consultant? This affects placement. Ask early — \"Did you come out of Epic or did you come in from the consulting side?\"\n2. **Availability date.** When are they coming off their current contract? Already available? Can they overlap? This is the #1 operational question.\n3. **What roles/modules they want.** Analyst, PM, director, team lead — and in which Epic applications.\n4. **Their certifications and primary applications.** This is what goes into Bullhorn. You need specific Epic app names — Ambulatory, ClinDoc, Beaker, Willow, Radiant, OpTime, Resolute PB/HB, etc. If they share a resume, pull these out. If not, ask directly.\n5. **Resume or LinkedIn profile.** Ask them to attach a resume or paste their LinkedIn URL. This is how the team gets the full picture and sets up their Bullhorn profile correctly. Frame it as: \"this way we can make sure your certs and apps are right.\"\n6. **Rate transparency pitch.** Once you know they're a real candidate, tell them about Anura's 1/3-2/3 split. This is a differentiator — most firms won't tell you what the client pays. Anura shows you the bill rate and your take-home. No hidden margins.\n7. **Contact info.** Name, email or phone. This closes the loop so the team can follow up.\n8. **Pay rate expectations.** What they want for take-home (hourly), W2 or 1099 preference.\n9. **Experience level.** Go-lives, years in Epic, notable projects. Often comes from the resume.\n\n## GIVE VALUE — DON'T JUST TAKE\n\nThe Epic market is shifting. Use what you know to make this worth their time:\n\n- Rev cycle is consistently in demand\n- Beaker has been really hot lately\n- PM roles are growing — Epic is rolling out agentic AI / AI factory to health systems, creating more need for people who can oversee AI initiatives\n- Epic is expanding into life sciences and payer spaces\n- Some modules are crazy hot right now, others have cooled off\n- A lot of consultants don't realize how much of their bill rate gets eaten by overhead at the big firms\n- The market has seen tons of acquisitions — not many small firms left\n\nShare this when it's relevant to what they tell you. Be a useful conversation partner.\n\n## ABOUT ANURA (weave in when it fits)\n\n**The Story:**\n- Founded by former Epic, Bluetree, and Nordic leaders. Rachel Neill (President) was one of the first 10 people at Nordic. Bill Neill is CEO.\n- They saw the Epic market getting consolidated — lots of acquisitions, quality dropping, firms just warm-bodying seats. They started Anura to bring it back old school.\n- Woman + minority-owned business. Independent firm, not beholden to shareholders.\n- Also run Carex Consulting Group for non-Epic health tech staffing (Abridge, Rhythm, Tiger Connect, etc.)\n\n**Why consultants love it:**\n- Transparent margins: 1/3 to 2/3 split of the bill rate. You see what the client pays and what you take home. No games.\n- Higher take-home pay than the big firms because of lean operations.\n- Flexible roles: full-time or fractional. You choose the contracts that work for your life.\n- They even allow direct hires — if you're a perfect match for a client, you can transition to full-time seamlessly.\n\n**Benefits:**\n- ICHRA health plan: pick any marketplace plan you want, Anura contributes $620/month. You keep your plan even between contracts.\n- Delta Dental coverage. Delta Vision plan.\n- 401(k) through Guideline with pre-tax AND Roth options, potential employer match.\n- FSA for medical and dependent care expenses.\n- Employee Directed Charitable Giving.\n- HausKey advocacy service.\n\n**The team:**\n- Rachel Neill — President, former Nordic exec\n- Bill Neill — CEO, former Epic employee turned consultant\n- Ben Gray — VP Business Development, former Epic ambulatory consultant\n- Nicole Meidinger — Chief Revenue Officer\n- Melissa Alfiero — VP Business Development\n- Peter Oppermann — VP Business Development\n- Daniel Neill — Director of Finance & Operations\n- Suzie Hall — Candidate Experience Director\n\n## WHEN THEY SHARE A RESUME OR LINKEDIN\n\n- Actually read it. Reference specific things.\n- React like Rachel would: \"Oh nice, you were at [health system]? That's a solid build.\"\n- Don't summarize their resume back to them bullet by bullet. Pick out the 1-2 most interesting things.\n- If they paste a LinkedIn URL but you can't see the full profile, say something like: \"Got your LinkedIn — I'll make sure the team checks it out. In the meantime, what are you working on right now?\"\n\n## THE ONE HARD RULE\n\nIf they're a Credentialed Trainer (CT) or ATE specialist — Anura doesn't place those. Be cool: \"Ah gotcha — we're focused on the certified consultant side right now, so we don't have CT/ATE placements. That could change down the road though. Appreciate you chatting!\" Then wrap up.\n\n## WRAPPING UP\n\nKeep it casual: \"This is really helpful — I'm gonna pass this along to the team and get you connected with the right person. What's the best way to reach you?\"\n\nYou can name-drop team members: \"I think Ben Gray would be great for you to talk to — he's our ambulatory guy.\"\n\nSame vibe the whole way through. Never get stiff at the end.";

  // ============================================
  // INJECT STYLES
  // ============================================
  var style = document.createElement('style');
  style.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600&display=swap");',

    // Launcher
    '#anura-embed-launcher {',
    '  position: fixed; bottom: 24px; right: 24px; width: 64px; height: 64px;',
    '  border-radius: 50%; background: #0e2e47; border: 2px solid #53a2be;',
    '  cursor: pointer; box-shadow: 0 4px 24px rgba(14,46,71,0.15);',
    '  display: flex; align-items: center; justify-content: center;',
    '  transition: transform 0.2s, box-shadow 0.2s; z-index: 2147483646;',
    '  padding: 0; overflow: hidden; outline: none;',
    '}',
    '#anura-embed-launcher:hover {',
    '  transform: scale(1.08); box-shadow: 0 6px 32px rgba(23,96,135,0.3);',
    '}',

    // Notification dot
    '#anura-embed-launcher .anura-notif {',
    '  position: absolute; top: -2px; right: -2px; width: 18px; height: 18px;',
    '  background: #e74c3c; border-radius: 50%; border: 2px solid #fff;',
    '  display: block;',
    '}',

    // Container
    '#anura-embed-container {',
    '  position: fixed; bottom: 100px; right: 24px; width: 420px;',
    '  max-width: calc(100vw - 32px); height: 620px; max-height: calc(100vh - 140px);',
    '  background: #ffffff; border-radius: 12px;',
    '  box-shadow: 0 4px 24px rgba(14,46,71,0.15);',
    '  display: none; flex-direction: column; overflow: hidden;',
    '  z-index: 2147483647; font-family: "Nunito Sans","Helvetica Neue",Helvetica,Arial,sans-serif;',
    '  color: #0e2e47; font-size: 14px; line-height: 1.5;',
    '}',
    '#anura-embed-container.anura-open {',
    '  display: flex; animation: anuraSlideUp 0.3s ease-out;',
    '}',
    '@keyframes anuraSlideUp {',
    '  from { opacity:0; transform:translateY(16px); }',
    '  to { opacity:1; transform:translateY(0); }',
    '}',

    // Header
    '.anura-e-header {',
    '  background: #fff; padding: 18px 20px; display: flex; align-items: center;',
    '  gap: 12px; flex-shrink: 0; border-bottom: 1px solid #e0e4e8;',
    '}',
    '.anura-e-header img { height: 36px; width: auto; flex-shrink: 0; }',
    '.anura-e-header-info { flex: 1; }',
    '.anura-e-header-title {',
    '  color: #0e2e47; font-size: 16px; font-weight: 600; margin: 0; padding: 0;',
    '}',
    '.anura-e-header-sub {',
    '  color: #596e8a; font-family: "Manrope",sans-serif; font-size: 12px;',
    '  font-weight: 500; margin: 2px 0 0; padding: 0;',
    '}',
    '.anura-e-close {',
    '  background: none; border: none; color: #596e8a; cursor: pointer;',
    '  padding: 4px; font-size: 20px; line-height: 1; transition: color 0.2s;',
    '}',
    '.anura-e-close:hover { color: #0e2e47; }',

    // Messages
    '.anura-e-msgs {',
    '  flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;',
    '  padding: 16px; display: flex; flex-direction: column; gap: 12px;',
    '  scroll-behavior: smooth; overscroll-behavior: contain;',
    '}',
    '.anura-e-msgs::-webkit-scrollbar { width: 6px; }',
    '.anura-e-msgs::-webkit-scrollbar-track { background: transparent; }',
    '.anura-e-msgs::-webkit-scrollbar-thumb { background: #e0e4e8; border-radius: 3px; }',

    // Bubbles
    '.anura-e-msg {',
    '  max-width: 85%; padding: 12px 16px; border-radius: 8px;',
    '  font-size: 14px; line-height: 1.5; animation: anuraFadeIn 0.3s ease-out;',
    '  margin: 0; box-sizing: border-box;',
    '}',
    '@keyframes anuraFadeIn {',
    '  from { opacity:0; transform:translateY(6px); }',
    '  to { opacity:1; transform:translateY(0); }',
    '}',
    '.anura-e-msg.anura-bot {',
    '  background: #fafafa; color: #0e2e47; align-self: flex-start;',
    '  border-bottom-left-radius: 4px;',
    '}',
    '.anura-e-msg.anura-user {',
    '  background: #176087; color: #fff; align-self: flex-end;',
    '  border-bottom-right-radius: 4px;',
    '}',
    '.anura-e-msg.anura-system {',
    '  background: #fef3e2; color: #e67e22; align-self: center;',
    '  text-align: center; font-size: 13px; border-radius: 8px; max-width: 90%;',
    '}',
    '.anura-e-msg.anura-error {',
    '  background: #fde8e6; color: #c0392b; align-self: center;',
    '  text-align: center; font-size: 13px;',
    '}',

    // Typing dots
    '.anura-e-typing {',
    '  display: flex; gap: 4px; padding: 12px 16px; align-self: flex-start;',
    '  background: #fafafa; border-radius: 8px; border-bottom-left-radius: 4px;',
    '}',
    '.anura-e-dot {',
    '  width: 8px; height: 8px; border-radius: 50%; background: #596e8a;',
    '  animation: anuraBounce 1.4s infinite;',
    '}',
    '.anura-e-dot:nth-child(2) { animation-delay: 0.2s; }',
    '.anura-e-dot:nth-child(3) { animation-delay: 0.4s; }',
    '@keyframes anuraBounce {',
    '  0%,60%,100% { transform:translateY(0); opacity:0.4; }',
    '  30% { transform:translateY(-6px); opacity:1; }',
    '}',

    // Chips
    '.anura-e-chips {',
    '  display: flex; flex-wrap: wrap; gap: 8px; padding: 4px 0;',
    '  align-self: flex-start; max-width: 90%;',
    '}',
    '.anura-e-chip {',
    '  background: #fff; border: 1.5px solid #53a2be; color: #0e2e47;',
    '  padding: 8px 14px; border-radius: 20px; font-size: 13px;',
    '  font-weight: 500; cursor: pointer; transition: all 0.2s;',
    '  font-family: inherit;',
    '}',
    '.anura-e-chip:hover { background: #176087; color: #fff; }',

    // Input area
    '.anura-e-input-area {',
    '  padding: 12px 16px; border-top: 1px solid #e0e4e8; display: flex;',
    '  gap: 8px; align-items: flex-end; flex-shrink: 0; background: #fff;',
    '}',
    '.anura-e-input-area textarea {',
    '  flex: 1; border: 1.5px solid #e0e4e8; border-radius: 8px;',
    '  padding: 10px 14px; font-size: 14px; font-family: inherit;',
    '  resize: none; min-height: 42px; max-height: 100px; line-height: 1.4;',
    '  outline: none; transition: border-color 0.2s; color: #0e2e47;',
    '  box-sizing: border-box; background: #fff; margin: 0;',
    '}',
    '.anura-e-input-area textarea:focus { border-color: #53a2be; }',
    '.anura-e-input-area textarea::placeholder { color: #596e8a; }',
    '.anura-e-send {',
    '  width: 42px; height: 42px; border-radius: 50%; background: #0e2e47;',
    '  border: none; cursor: pointer; display: flex; align-items: center;',
    '  justify-content: center; transition: background 0.2s, transform 0.1s;',
    '  flex-shrink: 0; padding: 0;',
    '}',
    '.anura-e-send:hover { background: #176087; }',
    '.anura-e-send:active { transform: scale(0.95); }',
    '.anura-e-send:disabled { opacity: 0.5; cursor: not-allowed; }',
    '.anura-e-send svg { width: 18px; height: 18px; fill: #fff; }',

    // Upload
    '.anura-e-upload {',
    '  width: 42px; height: 42px; border-radius: 50%; background: transparent;',
    '  border: 1.5px solid #e0e4e8; cursor: pointer; display: flex;',
    '  align-items: center; justify-content: center; transition: all 0.2s;',
    '  flex-shrink: 0; padding: 0;',
    '}',
    '.anura-e-upload:hover { border-color: #53a2be; background: #fafafa; }',
    '.anura-e-upload svg { width: 18px; height: 18px; fill: #596e8a; }',
    '.anura-e-upload:hover svg { fill: #53a2be; }',

    // File badge
    '.anura-e-file-badge {',
    '  display: flex; align-items: center; gap: 6px; padding: 6px 12px;',
    '  background: #fafafa; border: 1px solid #e0e4e8; border-radius: 8px;',
    '  font-size: 12px; color: #596e8a; margin: 0 16px 4px;',
    '}',
    '.anura-e-file-badge .anura-fn { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }',
    '.anura-e-file-badge .anura-fr { cursor:pointer; font-weight:bold; color:#c0392b; padding:0 2px; }',

    // Footer
    '.anura-e-footer {',
    '  text-align: center; padding: 8px; font-size: 11px; color: #596e8a;',
    '  border-top: 1px solid #e0e4e8; flex-shrink: 0;',
    '}',

    // Mobile
    '@media (max-width: 480px) {',
    '  #anura-embed-container {',
    '    width: 100vw; height: 100vh; height: 100dvh;',
    '    max-height: 100vh; max-height: 100dvh;',
    '    bottom: 0; right: 0; border-radius: 0; animation: none;',
    '  }',
    '  #anura-embed-launcher { bottom: 16px; right: 16px; width: 56px; height: 56px; }',
    '  .anura-e-header { padding: 14px 16px; gap: 10px; }',
    '  .anura-e-header img { height: 30px; }',
    '  .anura-e-header-title { font-size: 15px; }',
    '  .anura-e-header-sub { font-size: 11px; }',
    '  .anura-e-close { font-size: 24px; padding: 8px; }',
    '  .anura-e-msgs { padding: 12px; }',
    '  .anura-e-msg { max-width: 88%; font-size: 15px; padding: 10px 14px; }',
    '  .anura-e-input-area { padding: 10px 12px; padding-bottom: max(10px, env(safe-area-inset-bottom)); gap: 6px; }',
    '  .anura-e-input-area textarea { font-size: 16px; padding: 10px 12px; min-height: 44px; }',
    '  .anura-e-send, .anura-e-upload { width: 44px; height: 44px; }',
    '  .anura-e-file-badge { margin: 0 12px 4px; }',
    '  .anura-e-footer { padding: 6px; padding-bottom: max(6px, env(safe-area-inset-bottom)); font-size: 10px; }',
    '  .anura-e-chip { padding: 10px 14px; font-size: 14px; }',
    '  .anura-e-typing { padding: 10px 14px; }',
    '}',
    '@media (max-width: 360px) {',
    '  .anura-e-msg { max-width: 92%; font-size: 14px; }',
    '  .anura-e-header img { height: 26px; }',
    '  .anura-e-header-title { font-size: 14px; }',
    '}',
    '@media (max-height: 500px) and (orientation: landscape) {',
    '  #anura-embed-container { width:100vw; height:100vh; height:100dvh; bottom:0; right:0; border-radius:0; }',
    '  .anura-e-header { padding: 8px 16px; }',
    '  .anura-e-header img { height: 24px; }',
    '  .anura-e-msgs { padding: 8px 12px; }',
    '  .anura-e-msg { padding: 8px 12px; font-size: 14px; }',
    '  .anura-e-footer { padding: 4px; font-size: 9px; }',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  // ============================================
  // BUILD DOM
  // ============================================

  // Launcher button
  var launcher = document.createElement('button');
  launcher.id = 'anura-embed-launcher';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML =
    '<img src="https://images.squarespace-cdn.com/content/v1/671fb0d9fec6997ddc5025cd/92f20ce5-ff1c-4261-b22c-447860ad3f25/icononly_nobuffer.png?format=100w" alt="Chat" style="width:40px;height:40px;border-radius:50%;object-fit:contain;">' +
    '<span class="anura-notif"></span>';
  document.body.appendChild(launcher);

  // Chat container
  var container = document.createElement('div');
  container.id = 'anura-embed-container';
  container.innerHTML = [
    '<div class="anura-e-header">',
    '  <img src="https://images.squarespace-cdn.com/content/v1/671fb0d9fec6997ddc5025cd/79107203-ad2e-4d39-96a6-5faa3f2f70bf/fulllogo_transparent_nobuffer.png?format=300w" alt="Anura Connect">',
    '  <div class="anura-e-header-info">',
    '    <div class="anura-e-header-title">Chat with Leap</div>',
    '    <div class="anura-e-header-sub">Your Epic Career Guide</div>',
    '  </div>',
    '  <button class="anura-e-close" aria-label="Close chat">&times;</button>',
    '</div>',
    '<div class="anura-e-msgs" id="anura-e-msgs"></div>',
    '<div id="anura-e-file-area"></div>',
    '<div class="anura-e-input-area">',
    '  <input type="file" id="anura-e-file-input" accept=".pdf,.doc,.docx,.txt" style="display:none">',
    '  <button class="anura-e-upload" aria-label="Attach resume" title="Attach your resume">',
    '    <svg viewBox="0 0 24 24"><path d="M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6h-1.5v9.5a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6H16.5z"/></svg>',
    '  </button>',
    '  <textarea id="anura-e-input" placeholder="Type your message..." rows="1"></textarea>',
    '  <button class="anura-e-send" id="anura-e-send" aria-label="Send">',
    '    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    '  </button>',
    '</div>',
    '<div class="anura-e-footer">anuraconnect.com</div>',
  ].join('\n');
  document.body.appendChild(container);

  // ============================================
  // CHAT STATE
  // ============================================
  var conversationHistory = [];
  var candidateData = {
    name: null, email: null, phone: null, exEpic: null,
    roleType: null, payRate: null, availability: null,
    epicCertifications: [], experience: null,
    resumeOrLinkedIn: null, disqualified: false, disqualifyReason: null,
  };
  var isProcessing = false;
  var conversationComplete = false;
  var hasSubmitted = false;
  var pendingFile = null;

  // ============================================
  // DOM REFERENCES
  // ============================================
  var msgsEl = document.getElementById('anura-e-msgs');
  var inputEl = document.getElementById('anura-e-input');
  var sendBtn = document.getElementById('anura-e-send');
  var fileInput = document.getElementById('anura-e-file-input');
  var fileArea = document.getElementById('anura-e-file-area');
  var closeBtn = container.querySelector('.anura-e-close');
  var uploadBtn = container.querySelector('.anura-e-upload');

  // ============================================
  // EVENT LISTENERS
  // ============================================
  launcher.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', sendMessage);
  uploadBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () { handleFileSelect(fileInput); });

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  inputEl.addEventListener('input', function () {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
  });

  // Mobile keyboard handling
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', function () {
      if (container.classList.contains('anura-open')) {
        container.style.height = window.visualViewport.height + 'px';
        msgsEl.scrollTop = msgsEl.scrollHeight;
      }
    });
    window.visualViewport.addEventListener('scroll', function () {
      if (container.classList.contains('anura-open')) {
        container.style.bottom = '0px';
      }
    });
  }

  container.addEventListener('touchmove', function (e) {
    if (msgsEl && msgsEl.contains(e.target)) return;
    e.preventDefault();
  }, { passive: false });

  // ============================================
  // UI FUNCTIONS
  // ============================================
  function toggleChat() {
    if (container.classList.contains('anura-open')) {
      container.classList.remove('anura-open');
      launcher.style.display = 'flex';
    } else {
      container.classList.add('anura-open');
      launcher.style.display = 'none';
      if (conversationHistory.length === 0) sendBotGreeting();
    }
  }

  function addMsg(text, type) {
    var el = document.createElement('div');
    el.className = 'anura-e-msg anura-' + type;
    el.textContent = text;
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return el;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'anura-e-typing';
    el.id = 'anura-e-typing';
    el.innerHTML = '<div class="anura-e-dot"></div><div class="anura-e-dot"></div><div class="anura-e-dot"></div>';
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('anura-e-typing');
    if (el) el.remove();
  }

  function setInputEnabled(on) {
    inputEl.disabled = !on;
    sendBtn.disabled = !on;
    if (on) inputEl.focus();
  }

  // ============================================
  // FILE HANDLING
  // ============================================
  function handleFileSelect(input) {
    var file = input.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      addMsg('That file is too large — keep it under 10MB.', 'error');
      input.value = '';
      return;
    }
    pendingFile = file;
    fileArea.innerHTML =
      '<div class="anura-e-file-badge">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg>' +
      '<span class="anura-fn">' + file.name + '</span>' +
      '<span class="anura-fr" id="anura-e-file-rm">&times;</span>' +
      '</div>';
    document.getElementById('anura-e-file-rm').addEventListener('click', clearFile);
  }

  function clearFile() {
    pendingFile = null;
    fileArea.innerHTML = '';
    fileInput.value = '';
  }

  async function uploadResume(file) {
    var formData = new FormData();
    formData.append('resume', file);
    var baseUrl = API_URL.replace('/api/chat', '');
    var resp = await fetch(baseUrl + '/api/upload-resume', { method: 'POST', body: formData });
    if (!resp.ok) throw new Error('Upload failed');
    return await resp.json();
  }

  function detectLinkedIn(text) {
    var m = text.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[^\s]+/i);
    return m ? m[0] : null;
  }

  async function captureLinkedIn(url) {
    var baseUrl = API_URL.replace('/api/chat', '');
    var resp = await fetch(baseUrl + '/api/fetch-linkedin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
    });
    if (!resp.ok) throw new Error('LinkedIn capture failed');
    return await resp.json();
  }

  // ============================================
  // CONVERSATION LOGIC
  // ============================================
  async function sendBotGreeting() {
    showTyping();
    await sleep(800);
    hideTyping();
    var greeting = "Hey! I'm Leap — Anura Connect's Epic career guide. Whether you're exploring what's out there or someone on our team pointed you this way, I can help. We're one of the few independent Epic firms left, and we do things differently — you see the full bill rate upfront, not just your cut. What Epic apps are you working in? I can tell you what we're seeing in the market for your modules.";
    addMsg(greeting, 'bot');
    conversationHistory.push({ role: 'assistant', content: greeting });

    // Remove notification dot after greeting is shown
    var notif = launcher.querySelector('.anura-notif');
    if (notif) notif.style.display = 'none';
  }

  async function sendMessage() {
    var text = inputEl.value.trim();
    if ((!text && !pendingFile) || isProcessing || conversationComplete) return;

    addMsg(text || '(attached resume)', 'user');
    inputEl.value = '';
    inputEl.style.height = 'auto';

    // Remove any chips
    var chips = msgsEl.querySelectorAll('.anura-e-chips');
    chips.forEach(function (c) { c.remove(); });

    var messageContent = text;
    isProcessing = true;
    setInputEnabled(false);
    showTyping();

    try {
      // Handle file upload
      if (pendingFile) {
        try {
          var uploadResult = await uploadResume(pendingFile);
          if (uploadResult.success && uploadResult.resumeText) {
            var ctx = '[Candidate shared their resume: ' + uploadResult.filename + ']\n\nResume content:\n' + uploadResult.resumeText;
            messageContent = text ? text + '\n\n' + ctx : ctx;
          }
        } catch (e) {
          addMsg("Had trouble reading that file — could you try again or just tell me about your background?", 'system');
        }
        clearFile();
      }

      // Detect LinkedIn
      var liUrl = detectLinkedIn(messageContent);
      if (liUrl) {
        try { await captureLinkedIn(liUrl); } catch (e) {}
        messageContent = messageContent.replace(liUrl, '[Candidate shared their LinkedIn profile: ' + liUrl + ']');
      }

      conversationHistory.push({ role: 'user', content: messageContent });

      // Add a timeout so users aren't stuck waiting forever
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 30000);

      var resp;
      try {
        resp = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: conversationHistory,
            systemPrompt: SYSTEM_PROMPT,
            candidateData: candidateData,
          }),
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!resp.ok) throw new Error('API error: ' + resp.status);
      var data = await resp.json();

      hideTyping();
      addMsg(data.message, 'bot');
      conversationHistory.push({ role: 'assistant', content: data.message });

      if (data.extractedData) Object.assign(candidateData, data.extractedData);

      if (data.disqualified) {
        candidateData.disqualified = true;
        candidateData.disqualifyReason = 'CT/ATE';
        conversationComplete = true;
        setInputEnabled(false);
        submitCandidate(); // fire-and-forget
        isProcessing = false;
        return;
      }

      if (data.conversationComplete) {
        conversationComplete = true;
        submitCandidate(); // fire-and-forget
        setInputEnabled(false);
        isProcessing = false;
        return;
      }
    } catch (err) {
      hideTyping();
      console.error('Anura chat error:', err);
      if (err.name === 'AbortError') {
        addMsg("That took too long — could you try sending that again?", 'error');
      } else {
        addMsg("I'm having a little trouble connecting right now. Could you try again in a moment?", 'error');
      }
      // Remove the failed user message from history so they can retry
      if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1].role === 'user') {
        conversationHistory.pop();
      }
    }

    isProcessing = false;
    setInputEnabled(true);
  }

  async function submitCandidate(trigger) {
    hasSubmitted = true;
    try {
      await fetch(API_URL.replace('/chat', '/submit-candidate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateData: candidateData,
          conversationHistory: conversationHistory,
          notifyEmail: NOTIFY_EMAIL,
          timestamp: new Date().toISOString(),
          trigger: trigger || 'conversation_complete',
        }),
      });
    } catch (e) {
      console.error('Failed to submit candidate data:', e);
    }
  }

  // Auto-submit when user leaves the page
  function autoSubmitOnExit() {
    if (hasSubmitted || conversationHistory.length < 3) return;

    var hasAnyData = candidateData.name || candidateData.email || candidateData.phone ||
                     (candidateData.epicCertifications && candidateData.epicCertifications.length > 0) ||
                     candidateData.resumeOrLinkedIn;

    if (!hasAnyData) return;
    hasSubmitted = true;

    var payload = JSON.stringify({
      candidateData: candidateData,
      conversationHistory: conversationHistory,
      notifyEmail: NOTIFY_EMAIL,
      timestamp: new Date().toISOString(),
      trigger: 'page_exit',
    });

    navigator.sendBeacon(
      API_URL.replace('/chat', '/submit-candidate'),
      new Blob([payload], { type: 'application/json' })
    );
  }

  window.addEventListener('beforeunload', autoSubmitOnExit);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') autoSubmitOnExit();
  });

  function sleep(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }
})();
