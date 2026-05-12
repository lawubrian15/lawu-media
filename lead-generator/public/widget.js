(function () {
  const BASE =
    (typeof window !== "undefined" && window.LEAD_GEN_API_BASE) || "";
  const BUSINESS_HINT =
    (typeof window !== "undefined" && window.LEAD_GEN_BUSINESS_HINT) ||
    "local service business";

  const state = {
    open: false,
    busy: false,
    messages: /** @type {{role:string, content:string}[]} */ ([]),
  };

  const root = document.createElement("div");
  root.setAttribute("data-lead-gen-widget", "");
  root.innerHTML = `
    <style>
      [data-lead-gen-widget] { font-family: system-ui, sans-serif; }
      .lg-fab {
        position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 99999;
        border: none; border-radius: 999px; padding: 0.85rem 1.1rem;
        background: linear-gradient(135deg,#2563eb,#7c3aed); color: #fff;
        font-weight: 600; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,.35);
      }
      .lg-panel {
        position: fixed; right: 1.25rem; bottom: 4.5rem; z-index: 99999;
        width: min(22rem, calc(100vw - 2.5rem)); height: min(26rem, 70vh);
        background: #0f1219; color: #e8eaef; border-radius: 14px;
        box-shadow: 0 18px 50px rgba(0,0,0,.45); display: none;
        flex-direction: column; overflow: hidden; border: 1px solid #232838;
      }
      .lg-panel.open { display: flex; }
      .lg-head {
        padding: 0.75rem 1rem; font-weight: 600; border-bottom: 1px solid #232838;
        display: flex; justify-content: space-between; align-items: center;
      }
      .lg-close { background: none; border: none; color: #9aa3b5; cursor: pointer; font-size: 1.1rem; }
      .lg-stream {
        flex: 1; overflow-y: auto; padding: 0.75rem 1rem; gap: 0.6rem;
        display: flex; flex-direction: column;
      }
      .lg-bubble {
        max-width: 92%; padding: 0.55rem 0.7rem; border-radius: 12px; line-height: 1.45;
        white-space: pre-wrap; font-size: 0.95rem;
      }
      .lg-bubble.user { align-self: flex-end; background: #1e293b; }
      .lg-bubble.bot { align-self: flex-start; background: #151a26; border: 1px solid #232838; }
      .lg-foot { border-top: 1px solid #232838; padding: 0.6rem; display: flex; gap: 0.45rem; }
      .lg-foot input {
        flex: 1; border-radius: 10px; border: 1px solid #2b3144; background: #121722;
        color: inherit; padding: 0.55rem 0.65rem;
      }
      .lg-foot button {
        border: none; border-radius: 10px; padding: 0.55rem 0.85rem;
        background: #2563eb; color: #fff; font-weight: 600; cursor: pointer;
      }
      .lg-foot button:disabled { opacity: 0.5; cursor: wait; }
      .lg-capture {
        padding:.55rem 1rem .85rem; border-top:1px solid #232838;
        display: grid; gap:.35rem; font-size:.85rem;
      }
      .lg-capture input {
        border-radius: 8px; border: 1px solid #2b3144; background: #121722;
        color: inherit; padding: .45rem .55rem;
      }
      .lg-capture .row { display: grid; grid-template-columns: 1fr 1fr; gap: .35rem; }
      .lg-capture button {
        margin-top:.25rem;border:none;border-radius:10px;padding:.5rem;
        background:#16a34a;color:#fff;font-weight:600;cursor:pointer;
      }
      .lg-meta { font-size: 0.72rem; color: #7b869a; padding: 0 1rem 0.5rem; }
    </style>
    <button class="lg-fab" type="button" aria-expanded="false">Chat</button>
    <section class="lg-panel" aria-label="Lead chat">
      <div class="lg-head">
        <span>Get a tailored plan</span>
        <button class="lg-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="lg-stream"></div>
      <div class="lg-meta">Conversion path: qualify → capture → route.</div>
      <form class="lg-foot">
        <input name="text" type="text" autocomplete="off" placeholder="Type a message…" />
        <button type="submit">Send</button>
      </form>
      <form class="lg-capture">
        <strong style="font-size:.8rem;color:#cbd5e1">Submit lead (after qualify)</strong>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" placeholder="Phone" />
        <div class="row">
          <input name="budget" placeholder="Budget (free text)" />
          <input name="timeline" placeholder="Start timeline" />
        </div>
        <button type="submit">Send to sales</button>
      </form>
    </section>
  `;

  document.body.appendChild(root);

  const fab = root.querySelector(".lg-fab");
  const panel = root.querySelector(".lg-panel");
  const closeBtn = root.querySelector(".lg-close");
  const stream = root.querySelector(".lg-stream");
  const form = root.querySelector(".lg-foot");
  const cap = root.querySelector(".lg-capture");

  function pushBubble(role, content) {
    const div = document.createElement("div");
    div.className = "lg-bubble " + (role === "user" ? "user" : "bot");
    div.textContent = content;
    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
  }

  function setOpen(open) {
    state.open = open;
    panel.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", open ? "true" : "false");
  }

  fab.addEventListener("click", () => setOpen(!state.open));
  closeBtn.addEventListener("click", () => setOpen(false));

  async function sendChat(text) {
    const url = BASE.replace(/\/$/, "") + "/api/chat";
    state.messages.push({ role: "user", content: text });
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: state.messages,
        businessTypeHint: BUSINESS_HINT,
        useKnowledge: true,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Chat failed");
    }
    const data = await res.json();
    state.messages.push({ role: "assistant", content: data.reply });
    return data.reply;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = String(fd.get("text") || "").trim();
    if (!text || state.busy) return;
    state.busy = true;
    form.querySelector("button").disabled = true;
    pushBubble("user", text);
    form.reset();
    try {
      const reply = await sendChat(text);
      pushBubble("assistant", reply);
    } catch (err) {
      pushBubble("assistant", "Sorry — something went wrong. Check the API or your key.");
      console.error(err);
    } finally {
      state.busy = false;
      form.querySelector("button").disabled = false;
    }
  });

  cap.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(cap);
    const transcript = state.messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    const payload = {
      channel: "web_widget",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      budgetText: String(fd.get("budget") || ""),
      timelineText: String(fd.get("timeline") || ""),
      transcript,
    };
    const url = BASE.replace(/\/$/, "") + "/api/leads";
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert("Lead submit failed: " + (data.error || res.status));
      return;
    }
    alert(
      `Lead saved. Score ${data.score}. ${data.hot ? "HOT — webhook fired if configured." : "Not hot by threshold."}`,
    );
    cap.reset();
  });

  setOpen(false);
})();
