/* =========================================================================
   CHOKEPOINT RPG — rpg.js
   Self-contained 2D narrative-RPG runtime (the "narrative-rpg" mechanic
   template of the PressPlay engine). All article-specific content lives in
   rpg-data.js (world) and rpg-story.js (dialogue/quests/receipts).
   ========================================================================= */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Constants & state                                                    */
  const TILE = 16, SCALE = 3, TS = TILE * SCALE;
  const VIEW_W = 20, VIEW_H = 13; // tiles
  const WALK = 84, WALK_SLOW = 40; // px/s in world pixels (16px tiles)

  const D = window.RPG_DATA, S = window.RPG_STORY;

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  canvas.width = VIEW_W * TILE; canvas.height = VIEW_H * TILE;

  const ui = {
    dialog: document.getElementById("dialog"),
    hud: document.getElementById("hud-rpg"),
    panels: document.getElementById("panels"),
    fade: document.getElementById("fade"),
    card: document.getElementById("card"),
    touch: document.getElementById("touch")
  };

  const state = {
    mode: "title",            // title | play | dialog | cutscene | minigame | panel | epilogue
    scene: null, sceneId: null,
    px: 0, py: 0, facing: "down", moving: false, animT: 0,
    outfit: "arrive",
    cam: { x: 0, y: 0 },
    flags: {}, items: [], insights: [], quests: {}, sincerity: 0,
    entities: [], solids: null,
    dlg: null, cut: null, mini: null,
    playStart: Date.now(), playPrior: 0,
    mood: "day", moodT: 1,
    slowWalk: false, hudHidden: false,
    lastReceipts: []
  };

  /* ------------------------------------------------------------------ */
  /* Utilities                                                            */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstElementChild; };
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function hasFlag(f) { return !!state.flags[f]; }
  function questState(id) { return state.quests[id] ? state.quests[id].s : "none"; } // none|active|done
  function hasInsight(id) { return state.insights.includes(id); }
  function hasItem(id) { return state.items.includes(id); }
  function pillarCount(p) { return state.insights.filter((i) => (S.insights[i] || {}).pillar === p).length; }
  function pillarsDone() {
    return ["island", "litho", "stakes"].every((p) => pillarCount(p) >= S.pillarGoals[p]);
  }

  /* ------------------------------------------------------------------ */
  /* Audio (tiny WebAudio synth)                                          */
  const audio = { ctx: null, pad: null, gain: null, muted: localStorage.getItem("ck_mute") === "1" };
  function audioInit() {
    if (audio.ctx || audio.muted) return;
    try {
      audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
      audio.gain = audio.ctx.createGain(); audio.gain.gain.value = 0.055; audio.gain.connect(audio.ctx.destination);
    } catch (e) { audio.ctx = null; }
  }
  function padPlay(root, bright) {
    if (!audio.ctx || audio.muted) return;
    padStop();
    const g = audio.ctx.createGain(); g.gain.value = 0.0; g.connect(audio.gain);
    const lp = audio.ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = bright ? 1600 : 700; lp.connect(g);
    const oscs = [root, root * 1.005, root * (bright ? 1.5 : 2)].map((f, i) => {
      const o = audio.ctx.createOscillator(); o.type = i === 2 ? "sine" : "triangle"; o.frequency.value = f;
      const og = audio.ctx.createGain(); og.gain.value = i === 2 ? 0.25 : 0.6; o.connect(og); og.connect(lp); o.start(); return o;
    });
    g.gain.linearRampToValueAtTime(1, audio.ctx.currentTime + 2.2);
    audio.pad = { g, oscs };
  }
  function padStop() {
    if (!audio.pad || !audio.ctx) return;
    const p = audio.pad; audio.pad = null;
    p.g.gain.linearRampToValueAtTime(0, audio.ctx.currentTime + 1.2);
    setTimeout(() => p.oscs.forEach((o) => { try { o.stop(); } catch (e) {} }), 1400);
  }
  function blip(freq, dur, type) {
    if (!audio.ctx || audio.muted) return;
    const o = audio.ctx.createOscillator(), g = audio.ctx.createGain();
    o.type = type || "square"; o.frequency.value = freq || 660;
    g.gain.value = 0.05; o.connect(g); g.connect(audio.gain);
    o.start(); g.gain.exponentialRampToValueAtTime(0.001, audio.ctx.currentTime + (dur || 0.05));
    o.stop(audio.ctx.currentTime + (dur || 0.05) + 0.02);
  }
  function chime() { blip(880, 0.12, "sine"); setTimeout(() => blip(1318, 0.18, "sine"), 110); }
  function sceneAudio() {
    const m = state.scene && state.scene.audio;
    if (m) padPlay(m[0], m[1]); else padStop();
  }
  function toggleMute() {
    audio.muted = !audio.muted;
    localStorage.setItem("ck_mute", audio.muted ? "1" : "0");
    if (audio.muted) padStop(); else { audioInit(); sceneAudio(); }
    renderHud();
  }

  /* ------------------------------------------------------------------ */
  /* Sprite generation (parametric pixel people)                          */
  const spriteCache = {};
  function drawPerson(c, look, facing, frame, big) {
    // c: 2d ctx sized 12x16 (or 24x24 portrait when big)
    const P = look;
    const px = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
    c.clearRect(0, 0, big ? 24 : 12, big ? 24 : 16);
    if (big) { drawPortrait(c, P); return; }
    const side = facing === "left" || facing === "right";
    const gown = P.gown;
    if (gown) { c.fillStyle = "#b9bfd0"; c.fillRect(1, 1, 10, 15); } // gown silhouette for contrast
    // legs (rows 13..15)
    const legC = gown ? "#dfe2ec" : P.bottom;
    if (facing === "down" || facing === "up") {
      const off = frame ? 1 : 0;
      px(3, 13, 2, 3 - off, legC); px(7, 13 - 0, 2, 3 - (frame ? 0 : 1), legC);
      if (!gown) { px(3, 15, 2, 1, P.shoe); px(7, 15, 2, 1, P.shoe); }
    } else {
      px(frame ? 3 : 4, 13, 2, 3, legC); px(frame ? 7 : 6, 13, 2, 3, legC);
      px(frame ? 3 : 4, 15, 2, 1, gown ? legC : P.shoe); px(frame ? 7 : 6, 15, 2, 1, gown ? legC : P.shoe);
    }
    // body (rows 8..12)
    const top = gown ? "#eceef5" : P.top;
    px(2, 8, 8, 5, top);
    if (P.coat && !gown) px(2, 12, 8, 2, top);
    // arms
    if (!side) { px(1, 8, 1, 4, top); px(10, 8, 1, 4, top); px(1, 12, 1, 1, P.skin); px(10, 12, 1, 1, P.skin); }
    else { px(side && facing === "left" ? 2 : 9, 8, 1, 4, top); }
    if (P.tie && !gown && facing === "down") px(5, 8, 2, 3, P.tie);
    if (P.badge && !gown && facing === "down") px(3, 9, 1, 1, "#d9a441");
    // head (rows 1..7)
    px(3, 2, 6, 5, P.skin);
    // hair
    const H = P.hair, hc = P.hairC;
    if (gown) { // hood
      px(2, 1, 8, 2, "#f2f2f6"); px(2, 2, 1, 5, "#f2f2f6"); px(9, 2, 1, 5, "#f2f2f6");
      if (facing === "up") px(3, 2, 6, 5, "#f2f2f6");
    } else if (H !== "bald") {
      px(3, 1, 6, 1, hc); px(2, 2, 8, 1, hc);
      if (facing === "up") px(3, 2, 6, 4, hc);
      else {
        px(2, 3, 1, H === "long" || H === "bob" ? 4 : 2, hc);
        px(9, 3, 1, H === "long" || H === "bob" ? 4 : 2, hc);
        if (H === "long") { px(2, 7, 1, 2, hc); px(9, 7, 1, 2, hc); }
        if (H === "side") px(3, 2, 4, 1, hc);
      }
    } else if (facing !== "up") { px(2, 3, 1, 1, P.skin); px(9, 3, 1, 1, P.skin); }
    // face
    if (facing === "down") {
      px(4, 4, 1, 1, "#1d2330"); px(7, 4, 1, 1, "#1d2330");
      if (P.glasses) { px(3, 4, 2, 1, "#2a3145"); px(6, 4, 3, 1, "#2a3145"); }
      if (P.mask) px(4, 5, 4, 2, "#dfe4ee");
    } else if (side) {
      const ex = facing === "left" ? 4 : 7;
      px(ex, 4, 1, 1, "#1d2330");
      if (P.glasses) px(facing === "left" ? 3 : 6, 4, 3, 1, "#2a3145");
      if (P.mask) px(facing === "left" ? 3 : 6, 5, 3, 2, "#dfe4ee");
    }
  }
  function drawPortrait(c, P) {
    const px = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
    px(0, 0, 24, 24, "transparent");
    // shoulders
    px(3, 18, 18, 6, P.gown ? "#f2f2f6" : P.top);
    if (P.tie) px(11, 18, 2, 6, P.tie);
    // head
    px(6, 4, 12, 12, P.skin);
    const hc = P.hairC, H = P.hair;
    if (P.gown) { px(4, 2, 16, 4, "#f2f2f6"); px(4, 4, 2, 12, "#f2f2f6"); px(18, 4, 2, 12, "#f2f2f6"); }
    else if (H !== "bald") {
      px(5, 2, 14, 3, hc); px(4, 4, 2, H === "long" || H === "bob" ? 10 : 4, hc); px(18, 4, 2, H === "long" || H === "bob" ? 10 : 4, hc);
      if (H === "long") { px(4, 14, 2, 6, hc); px(18, 14, 2, 6, hc); }
      if (H === "side") px(6, 3, 8, 2, hc);
    }
    px(9, 9, 2, 2, "#1d2330"); px(14, 9, 2, 2, "#1d2330");
    if (P.glasses) { px(7, 9, 5, 1, "#2a3145"); px(13, 9, 5, 1, "#2a3145"); px(12, 9, 1, 1, "#2a3145"); }
    px(10, 14, 4, 1, "#8a5a4a");
    if (P.mask) px(8, 12, 8, 5, "#dfe4ee");
    if (P.age) { px(8, 6, 3, 1, "#cfd6e4"); px(13, 6, 3, 1, "#cfd6e4"); }
  }
  function sprite(lookId, facing, frame) {
    const key = lookId + ":" + facing + ":" + frame;
    if (spriteCache[key]) return spriteCache[key];
    const cv = document.createElement("canvas"); cv.width = 12; cv.height = 16;
    drawPerson(cv.getContext("2d"), D.looks[lookId], facing, frame, false);
    spriteCache[key] = cv; return cv;
  }
  function portrait(lookId) {
    const key = "pt:" + lookId;
    if (spriteCache[key]) return spriteCache[key];
    const cv = document.createElement("canvas"); cv.width = 24; cv.height = 24;
    drawPerson(cv.getContext("2d"), D.looks[lookId], "down", 0, true);
    spriteCache[key] = cv; return cv;
  }

  /* ------------------------------------------------------------------ */
  /* Scene loading & tiles                                                */
  const tileCache = {};
  function tileCanvas(type, variantSeed) {
    const key = type + ":" + (variantSeed || 0);
    if (tileCache[key]) return tileCache[key];
    const cv = document.createElement("canvas"); cv.width = TILE; cv.height = TILE;
    D.tiles[type](cv.getContext("2d"), variantSeed || 0);
    tileCache[key] = cv; return cv;
  }

  function loadScene(id, spawn) {
    const def = D.scenes[id];
    state.sceneId = id; state.scene = def;
    const rows = def.map;
    const H = rows.length, W = rows[0].length;
    state.solids = [];
    state.grid = [];
    for (let y = 0; y < H; y++) {
      state.grid[y] = []; state.solids[y] = [];
      for (let x = 0; x < W; x++) {
        const ch = rows[y][x];
        const t = def.legend[ch] || def.legend["."];
        state.grid[y][x] = t;
        state.solids[y][x] = !!t.solid;
      }
    }
    state.W = W; state.H = H;
    // entities
    state.entities = (def.npcs || []).filter((n) => !n.if || checkReq(n.if)).map((n) => ({ ...n, animT: Math.random() * 2 }));
    if (spawn) { state.px = spawn.x * TILE + 2; state.py = spawn.y * TILE; state.facing = spawn.f || "down"; }
    setMood(def.mood || "day", true);
    state.slowWalk = !!def.slow;
    state.hudHidden = !!def.hideHud;
    sceneAudio();
    renderHud();
    save();
  }

  function setMood(m, instant) { state.mood = m; if (instant) state.moodT = 1; else state.moodT = 0; }

  /* ------------------------------------------------------------------ */
  /* Requirements & effects                                               */
  function checkReq(req) {
    if (!req) return true;
    if (req.flag && !hasFlag(req.flag)) return false;
    if (req.notFlag && hasFlag(req.notFlag)) return false;
    if (req.quest && questState(req.quest.id) !== req.quest.s) return false;
    if (req.insight && !hasInsight(req.insight)) return false;
    if (req.notInsight && hasInsight(req.notInsight)) return false;
    if (req.item && !hasItem(req.item)) return false;
    if (req.pillarsDone && !pillarsDone()) return false;
    if (req.pillarAny && !["island", "litho", "stakes"].some((p) => pillarCount(p) >= S.pillarGoals[p])) return false;
    if (req.pillarTwo && ["island", "litho", "stakes"].filter((p) => pillarCount(p) >= S.pillarGoals[p]).length < 2) return false;
    if (req.outfit && state.outfit !== req.outfit) return false;
    return true;
  }

  function applyFx(fx) {
    if (!fx) return;
    (Array.isArray(fx) ? fx : [fx]).forEach((f) => {
      if (f.flag) state.flags[f.flag] = true;
      if (f.clearFlag) delete state.flags[f.clearFlag];
      if (f.quest) {
        const q = f.quest;
        if (q.s === "active" && questState(q.id) === "none") { state.quests[q.id] = { s: "active" }; toast("Quest — " + S.quests[q.id].name, "quest"); chime(); }
        if (q.s === "done" && questState(q.id) !== "done") { state.quests[q.id] = { s: "done" }; toast("Complete — " + S.quests[q.id].name, "quest done"); chime(); }
      }
      if (f.insight && !hasInsight(f.insight)) {
        state.insights.push(f.insight);
        const ins = S.insights[f.insight];
        toast("Notebook — " + ins.title, "insight"); blip(520, 0.08, "sine");
      }
      if (f.item && !hasItem(f.item)) { state.items.push(f.item); toast(S.items[f.item].name + " — added", "item"); }
      if (f.dropItem) state.items = state.items.filter((i) => i !== f.dropItem);
      if (f.sincerity) state.sincerity += f.sincerity;
      if (f.outfit) { state.outfit = f.outfit; }
      if (f.mood) setMood(f.mood);
      if (f.goto) { transition(() => loadScene(f.goto.s, f.goto)); }
      if (f.cutscene) startCutscene(f.cutscene);
      if (f.minigame) startMinigame(f.minigame);
      if (f.epilogue) showEpilogue();
      if (f.dialog) setTimeout(() => startDialog(f.dialog), 30);
    });
    renderHud(); save();
  }

  /* ------------------------------------------------------------------ */
  /* Dialogue                                                             */
  function startDialog(id, nodeId) {
    const d = S.dialogs[id];
    if (!d) return;
    state.mode = "dialog";
    state.dlg = { id, node: null, lineIdx: 0, typing: false };
    gotoNode(nodeId || d.start || "start");
  }
  function gotoNode(nodeId) {
    const d = S.dialogs[state.dlg.id];
    let node = d.nodes[nodeId];
    // node-level redirect based on requirements
    while (node && node.redirect) {
      const r = node.redirect.find((x) => checkReq(x.if));
      node = d.nodes[r ? r.go : node.redirectElse];
    }
    state.dlg.node = node; state.dlg.nodeId = nodeId; state.dlg.lineIdx = 0;
    if (node.fx) applyFx(node.fx);
    renderDialogLine();
  }
  function renderDialogLine() {
    const n = state.dlg.node;
    const line = n.lines && n.lines[state.dlg.lineIdx];
    ui.dialog.classList.remove("hidden");
    if (!line) { renderChoices(); return; }
    const who = S.cast[line.s] || { name: "", look: null };
    const receipts = line.r ? `<span class="dlg-chips">${receiptChipsHtml(line.r)}</span>` : "";
    const vmark = line.v ? `<span class="vmark" title="Verbatim from the article">¶</span>` : "";
    ui.dialog.innerHTML = `
      <div class="dlg-box ${line.s === "you" ? "dlg-you" : ""}" data-adv="1">
        ${who.look ? `<canvas class="dlg-portrait" width="24" height="24"></canvas>` : ""}
        <div class="dlg-main">
          <div class="dlg-name">${who.name}${vmark}</div>
          <div class="dlg-text" id="dlg-text"></div>
          <div class="dlg-foot">${receipts}<span class="dlg-more">▾</span></div>
        </div>
      </div>`;
    if (who.look) {
      const pc = ui.dialog.querySelector(".dlg-portrait").getContext("2d");
      pc.imageSmoothingEnabled = false;
      pc.drawImage(portrait(who.look), 0, 0, 24, 24);
    }
    typeText(document.getElementById("dlg-text"), line.t);
    blip(line.s === "you" ? 500 : 640, 0.03);
  }
  let typeTimer = null;
  function typeText(elm, text) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    clearInterval(typeTimer);
    if (reduced) { elm.textContent = text; state.dlg.typing = false; return; }
    state.dlg.typing = true;
    let i = 0;
    typeTimer = setInterval(() => {
      i += 2; elm.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(typeTimer); state.dlg.typing = false; }
    }, 16);
  }
  function advanceDialog() {
    const dlg = state.dlg; if (!dlg) return;
    const n = dlg.node;
    const line = n.lines && n.lines[dlg.lineIdx];
    if (line && dlg.typing) { clearInterval(typeTimer); ui.dialog.querySelector("#dlg-text").textContent = line.t; dlg.typing = false; return; }
    if (line && dlg.lineIdx < n.lines.length - 1) { dlg.lineIdx++; renderDialogLine(); return; }
    if (n.choices && n.choices.length) { renderChoices(); return; }
    if (n.next) { gotoNode(n.next); return; }
    endDialog(n.endFx);
  }
  function renderChoices() {
    const n = state.dlg.node;
    const opts = (n.choices || []).filter((c) => !c.if || checkReq(c.if));
    if (!opts.length) { endDialog(n.endFx); return; }
    ui.dialog.innerHTML = `
      <div class="dlg-box">
        <div class="dlg-main">
          <div class="dlg-name">${S.cast.you.name}</div>
          <div class="dlg-choices">
            ${opts.map((c, i) => `<button class="dlg-choice ${c.chab ? "chab" : ""}" data-choice="${n.choices.indexOf(c)}">${c.chab ? "〜 " : ""}${esc(c.t)}</button>`).join("")}
          </div>
        </div>
      </div>`;
    ui.dialog.querySelector(".dlg-choice").focus();
  }
  function pickChoice(idx) {
    const c = state.dlg.node.choices[idx];
    if (c.fx) applyFx(c.fx);
    if (c.go) gotoNode(c.go); else endDialog();
  }
  function endDialog(fx) {
    state.dlg = null;
    ui.dialog.classList.add("hidden");
    ui.dialog.innerHTML = "";
    if (state.mode === "dialog") state.mode = "play";
    if (fx) applyFx(fx);
  }

  /* ------------------------------------------------------------------ */
  /* Receipts sheet (shared with notebook)                                */
  function receiptChipsHtml(ids) {
    const order = [], byRef = {};
    ids.forEach((id) => {
      const r = S.receipts[id]; if (!r) return;
      if (!byRef[r.ref]) { byRef[r.ref] = []; order.push(r.ref); }
      byRef[r.ref].push(id);
    });
    return order.map((ref) => `<button class="chip" data-receipts="${byRef[ref].join(",")}">¶ ${ref}</button>`).join("");
  }
  function openReceipts(ids) {
    const a = S.article;
    openSheet(`
      <p class="sheet-kicker">What the article says</p>
      ${ids.map((id) => { const r = S.receipts[id]; return `<figure class="quote"><blockquote>${r.quote}</blockquote><figcaption>¶ ${r.ref.slice(1)} · <a href="${a.url}" target="_blank" rel="noopener">${a.publisher}</a> · ${a.author} · ${a.date}</figcaption></figure>`; }).join("")}
      <p class="sheet-foot">Verbatim quotes from the source article. Full pipeline: <a href="pipeline.html">how this was made</a>.</p>`);
  }
  function openSheet(html) {
    closeSheet();
    const sh = el(`<div class="sheet-backdrop open" id="sheet"><div class="sheet" role="dialog" aria-modal="true"><button class="sheet-close" data-close-sheet>✕</button>${html}</div></div>`);
    document.body.appendChild(sh);
    sh.querySelector(".sheet-close").focus();
  }
  function closeSheet() { const s = document.getElementById("sheet"); if (s) s.remove(); }

  /* ------------------------------------------------------------------ */
  /* Panels: notebook / quests / bag / about                              */
  function openPanel(tab) {
    if (state.mini) closeMini();
    state.mode = "panel";
    const pillars = [["island", "The Island"], ["litho", "The Litho"], ["stakes", "The Stakes"]];
    let body = "";
    if (tab === "notebook") {
      body = pillars.map(([p, label]) => `
        <h4 class="pn-pillar">${label} <span class="pn-count">${pillarCount(p)}/${S.pillarGoals[p]}</span></h4>
        <div class="pn-entries">
          ${state.insights.filter((i) => S.insights[i].pillar === p).map((i) => {
            const ins = S.insights[i];
            return `<div class="pn-entry"><strong>${ins.title}</strong><p>${ins.body}</p><div>${receiptChipsHtml(ins.receipts)}</div></div>`;
          }).join("") || `<p class="pn-empty">Nothing yet. Go ask better questions.</p>`}
        </div>`).join("");
    } else if (tab === "quests") {
      const qs = Object.keys(state.quests);
      body = `<div class="pn-entries">${qs.length ? qs.map((id) => {
        const q = S.quests[id], st = state.quests[id].s;
        return `<div class="pn-entry ${st}"><strong>${st === "done" ? "✓ " : "◆ "}${q.name}</strong><p>${st === "done" ? (q.done || q.desc) : q.desc}</p></div>`;
      }).join("") : `<p class="pn-empty">No quests yet.</p>`}</div>`;
    } else if (tab === "bag") {
      body = `<div class="pn-entries">${state.items.length ? state.items.map((id) => {
        const it = S.items[id];
        return `<div class="pn-entry"><strong>${it.icon || "•"} ${it.name}</strong><p>${it.desc}</p></div>`;
      }).join("") : `<p class="pn-empty">Empty. Your Samsonite is… elsewhere.</p>`}</div>`;
    } else {
      const a = S.article;
      body = `<div class="pn-entries">
        <div class="pn-entry"><strong>What is this?</strong><p>${S.aboutWhat}</p></div>
        <div class="pn-entry"><strong>Source</strong><p>A playable rendition of “${a.title}” by ${a.author} · ${a.publisher} · ${a.date}. <a href="${a.url}" target="_blank" rel="noopener">Read the original.</a></p></div>
        ${S.aboutRules.map((r) => `<div class="pn-entry"><strong>${r[0]}</strong><p>${r[1]}</p></div>`).join("")}
        <div class="pn-entry"><strong>Sound</strong><p><button class="btn-mini" data-mute>${audio.muted ? "Unmute" : "Mute"} audio</button></p></div>
        <div class="pn-entry"><strong>More</strong><p><a href="pipeline.html">How this was made</a> · <a href="strategy.html">Format A: the strategy edition</a></p></div>
      </div>`;
    }
    ui.panels.classList.remove("hidden");
    ui.panels.innerHTML = `
      <div class="panel">
        <div class="pn-tabs" role="tablist">
          ${[["notebook", "📓 Notebook"], ["quests", "◆ Quests"], ["bag", "◇ Bag"], ["about", "ℹ About"]].map(([t, l]) =>
            `<button class="pn-tab ${t === tab ? "on" : ""}" data-tab="${t}">${l}</button>`).join("")}
          <button class="pn-close" data-close-panel aria-label="Close">✕</button>
        </div>
        <div class="pn-body">${body}</div>
      </div>`;
  }
  function closePanel() { ui.panels.classList.add("hidden"); ui.panels.innerHTML = ""; if (state.mode === "panel") state.mode = "play"; }

  /* ------------------------------------------------------------------ */
  /* HUD & toasts                                                         */
  function renderHud() {
    if (state.hudHidden || state.mode === "title" || state.mode === "epilogue") { ui.hud.classList.add("hidden"); return; }
    ui.hud.classList.remove("hidden");
    const main = Object.keys(state.quests).filter((q) => state.quests[q].s === "active").map((q) => S.quests[q]);
    const hint = ((state.scene && state.scene.hints) || []).find((h) => checkReq(h.if));
    ui.hud.innerHTML = `
      <div class="hud-left">
        <div class="hud-scene">${state.scene ? state.scene.name : ""}</div>
        ${main.length ? `<div class="hud-quest">◆ ${main[main.length - 1].short || main[main.length - 1].name}</div>` : ""}
        ${hint ? `<div class="hud-quest hud-hint">${hint.t}</div>` : ""}
      </div>
      <div class="hud-right">
        <button class="hud-btn" data-open-panel="notebook" aria-label="Notebook">📓</button>
        <button class="hud-btn" data-open-panel="quests" aria-label="Quests">◆</button>
        <button class="hud-btn" data-open-panel="about" aria-label="Menu">☰</button>
      </div>`;
  }
  let toastT = null;
  function toast(text, cls) {
    let t = document.getElementById("toast");
    if (!t) { t = el(`<div id="toast"></div>`); document.body.appendChild(t); }
    t.className = "show " + (cls || "");
    t.textContent = text;
    clearTimeout(toastT);
    toastT = setTimeout(() => { t.className = ""; }, 2600);
  }

  /* ------------------------------------------------------------------ */
  /* Cutscenes                                                            */
  function startCutscene(id) {
    state.mode = "cutscene";
    state.cut = { steps: S.cutscenes[id].slice(), active: null };
    stepCutscene();
  }
  function stepCutscene() {
    const c = state.cut;
    if (!c) return;
    const s = c.steps.shift();
    if (!s) { state.cut = null; if (state.mode === "cutscene") state.mode = "play"; return; }
    if (s.card) {
      ui.card.innerHTML = `<div class="card-inner">${s.card}</div>`;
      ui.card.classList.add("show");
      setTimeout(() => { ui.card.classList.remove("show"); setTimeout(stepCutscene, 450); }, s.ms || 2400);
    } else if (s.fadeOut) {
      ui.fade.classList.add("dark"); setTimeout(stepCutscene, 550);
    } else if (s.fadeIn) {
      ui.fade.classList.remove("dark"); setTimeout(stepCutscene, 550);
    } else if (s.goto) {
      loadScene(s.goto.s, s.goto); stepCutscene();
    } else if (s.wait) {
      setTimeout(stepCutscene, s.wait);
    } else if (s.dialog) {
      state.cut.pending = true;
      const resume = () => { state.mode = "cutscene"; stepCutscene(); };
      startDialog(s.dialog);
      // watch for dialog end
      const iv = setInterval(() => { if (!state.dlg) { clearInterval(iv); resume(); } }, 80);
    } else if (s.fx) {
      applyFx(s.fx); stepCutscene();
    } else if (s.walk) {
      // {walk:{who:'you'|npcId, path:[[dx,dy],...]}} — tile steps
      const who = s.walk.who;
      const seq = s.walk.path.slice();
      const mover = who === "you" ? null : state.entities.find((e) => e.id === who);
      const stepOne = () => {
        const d = seq.shift();
        if (!d) { stepCutscene(); return; }
        const dist = TILE, dir = d[0] ? (d[0] > 0 ? "right" : "left") : (d[1] > 0 ? "down" : "up");
        let moved = 0;
        const spd = 70;
        const iv = setInterval(() => {
          const step = spd / 60;
          moved += step;
          if (who === "you") { state.px += (d[0]) * step; state.py += (d[1]) * step; state.facing = dir; state.moving = true; }
          else if (mover) { mover.x += (d[0]) * step / TILE; mover.y += (d[1]) * step / TILE; mover.facing = dir; mover.walking = true; }
          if (moved >= dist * Math.max(Math.abs(d[0]), Math.abs(d[1]))) {
            clearInterval(iv);
            if (who === "you") state.moving = false; else if (mover) mover.walking = false;
            stepOne();
          }
        }, 1000 / 60);
      };
      stepOne();
    } else { stepCutscene(); }
  }

  /* ------------------------------------------------------------------ */
  /* Minigames                                                            */
  function startMinigame(id) {
    state.mode = "minigame";
    if (id === "dial") {
      state.mini = { id, watts: 10, hold: false, t: 0, done: false };
      ui.panels.classList.remove("hidden");
      ui.panels.innerHTML = `
        <div class="panel mini">
          <p class="mini-kicker">FAB — 14 OCTOBER 2014, LATE</p>
          <h3 class="mini-title">Hold the beam. Raise the power.</h3>
          <div class="mini-dial"><div class="mini-needle" id="needle"></div><div class="mini-watts" id="watts">10 W</div></div>
          <p class="mini-note">Reliable at 10 watts. Production needs ~250. <strong>Hold</strong> the button — steady.</p>
          <button class="btn-hold" id="holdbtn">HOLD</button>
        </div>`;
      const btn = document.getElementById("holdbtn");
      const on = () => { state.mini.hold = true; }; const off = () => { state.mini.hold = false; };
      btn.addEventListener("pointerdown", on); btn.addEventListener("pointerup", off); btn.addEventListener("pointerleave", off);
      window.addEventListener("keydown", dialKey); window.addEventListener("keyup", dialKeyUp);
    } else if (id === "wash") {
      state.mini = { id, round: 0, ring: 1, ok: 0 };
      ui.panels.classList.remove("hidden");
      ui.panels.innerHTML = `
        <div class="panel mini">
          <p class="mini-kicker">ANTECHAMBER</p>
          <h3 class="mini-title">Wash. Rinse. Dry.</h3>
          <div class="mini-ring"><div class="ring-out" id="ringout"></div><div class="ring-target"></div></div>
          <p class="mini-note" id="washnote">One machine does all three. Press when the ring meets the mark. (${["Wash", "Rinse", "Dry"][0]})</p>
          <button class="btn-hold" id="washbtn">PRESS</button>
        </div>`;
      document.getElementById("washbtn").addEventListener("click", washPress);
    }
  }
  function dialKey(e) { if (e.key === " " || e.key === "Enter" || e.key.toLowerCase() === "e") { state.mini && (state.mini.hold = true); e.preventDefault(); } }
  function dialKeyUp() { state.mini && (state.mini.hold = false); }
  function tickMinigame(dt) {
    const m = state.mini; if (!m) return;
    if (m.id === "dial" && !m.done) {
      m.t += dt;
      const wobble = Math.sin(m.t * 7) * 2.4 + Math.sin(m.t * 2.3) * 1.6;
      if (m.hold) m.watts += dt * 11; else m.watts = Math.max(10, m.watts - dt * 16);
      const shown = Math.max(10, m.watts + (m.hold ? wobble : 0));
      const needle = document.getElementById("needle"), watts = document.getElementById("watts");
      if (needle) needle.style.transform = `rotate(${-100 + clamp(shown, 0, 260) / 260 * 200}deg)`;
      if (watts) watts.textContent = Math.round(shown) + " W";
      if (shown >= 35 && shown < 45) blip(240, 0.02, "sine");
      if (m.watts >= 90) {
        m.done = true;
        chime();
        setTimeout(() => { closeMini(); applyFx(S.minigameFx.dial); }, 700);
      }
    } else if (m.id === "wash") {
      m.ring = (m.ring + dt * 0.65) % 1.4;
      const r = document.getElementById("ringout");
      if (r) { const sc = 1.4 - m.ring; r.style.transform = `translate(-50%,-50%) scale(${sc.toFixed(3)})`; r.style.opacity = sc < 1.05 ? 1 : 0.6; }
    }
  }
  function washPress() {
    const m = state.mini; if (!m) return;
    const sc = 1.4 - m.ring;
    if (sc > 0.74 && sc < 1.14) {
      m.ok++; chime();
      const labels = ["Wash", "Rinse", "Dry"];
      if (m.ok >= 3) { closeMini(); applyFx(S.minigameFx.wash); return; }
      document.getElementById("washnote").textContent = `Good. (${labels[m.ok]})`;
    } else { blip(180, 0.08); document.getElementById("washnote").textContent = "Steady. Wait for the ring."; }
  }
  function closeMini() {
    window.removeEventListener("keydown", dialKey); window.removeEventListener("keyup", dialKeyUp);
    state.mini = null; ui.panels.classList.add("hidden"); ui.panels.innerHTML = "";
    state.mode = "play";
  }

  /* ------------------------------------------------------------------ */
  /* Epilogue & title                                                     */
  function showEpilogue() {
    if (state.mini) closeMini();
    state.mode = "epilogue";
    padPlay(261.6, true);
    const mins = Math.round(((Date.now() - state.playStart) / 60000 + state.playPrior));
    const nUsed = state.insights.length, nAll = Object.keys(S.insights).length;
    const a = S.article;
    ui.panels.classList.remove("hidden");
    ui.panels.innerHTML = `
      <div class="panel epi">
        <p class="mini-kicker">EPILOGUE</p>
        <h3 class="epi-title">Time flies in the fabs.</h3>
        <p class="epi-line">You were inside for ${mins || 1} minute${mins === 1 ? "" : "s"}. It will feel like twenty. ${receiptChipsHtml(["P098_time"])}</p>
        <div class="pn-entry"><strong>Your notebook</strong><p>${nUsed} of ${nAll} insights · ${S.stats.verbatim} verbatim lines carried ¶ receipts · 3 refusals earned into a yes.</p></div>
        <div class="pn-entry"><strong>What was real?</strong><p>${S.aboutWhatWasReal}</p></div>
        <div class="epi-cta">
          <a class="btn-primary-lg" href="${a.url}" target="_blank" rel="noopener">Read the original — you'll recognise everyone</a>
          <div class="epi-row">
            <a class="btn-mini" href="pipeline.html">How this was made</a>
            <a class="btn-mini" href="strategy.html">Format A: strategy edition</a>
            <button class="btn-mini" data-restart>Play again</button>
          </div>
        </div>
        <p class="epi-credit">“${a.title}” · ${a.author} · ${a.publisher} · ${a.date}<br>${S.engineLine}</p>
      </div>`;
  }

  function showTitle() {
    state.mode = "title";
    ui.hud.classList.add("hidden");
    const has = !!localStorage.getItem("ck_save");
    ui.panels.classList.remove("hidden");
    ui.panels.innerHTML = `
      <div class="panel title-panel">
        <p class="mini-kicker">A PLAYABLE LONG-READ</p>
        <h1 class="tt-title">CHOKEPOINT</h1>
        <p class="tt-sub">the Sacred Mountain</p>
        <p class="tt-lede">A narrative RPG rendition of “I Saw the Face of God in a Semiconductor Factory” by Virginia Heffernan (WIRED, 2023). Get inside the most guarded building on Earth — by understanding it.</p>
        <div class="epi-cta">
          <button class="btn-primary-lg" data-newgame>${has ? "New pilgrimage" : "Begin the pilgrimage"}</button>
          ${has ? `<button class="btn-primary-lg cont" data-continue>Continue</button>` : ""}
          <div class="epi-row">
            <a class="btn-mini" href="pipeline.html">How this was made</a>
            <a class="btn-mini" href="strategy.html">Format A</a>
            <button class="btn-mini" data-mute>${audio.muted ? "Unmute" : "Mute"}</button>
          </div>
        </div>
        <p class="epi-credit">↑↓←→ / WASD move · E / Space talk · N notebook — on mobile, use the pad.</p>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Save / load                                                          */
  function save() {
    if (state.mode === "title") return;
    try {
      localStorage.setItem("ck_save", JSON.stringify({
        sceneId: state.sceneId, px: state.px, py: state.py, facing: state.facing,
        flags: state.flags, items: state.items, insights: state.insights,
        quests: state.quests, sincerity: state.sincerity, outfit: state.outfit,
        mins: (Date.now() - state.playStart) / 60000 + state.playPrior
      }));
    } catch (e) {}
  }
  function loadSave() {
    try {
      const s = JSON.parse(localStorage.getItem("ck_save"));
      if (!s) return false;
      Object.assign(state, {
        flags: s.flags || {}, items: s.items || [], insights: s.insights || [],
        quests: s.quests || {}, sincerity: s.sincerity || 0, outfit: s.outfit || "arrive",
        playPrior: s.mins || 0, playStart: Date.now()
      });
      loadScene(s.sceneId, null);
      state.px = s.px; state.py = s.py; state.facing = s.facing || "down";
      return true;
    } catch (e) { return false; }
  }

  /* ------------------------------------------------------------------ */
  /* Input                                                                */
  const keys = {};
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSheet(); if (state.mode === "panel") closePanel(); return; }
    if (state.mode === "dialog") {
      if (["Enter", " ", "e", "E"].includes(e.key)) { e.preventDefault(); if (!ui.dialog.querySelector(".dlg-choice")) advanceDialog(); }
      const chs = [...ui.dialog.querySelectorAll(".dlg-choice")];
      if (chs.length && /^[1-9]$/.test(e.key)) { const i = +e.key - 1; if (chs[i]) chs[i].click(); }
      return;
    }
    if (state.mode !== "play") return;
    keys[e.key.toLowerCase()] = true;
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) e.preventDefault();
    if (["e", "enter", " "].includes(e.key.toLowerCase())) interact();
    if (e.key.toLowerCase() === "n") openPanel("notebook");
    if (e.key.toLowerCase() === "q") openPanel("quests");
  });
  window.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false; });

  document.addEventListener("click", (e) => {
    audioInit(); if (audio.ctx && audio.ctx.state === "suspended") audio.ctx.resume();
    if (!audio.pad && !audio.muted && state.scene) sceneAudio();
    const t = e.target;
    const chip = t.closest("[data-receipts]"); if (chip) { openReceipts(chip.getAttribute("data-receipts").split(",")); return; }
    if (t.closest("[data-close-sheet]") || t.id === "sheet") { closeSheet(); return; }
    if (t.closest("[data-mute]")) { toggleMute(); if (state.mode === "title") showTitle(); else openPanel("about"); return; }
    if (t.closest("[data-newgame]")) { localStorage.removeItem("ck_save"); newGame(); return; }
    if (t.closest("[data-continue]")) { ui.panels.classList.add("hidden"); ui.panels.innerHTML = ""; state.mode = "play"; loadSave(); return; }
    if (t.closest("[data-restart]")) { localStorage.removeItem("ck_save"); location.reload(); return; }
    const op = t.closest("[data-open-panel]"); if (op) { openPanel(op.getAttribute("data-open-panel")); return; }
    if (t.closest("[data-close-panel]")) { closePanel(); return; }
    const tab = t.closest("[data-tab]"); if (tab) { openPanel(tab.getAttribute("data-tab")); return; }
    const ch = t.closest("[data-choice]"); if (ch) { pickChoice(+ch.getAttribute("data-choice")); return; }
    if (t.closest("[data-adv]")) { advanceDialog(); return; }
  });

  // touch controls
  function bindTouch() {
    if (!("ontouchstart" in window)) { ui.touch.classList.add("hidden"); return; }
    ui.touch.classList.remove("hidden");
    ui.touch.querySelectorAll("[data-dir]").forEach((b) => {
      const dir = b.getAttribute("data-dir");
      const on = (e) => { e.preventDefault(); keys["touch_" + dir] = true; };
      const off = (e) => { e.preventDefault(); keys["touch_" + dir] = false; };
      b.addEventListener("touchstart", on); b.addEventListener("touchend", off); b.addEventListener("touchcancel", off);
    });
    const a = ui.touch.querySelector("[data-a]");
    a.addEventListener("touchstart", (e) => { e.preventDefault(); audioInit(); if (state.mode === "dialog") advanceDialog(); else if (state.mode === "play") interact(); });
  }

  /* ------------------------------------------------------------------ */
  /* World interaction                                                    */
  function interact() {
    const fx = state.facing;
    const cx = state.px + 6, cy = state.py + 8;
    const rx = cx + (fx === "left" ? -14 : fx === "right" ? 14 : 0);
    const ry = cy + (fx === "up" ? -14 : fx === "down" ? 14 : 0);
    // NPCs
    for (const n of state.entities) {
      const nx = n.x * TILE + 6, ny = n.y * TILE + 8;
      if (Math.abs(nx - cx) < 22 && Math.abs(ny - cy) < 22) {
        n.facePlayer = true;
        const d = (n.dialogs || []).find((dd) => !dd.if || checkReq(dd.if));
        if (d) { startDialog(d.id); return; }
      }
    }
    // triggers (interactable props)
    for (const tr of (state.scene.triggers || [])) {
      if (tr.type !== "interact") continue;
      if (!tr.if || checkReq(tr.if)) {
        const tx = (tr.x + (tr.w || 1) / 2) * TILE, ty = (tr.y + (tr.h || 1) / 2) * TILE;
        if (Math.abs(tx - rx) < 18 && Math.abs(ty - ry) < 18) {
          if (tr.dialog) startDialog(tr.dialog);
          if (tr.fx) applyFx(tr.fx);
          return;
        }
      }
    }
  }

  function tryMove(dx, dy, dt) {
    const spd = (state.slowWalk ? WALK_SLOW : WALK) * dt;
    let nx = state.px + dx * spd, ny = state.py + dy * spd;
    // player collision box: x+2..x+10, y+9..y+15 (feet)
    const box = (X, Y) => {
      const pts = [[X + 2, Y + 9], [X + 9, Y + 9], [X + 2, Y + 15], [X + 9, Y + 15]];
      return pts.every(([px2, py2]) => {
        const gx = Math.floor(px2 / TILE), gy = Math.floor(py2 / TILE);
        if (gx < 0 || gy < 0 || gx >= state.W || gy >= state.H) return false;
        if (state.solids[gy][gx]) return false;
        return true;
      }) && !state.entities.some((n) => Math.abs(n.x * TILE + 6 - (X + 6)) < 11 && Math.abs(n.y * TILE + 8 - (Y + 12)) < 10);
    };
    if (box(nx, state.py)) state.px = nx;
    if (box(state.px, ny)) state.py = ny;
  }

  function checkTriggers() {
    const gx = Math.floor((state.px + 6) / TILE), gy = Math.floor((state.py + 12) / TILE);
    for (const tr of (state.scene.triggers || [])) {
      if (tr.type === "interact") continue;
      if (gx >= tr.x && gx < tr.x + (tr.w || 1) && gy >= tr.y && gy < tr.y + (tr.h || 1)) {
        if (tr.if && !checkReq(tr.if)) continue;
        if (tr.once && state.flags["trg_" + (tr.flag || tr.x + "_" + tr.y + "_" + state.sceneId)]) continue;
        if (tr.once) state.flags["trg_" + (tr.flag || tr.x + "_" + tr.y + "_" + state.sceneId)] = true;
        if (tr.goto) { transition(() => loadScene(tr.goto.s, tr.goto)); return; }
        if (tr.dialog) { startDialog(tr.dialog); return; }
        if (tr.fx) { applyFx(tr.fx); return; }
      }
    }
  }

  function transition(fn) {
    ui.fade.classList.add("dark");
    setTimeout(() => { fn(); ui.fade.classList.remove("dark"); }, 420);
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                               */
  function render() {
    const sc = state.scene; if (!sc) return;
    // camera (small maps center in the viewport)
    const targX = state.px + 6 - (VIEW_W * TILE) / 2, targY = state.py + 8 - (VIEW_H * TILE) / 2;
    state.cam.x = state.W * TILE <= VIEW_W * TILE ? -((VIEW_W - state.W) * TILE) / 2 : clamp(targX, 0, state.W * TILE - VIEW_W * TILE);
    state.cam.y = state.H * TILE <= VIEW_H * TILE ? -((VIEW_H - state.H) * TILE) / 2 : clamp(targY, 0, state.H * TILE - VIEW_H * TILE);
    const camX = Math.round(state.cam.x), camY = Math.round(state.cam.y);

    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = sc.bg || "#0b0e15";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const x0 = Math.max(0, Math.floor(camX / TILE)), y0 = Math.max(0, Math.floor(camY / TILE));
    for (let y = y0; y < Math.min(state.H, Math.floor(camY / TILE) + VIEW_H + 2); y++) {
      for (let x = x0; x < Math.min(state.W, Math.floor(camX / TILE) + VIEW_W + 2); x++) {
        const t = state.grid[y][x];
        ctx.drawImage(tileCanvas(t.t, (x * 7 + y * 13) % 4), x * TILE - camX, y * TILE - camY);
      }
    }
    // props (multi-tile drawings above base)
    for (const p of (sc.props || [])) {
      if (p.if && !checkReq(p.if)) continue;
      D.props[p.type](ctx, p.x * TILE - camX, p.y * TILE - camY, p);
    }
    // entities + player, y-sorted
    const drawList = state.entities.filter((n) => !n.if || checkReq(n.if)).map((n) => ({
      y: n.y * TILE, draw: () => {
        const f = n.facePlayer ? faceToPlayer(n) : (n.facing || "down");
        const fr = n.walking ? (Math.floor(performance.now() / 180) % 2) : 0;
        ctx.drawImage(sprite(n.look, f, fr), Math.round(n.x * TILE) - camX, Math.round(n.y * TILE) - camY);
        if (nearestTalkable() === n && state.mode === "play") {
          ctx.fillStyle = "#d9a441";
          ctx.fillRect(Math.round(n.x * TILE) - camX + 4, Math.round(n.y * TILE) - camY - 6, 4, 4);
        }
      }
    }));
    drawList.push({
      y: state.py, draw: () => {
        const fr = state.moving ? (Math.floor(performance.now() / 150) % 2) : 0;
        ctx.drawImage(sprite(D.outfits[state.outfit], state.facing, fr), Math.round(state.px) - camX, Math.round(state.py) - camY);
      }
    });
    drawList.sort((a, b) => a.y - b.y).forEach((d) => d.draw());

    // mood overlay
    const moods = {
      day: null, night: "rgba(20,26,58,0.42)", dusk: "rgba(60,30,70,0.25)", dim: "rgba(10,12,24,0.35)",
      sepia: "rgba(120,90,40,0.28)", fabnight: "rgba(18,10,50,0.5)", sterile: "rgba(190,200,230,0.10)", lumen: "rgba(255,246,220,0.16)"
    };
    const ov = moods[state.mood];
    if (ov) { ctx.fillStyle = ov; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    if (state.mood === "sepia") { ctx.fillStyle = "rgba(40,28,10,0.18)"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    if (state.mood === "lumen") {
      const g = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 30, canvas.width / 2, canvas.height / 2, 200);
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,250,235,0.22)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  function faceToPlayer(n) {
    const dx = state.px - n.x * TILE, dy = state.py - n.y * TILE;
    return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
  }
  function nearestTalkable() {
    const cx = state.px + 6, cy = state.py + 8;
    let best = null, bd = 26;
    for (const n of state.entities) {
      if (!(n.dialogs || []).some((dd) => !dd.if || checkReq(dd.if))) continue;
      const d = Math.hypot(n.x * TILE + 6 - cx, n.y * TILE + 8 - cy);
      if (d < bd) { bd = d; best = n; }
    }
    return best;
  }

  /* ------------------------------------------------------------------ */
  /* Main loop                                                            */
  let last = performance.now(), saveT = 0, lastFrame = 0;
  function loop(now) {
    lastFrame = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (state.mode === "play") {
      let dx = 0, dy = 0;
      if (keys["arrowup"] || keys["w"] || keys["touch_up"]) dy = -1;
      else if (keys["arrowdown"] || keys["s"] || keys["touch_down"]) dy = 1;
      if (keys["arrowleft"] || keys["a"] || keys["touch_left"]) dx = -1;
      else if (keys["arrowright"] || keys["d"] || keys["touch_right"]) dx = 1;
      state.moving = !!(dx || dy);
      if (state.moving) {
        state.facing = dx ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
        tryMove(dx, dy, dt);
        checkTriggers();
      }
      saveT += dt; if (saveT > 10) { saveT = 0; save(); }
    }
    if (state.mode === "minigame") tickMinigame(dt);
    if (state.mode !== "title" && state.mode !== "epilogue") {
      try { render(); } catch (e) { console.error("render error", e); }
    }
  }
  function frame(now) { loop(now); requestAnimationFrame(frame); }
  // hidden-tab fallback: keep ticking when rAF is throttled/paused
  setInterval(() => { if (performance.now() - lastFrame > 300) loop(performance.now()); }, 150);

  /* ------------------------------------------------------------------ */
  /* Boot                                                                 */
  function newGame() {
    ui.panels.classList.add("hidden"); ui.panels.innerHTML = "";
    Object.assign(state, { flags: {}, items: [], insights: [], quests: {}, sincerity: 0, outfit: "arrive", playStart: Date.now(), playPrior: 0 });
    state.mode = "cutscene";
    loadScene(S.startScene.s, S.startScene);
    startCutscene("opening");
  }

  bindTouch();
  showTitle();
  requestAnimationFrame(frame);

  // expose tiny debug hook (used by build tests only)
  window.__CK = { state, loadScene, startDialog, applyFx, S, D, newGame, showEpilogue };
})();
