/* =========================================================================
   CHOKEPOINT — app.js
   The reusable mechanic-template runtime (era-strategy template).
   Everything article-specific lives in content.js; this file is engine.
   ========================================================================= */

(function () {
  "use strict";

  const C = CONTENT;
  const app = document.getElementById("app");
  const hud = document.getElementById("hud");

  /* ---------------- state ---------------- */
  const state = {
    screen: "intro",          // intro | era | outcome | epilogue
    eraIndex: 0,
    meters: { ...C.start },
    choices: [],              // {eraId, optionId, historical}
    severed: new Set(),
    startTime: null
  };

  /* ---------------- icons (inline SVG) ---------------- */
  const ICONS = {
    umbrella: '<path d="M12 3C7 3 3.5 6.8 3 11h18c-.5-4.2-4-8-9-8Zm0 0v1M12 11v7a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ship: '<path d="M4 15l1.2-5H12V6h5l1 4h2l-1.5 5M3 15h18l-2 4H5l-2-4Zm9-9V4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    cap: '<path d="M12 5 2.5 9.5 12 14l9.5-4.5L12 5Zm-6 7v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4M21.5 9.5V15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    press: '<path d="M6 4h12v5H6zM4 9h16v4H4zm3 4v5h10v-5M9 6.5h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    drop: '<path d="M12 3.5S5.5 10.8 5.5 15a6.5 6.5 0 0 0 13 0c0-4.2-6.5-11.5-6.5-11.5Zm-2.5 12a2.5 2.5 0 0 0 2.5 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    shield: '<path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    coin: '<circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 8.5v7M9.8 10.2c0-1 1-1.7 2.2-1.7s2.2.7 2.2 1.6c0 2.4-4.4 1.4-4.4 3.6 0 1 1 1.7 2.2 1.7s2.2-.6 2.2-1.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    flask: '<path d="M10 3.5h4M11 3.5v5L5.8 17a2.4 2.4 0 0 0 2.1 3.5h8.2a2.4 2.4 0 0 0 2.1-3.5L13 8.5v-5M8 14h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    hands: '<path d="M7 12.5 10.8 9a1.6 1.6 0 0 1 2.2 0l.4.4a1.5 1.5 0 0 0 2.1 0L17 8m-14 3 4-4.5A3 3 0 0 1 9.2 5h5.6A3 3 0 0 1 17 6.5l4 4.5m-15 5h1.8l3 2.5a1.7 1.7 0 0 0 2.3 0l4.4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    mountain: '<path d="m3 19 6.5-11L13 13l2-3 6 9H3Zm8.5-6.5L9.5 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    para: '<path d="M14 4h5M10 4a4 4 0 0 0 0 8h1v8m3-16v16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
  };
  const icon = (name, cls = "") =>
    `<svg class="icn ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  /* ---------------- helpers ---------------- */
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const clamp = (v) => Math.max(0, Math.min(100, v));

  function receiptChips(ids) {
    if (!ids || !ids.length) return "";
    const order = [];
    const byRef = {};
    ids.forEach((id) => {
      const r = C.receipts[id];
      if (!r) return;
      if (!byRef[r.ref]) { byRef[r.ref] = []; order.push(r.ref); }
      byRef[r.ref].push(id);
    });
    return `<span class="chips">${order.map((ref) =>
      `<button class="chip" data-receipts="${byRef[ref].join(",")}" aria-label="Source: article paragraph ${ref.slice(1)}">${icon("para")}${ref}</button>`
    ).join("")}</span>`;
  }

  const modelledBadge = () =>
    `<button class="badge badge-modelled" data-explain="modelled" aria-label="Modelled outcome — explain">MODELLED — not reported in the article</button>`;
  const reportedBadge = () =>
    `<span class="badge badge-reported">REPORTED — this dead end really happened</span>`;

  function deltaPills(deltas) {
    return `<div class="pills" aria-hidden="true">${C.meters.map((m) => {
      const d = deltas[m.id] || 0;
      if (!d) return "";
      const sign = d > 0 ? "+" : "−";
      return `<span class="pill ${d > 0 ? "up" : "down"}">${icon(m.icon)}${sign}${Math.abs(d)}</span>`;
    }).join("")}</div>`;
  }

  function shieldScore(m = state.meters) {
    const w = C.shieldWeights;
    return Math.round(clamp(m.indisp) * w.indisp + clamp(m.trust) * w.trust + clamp(m.knowhow) * w.knowhow + clamp(m.economy) * w.economy);
  }

  /* ---------------- HUD ---------------- */
  function renderHud(visible) {
    hud.innerHTML = "";
    hud.classList.toggle("hidden", !visible);
    if (!visible) return;
    const era = C.eras[state.eraIndex];
    hud.appendChild(el(`
      <div class="hud-inner">
        <div class="hud-top">
          <span class="hud-title">${C.meta.title}</span>
          <span class="hud-era">${era ? `${era.year} · ${state.eraIndex + 1}/${C.eras.length}` : ""}</span>
          <button class="hud-about" data-open="about">About</button>
        </div>
        <div class="hud-meters" aria-live="polite">
          ${C.meters.map((m) => `
            <div class="meter" title="${m.label}">
              <span class="meter-label">${icon(m.icon)}<span class="meter-name">${m.label}</span></span>
              <span class="bar"><span class="bar-fill" id="bar-${m.id}" style="width:${clamp(state.meters[m.id])}%"></span></span>
              <span class="meter-val" id="val-${m.id}">${clamp(state.meters[m.id])}</span>
            </div>`).join("")}
        </div>
      </div>`));
  }

  function animateMeters(prev) {
    C.meters.forEach((m) => {
      const bar = document.getElementById("bar-" + m.id);
      const val = document.getElementById("val-" + m.id);
      if (!bar || !val) return;
      const to = clamp(state.meters[m.id]);
      bar.style.width = to + "%";
      val.textContent = to;
      if (prev && clamp(prev[m.id]) !== to) {
        bar.parentElement.classList.remove("flash");
        void bar.parentElement.offsetWidth;
        bar.parentElement.classList.add("flash");
      }
    });
  }

  /* ---------------- screens ---------------- */
  function renderIntro() {
    renderHud(false);
    const a = C.meta.article;
    app.innerHTML = `
      <section class="screen intro">
        <div class="wafer-lines" aria-hidden="true"></div>
        <p class="kicker">${C.intro.kicker}</p>
        <h1 class="title">${C.meta.title}</h1>
        <p class="subtitle">${C.meta.subtitle}</p>
        <p class="lede">${C.intro.lede} ${receiptChips(C.intro.receipts)}</p>
        <p class="lede task">${C.intro.task}</p>
        <div class="intro-cta">
          <button class="btn btn-primary" data-action="start">Play <span class="dim">· ~${C.meta.minutes} min</span></button>
          <button class="btn btn-ghost" data-open="about">What is this?</button>
        </div>
        <p class="attribution">A playable rendition of <a href="${a.url}" target="_blank" rel="noopener">“${a.title}”</a><br>by ${a.author} · ${a.publisher} · ${a.date}</p>
        <p class="receipt-note">${C.intro.receiptNote}</p>
        <p class="engine-line"><a href="pipeline.html">${C.meta.engine.line.replace("PressPlay demonstrator №1 — an", "Demonstrator №1 of an")}</a></p>
      </section>`;
    focusScreen();
  }

  function renderEra() {
    const era = C.eras[state.eraIndex];
    renderHud(true);
    app.innerHTML = `
      <section class="screen era">
        <div class="era-head">
          <span class="era-icon">${icon(era.icon)}</span>
          <p class="era-no">Era ${state.eraIndex + 1} of ${C.eras.length} · <strong>${era.year}</strong></p>
          <h2 class="era-title">${era.title}</h2>
        </div>
        <p class="brief">${era.brief} ${receiptChips(era.briefReceipts)}</p>
        <p class="prompt">${era.prompt}</p>
        <div class="options">
          ${era.options.map((o) => `
            <button class="option" data-option="${o.id}">
              <span class="option-label">${o.label}</span>
              <span class="option-blurb">${o.blurb}</span>
            </button>`).join("")}
        </div>
      </section>`;
    focusScreen();
  }

  function renderOutcome(option) {
    const era = C.eras[state.eraIndex];
    const o = option.outcome;
    const last = state.eraIndex === C.eras.length - 1;
    renderHud(true);
    app.innerHTML = `
      <section class="screen outcome ${option.historical ? "is-historical" : "is-counterfactual"}">
        <p class="outcome-tag">${option.historical
          ? `<span class="badge badge-historical">★ WHAT ACTUALLY HAPPENED</span>`
          : (o.reported ? reportedBadge() : modelledBadge())}</p>
        <h2 class="outcome-headline">${o.headline}</h2>
        <p class="outcome-body">${o.body} ${receiptChips(o.receipts)}</p>
        ${deltaPills(option.deltas)}
        ${o.meanwhile ? `<div class="meanwhile"><p>${o.meanwhile.text} ${receiptChips(o.meanwhile.receipts)}</p></div>` : ""}
        ${o.rail ? `<div class="rail"><p><span class="rail-mark">→ history:</span> ${o.rail} ${receiptChips(o.railReceipts)}</p></div>` : ""}
        <button class="btn btn-primary" data-action="next">${last ? "See what you built" : "Continue"}</button>
      </section>`;
    animateMeters(renderOutcome._prev);
    focusScreen();
  }

  function renderEpilogue() {
    renderHud(false);
    const score = shieldScore();
    const verdict = C.epilogue.verdicts.find((v) => score >= v.min) || C.epilogue.verdicts[C.epilogue.verdicts.length - 1];
    const truth = state.choices.filter((c) => c.historical).length;
    const minutes = state.startTime ? Math.max(1, Math.round((Date.now() - state.startTime) / 60000)) : null;
    const a = C.meta.article;
    const mapN = C.epilogue.map;

    app.innerHTML = `
      <section class="screen epilogue">
        <p class="kicker">${C.epilogue.gaugeTitle}</p>
        <div class="gauge-wrap">
          ${mountainGauge(score)}
          <div class="gauge-read"><span class="gauge-score">${score}</span><span class="gauge-cap">/100</span></div>
        </div>
        <h2 class="verdict-title">${verdict.title}</h2>
        <p class="verdict-body">${verdict.body} ${receiptChips(verdict.receipts)}</p>
        <p class="gauge-note">${C.epilogue.gaugeNote}</p>

        <div class="ep-block map-block">
          <h3 class="ep-title">${mapN.title}</h3>
          <p class="ep-note">${mapN.note}</p>
          <div class="chain" id="chain">${chainSvg()}</div>
          <div class="sever-panel" id="sever-panel" aria-live="polite"><p class="sever-hint">Tap a link in the chain.</p></div>
          <div class="thesis hidden" id="thesis"><p>${mapN.thesis.text} ${receiptChips(mapN.thesis.receipts)}</p></div>
        </div>

        <div class="ep-block doubt">
          <h3 class="ep-title">${C.epilogue.doubt.title}</h3>
          <p>${C.epilogue.doubt.body} ${receiptChips(C.epilogue.doubt.receipts)}</p>
        </div>

        <div class="ep-block recap">
          <h3 class="ep-title">Your run vs. history</h3>
          <p class="truth-tally">You found the real strategy in <strong>${truth} of ${C.eras.length}</strong> eras.</p>
          <ol class="recap-list">
            ${C.eras.map((era, i) => {
              const pick = state.choices[i];
              const opt = era.options.find((x) => x.id === pick.optionId);
              const hist = era.options.find((x) => x.historical);
              return `<li>
                <span class="recap-era">${era.year} · ${era.title}</span>
                <span class="recap-pick ${pick.historical ? "hit" : "miss"}">${pick.historical ? "★" : "✕"} ${opt.label}</span>
                ${pick.historical ? "" : `<span class="recap-hist">history: ${hist.label}</span>`}
              </li>`;
            }).join("")}
          </ol>
          ${minutes ? `<p class="time-flies">${C.epilogue.timeFlies.pre} <span class="dim">(You’ve been here ${minutes} minute${minutes === 1 ? "" : "s"}.)</span> ${receiptChips(C.epilogue.timeFlies.receipts)}</p>` : ""}
        </div>

        <div class="ep-cta">
          <a class="btn btn-primary" href="${a.url}" target="_blank" rel="noopener">Read the original — you’ll recognise everything</a>
          <button class="btn" data-action="restart">Play again</button>
          <a class="btn btn-ghost" href="pipeline.html">How this was made</a>
          <button class="btn btn-ghost" data-open="about">About & credits</button>
        </div>
        <p class="attribution">“${a.title}” · ${a.author} · ${a.publisher} · ${a.date}<br>${C.meta.engine.line} · ${C.meta.engine.by}</p>
      </section>`;
    focusScreen();
  }

  function mountainGauge(score) {
    const h = 120, fillY = h - (score / 100) * h;
    return `
      <svg class="gauge" viewBox="0 0 220 130" role="img" aria-label="Silicon Shield strength: ${score} out of 100">
        <defs>
          <clipPath id="mclip"><path d="M10 125 60 45l22 32 28-52 34 44 24-24 32 80Z"/></clipPath>
          <linearGradient id="mfill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stop-color="var(--gold)"/><stop offset="1" stop-color="var(--violet)"/>
          </linearGradient>
        </defs>
        <path d="M10 125 60 45l22 32 28-52 34 44 24-24 32 80Z" fill="none" stroke="var(--line)" stroke-width="1.5"/>
        <g clip-path="url(#mclip)">
          <rect x="0" y="${fillY}" width="220" height="${h}" fill="url(#mfill)" opacity="0.9">
            <animate attributeName="y" from="130" to="${fillY}" dur="1.1s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1"/>
          </rect>
        </g>
        <path d="M10 125 60 45l22 32 28-52 34 44 24-24 32 80Z" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
      </svg>`;
  }

  function chainSvg() {
    const pos = {
      sand: [74, 34], wafers: [74, 122], machines: [246, 34], designs: [246, 122],
      fabs: [160, 210], world: [160, 296]
    };
    const edges = C.epilogue.map.edges.map(([a, b]) => {
      const [x1, y1] = pos[a], [x2, y2] = pos[b];
      return `<line data-edge="${a}-${b}" x1="${x1}" y1="${y1 + 22}" x2="${x2}" y2="${y2 - 22}" class="chain-edge"/>`;
    }).join("");
    const nodes = C.epilogue.map.nodes.map((n) => {
      const [x, y] = pos[n.id];
      return `
        <g class="chain-node" data-node="${n.id}" transform="translate(${x},${y})" tabindex="0" role="button"
           aria-label="${n.label} — ${n.sub}. Tap to sever this link.">
          <rect x="-66" y="-22" width="132" height="44" rx="10"/>
          <text class="cn-label" y="-2">${n.label}</text>
          <text class="cn-sub" y="13">${n.sub}</text>
        </g>`;
    }).join("");
    return `<svg viewBox="0 0 320 330" class="chain-svg" aria-label="The chip supply chain">${edges}${nodes}</svg>`;
  }

  /* ---------------- overlays ---------------- */
  let lastFocus = null;

  function openSheet(html, label) {
    closeSheet();
    lastFocus = document.activeElement;
    const sheet = el(`
      <div class="sheet-backdrop" id="sheet">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="${label}">
          <button class="sheet-close" data-action="close-sheet" aria-label="Close">✕</button>
          ${html}
        </div>
      </div>`);
    document.body.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add("open"));
    sheet.querySelector(".sheet-close").focus();
  }

  function closeSheet() {
    const s = document.getElementById("sheet");
    if (s) s.remove();
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    lastFocus = null;
  }

  function openReceipts(ids) {
    const a = C.meta.article;
    openSheet(`
      <p class="sheet-kicker">What the article says</p>
      ${ids.map((id) => {
        const r = C.receipts[id];
        return `<figure class="quote"><blockquote>${r.quote}</blockquote>
          <figcaption>¶ ${r.ref.slice(1)} · <a href="${a.url}" target="_blank" rel="noopener">${a.publisher}</a> · ${a.author} · ${a.date}</figcaption></figure>`;
      }).join("")}
      <p class="sheet-foot">Verbatim quotes from the source article. Paragraph numbers refer to the article text as captured in the <a href="pipeline.html">transformation pipeline</a>.</p>`,
      "Source quotes from the article");
  }

  function openExplainModelled() {
    openSheet(`
      <p class="sheet-kicker">Why “modelled”?</p>
      <p class="sheet-body">You chose a path history didn’t take, so the article can’t report what happened next. This outcome is extrapolated from the article’s own stated logic — never invented facts — and is marked so you always know the difference. Receipt-backed cards (¶ chips) quote the article directly; modelled cards are the engine reasoning out loud.</p>
      <p class="sheet-body dim">This distinction — visible provenance versus visible inference — is the core integrity rule of the PressPlay engine.</p>`,
      "About modelled outcomes");
  }

  function openAbout() {
    const ab = C.about, a = C.meta.article;
    openSheet(`
      <p class="sheet-kicker">About</p>
      <p class="sheet-body">${ab.what}</p>
      <p class="sheet-body">${ab.source}</p>
      <p class="sheet-kicker">The integrity rules</p>
      <ul class="sheet-list">${ab.integrity.map((x) => `<li>${x}</li>`).join("")}</ul>
      <p class="sheet-body">${ab.kita}</p>
      <p class="sheet-body"><a href="pipeline.html">${ab.engineViewCta} →</a></p>
      <p class="sheet-foot">Source: <a href="${a.url}" target="_blank" rel="noopener">“${a.title}”</a> · ${a.author} · ${a.publisher} · ${a.date}</p>`,
      "About this demonstrator");
  }

  /* ---------------- flow ---------------- */
  function choose(optionId) {
    const era = C.eras[state.eraIndex];
    const option = era.options.find((o) => o.id === optionId);
    renderOutcome._prev = { ...state.meters };
    C.meters.forEach((m) => {
      state.meters[m.id] = clamp(state.meters[m.id] + (option.deltas[m.id] || 0));
    });
    state.choices.push({ eraId: era.id, optionId, historical: !!option.historical });
    state.screen = "outcome";
    renderOutcome(option);
  }

  function next() {
    if (state.eraIndex < C.eras.length - 1) {
      state.eraIndex += 1;
      state.screen = "era";
      renderEra();
    } else {
      state.screen = "epilogue";
      renderEpilogue();
    }
  }

  function restart() {
    state.eraIndex = 0;
    state.meters = { ...C.start };
    state.choices = [];
    state.severed = new Set();
    state.startTime = Date.now();
    state.screen = "era";
    renderEra();
  }

  function sever(nodeId) {
    const node = C.epilogue.map.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    state.severed.add(nodeId);
    const g = document.querySelector(`.chain-node[data-node="${nodeId}"]`);
    document.querySelectorAll(".chain-node").forEach((n) => n.classList.remove("active"));
    if (g) { g.classList.add("severed", "active"); }
    document.querySelectorAll(".chain-edge").forEach((e) => {
      const [a, b] = e.getAttribute("data-edge").split("-");
      e.classList.toggle("cut", state.severed.has(a) || state.severed.has(b));
    });
    const panel = document.getElementById("sever-panel");
    panel.innerHTML = `<p class="sever-title">✂ ${node.label} — severed</p><p>${node.severed.text} ${receiptChips(node.severed.receipts)}</p>`;
    if (state.severed.size >= 2) document.getElementById("thesis").classList.remove("hidden");
  }

  function focusScreen() {
    const h = app.querySelector("h1, h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------------- events (delegated) ---------------- */
  document.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-receipts]");
    if (chip) { openReceipts(chip.getAttribute("data-receipts").split(",")); return; }
    const explain = e.target.closest("[data-explain]");
    if (explain) { openExplainModelled(); return; }
    const open = e.target.closest("[data-open]");
    if (open) { if (open.getAttribute("data-open") === "about") openAbout(); return; }
    const act = e.target.closest("[data-action]");
    if (act) {
      const a = act.getAttribute("data-action");
      if (a === "start") { state.startTime = Date.now(); state.screen = "era"; renderEra(); }
      else if (a === "next") next();
      else if (a === "restart") restart();
      else if (a === "close-sheet") closeSheet();
      return;
    }
    const opt = e.target.closest("[data-option]");
    if (opt) { choose(opt.getAttribute("data-option")); return; }
    const node = e.target.closest("[data-node]");
    if (node) { sever(node.getAttribute("data-node")); return; }
    if (e.target.id === "sheet") closeSheet();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSheet();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches(".chain-node")) {
      e.preventDefault();
      sever(e.target.getAttribute("data-node"));
    }
  });

  /* ---------------- boot ---------------- */
  renderIntro();
})();
