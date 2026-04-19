(function () {
  /* ── UPDATE THESE ── */
  var LINE_ID  = "prashantkanwar";
  var LINE_URL = "https://line.me/ti/p/BKUGyjOeMD";
  var LINE_QR  = "https://line.me/ti/p/BKUGyjOeMD"; /* optional: URL to your LINE QR code image */
  /* ────────────────── */

  var SYSTEM = `You are a helpful and professional AI assistant on Prashant Kanwar's portfolio website.
Answer visitor questions about Prashant warmly and concisely (2-4 sentences unless more detail is asked).

ABOUT PRASHANT:
- Full name: Prashant Kanwar
- Software developer with 1+ year experience, currently based in Kyoto, Japan
- Originally from Rupandehi, Nepal
- Email: prashantkanwar.info@gmail.com
- Website: https://prashantkanwar.com.np

EDUCATION:
- MSc in Information Technology — KCGI, Kyoto, Japan (2022–2024)
- BSc in Computer Science & IT — Tribhuvan University, Nepal (2015–2019)

EXPERIENCE:
- Computer Operator (Govt of Nepal) — District Election Commission, Rupandehi (Dec 2021–Feb 2022)
- .NET Developer — Krennova Pvt Ltd, Kathmandu (Dec 2020–Mar 2021)
- .NET Developer — HELP INC PVT.LTD., Lalitpur (Oct 2019–Nov 2020)

PROJECTS:
- Department of Prison Management (ASP.NET Core)
- JobHaru (Angular + ASP.NET Core)
- Textutils (React.js) — https://prashantkanwar.github.io/Textutils/

SKILLS:
- Languages: C, C++, Java, Python, C#, ASP.NET Core, MySQL, MSSQL
- Tools: Git, Slack

CV:
- English: https://prashantkanwar.com.np/assets/img/cv/Prashant%20Kanwar%20English%20Resume.pdf
- Japanese: https://prashantkanwar.com.np/assets/img/cv/Prashant%20Kanwar%20Japanese%20Resume.pdf

RULES:
- If asked to connect via LINE, reply with only the word: LINE_CONNECT
- If you don't know something, suggest emailing prashantkanwar.info@gmail.com
- Never make up information`;

  var history = [];
  var chatOpen = false;

  window.pkToggle = function () {
    chatOpen = !chatOpen;
    var win = document.getElementById('pk-chat-window');
    var btn = document.getElementById('pk-chat-toggle');
    win.classList.toggle('pk-open', chatOpen);
    btn.textContent = chatOpen ? '✕' : '💬';
    if (chatOpen && history.length === 0) {
      pkAppendBot("👋 Hi! I'm Prashant's AI assistant. Ask me about his background, skills, projects, or how to get in touch!");
    }
  };

  window.pkChip = function (el) { pkSend(el.textContent); };

 /* window.pkSend = function (override) {
    var input = document.getElementById('pk-user-input');
    var text = (override || input.value).trim();
    if (!text) return;
    input.value = '';
    pkAppendUser(text);
    history.push({ role: 'user', content: text });
    pkShowTyping();

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM,
        messages: history
      })
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var reply = (data.content || []).map(function (b) { return b.text || ''; }).join('').trim()
                  || "Sorry, I couldn't get a response right now.";
      pkRemoveTyping();
      history.push({ role: 'assistant', content: reply });
      if (reply.includes('LINE_CONNECT')) {
        pkAppendBot("Here's how you can connect with Prashant on LINE:");
        pkAppendLineCard();
      } else {
        pkAppendBot(reply);
      }
    })
    .catch(function () {
      pkRemoveTyping();
      pkAppendBot("Oops! Something went wrong. Please try again.");
    });
  }; */

  window.pkSend = function (override) {
    var input = document.getElementById('pk-user-input');
    var text = (override || input.value).trim();
    if (!text) return;

    input.value = '';
    pkAppendUser(text);
    pkShowTyping();

    // Simulate a delay so it feels like the AI is "thinking"
    setTimeout(function() {
        pkRemoveTyping();
        var lowerText = text.toLowerCase();
        var reply = "";

        // Simple Keyword Logic
        if (lowerText.includes("project")) {
            reply = "Prashant has worked on several projects, including 'JobHaru' (Angular/.NET) and 'Textutils' (React). Which one would you like to hear about?";
        } else if (lowerText.includes("skill") || lowerText.includes("tech")) {
            reply = "He is proficient in .NET Core, C#, Java, Python, and SQL. He's also currently focusing on Azure Cloud!";
        } else if (lowerText.includes("line") || lowerText.includes("contact") || lowerText.includes("connect")) {
            pkAppendBot("I'd be happy to help you connect with Prashant on LINE:");
            pkAppendLineCard();
            return; // Exit here as the card is handled separately
        } else if (lowerText.includes("education") || lowerText.includes("study")) {
            reply = "Prashant earned his Master's in IT from KCGI in Kyoto and his Bachelor's in CSIT from Tribhuvan University.";
        } else {
            reply = "That's a great question! I'm currently in 'offline mode,' but you can reach Prashant directly at prashant.kanwar2015@gmail.com.";
        }

        pkAppendBot(reply);
    }, 1000); 
};

  function pkAppendBot(text) {
    var msgs = document.getElementById('pk-messages');
    var d = document.createElement('div');
    d.className = 'pk-msg bot'; d.textContent = text;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function pkAppendUser(text) {
    var msgs = document.getElementById('pk-messages');
    var d = document.createElement('div');
    d.className = 'pk-msg user'; d.textContent = text;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function pkShowTyping() {
    var msgs = document.getElementById('pk-messages');
    var d = document.createElement('div');
    d.className = 'pk-msg bot pk-typing'; d.id = 'pk-typing';
    d.innerHTML = '<div class="pk-dot"></div><div class="pk-dot"></div><div class="pk-dot"></div>';
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function pkRemoveTyping() {
    var t = document.getElementById('pk-typing');
    if (t) t.remove();
  }

  function pkAppendLineCard() {
    var msgs = document.getElementById('pk-messages');
    var d = document.createElement('div');
    d.className = 'pk-msg bot';
    d.style.cssText = 'padding:0;background:none;box-shadow:none;';
    d.innerHTML =
      '<div class="pk-line-card">' +
        '<p>📱 Connect with Prashant on LINE:</p>' +
        (LINE_QR ? '<img src="' + LINE_QR + '" style="width:100%;border-radius:7px;margin-bottom:7px;" alt="LINE QR"/>' : '') +
        '<div class="pk-line-id">LINE ID: ' + LINE_ID + '</div>' +
        '<a class="pk-line-btn" href="' + LINE_URL + '" target="_blank">💬 Open LINE Chat</a>' +
      '</div>';
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }
})();
