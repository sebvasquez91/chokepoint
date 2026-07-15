/* =========================================================================
   CHOKEPOINT RPG — rpg-data.js
   World data: character looks, tiles, props, scenes/maps.
   Generated per-article by the engine (paired with rpg-story.js).
   ========================================================================= */

window.RPG_DATA = (function () {
  "use strict";

  /* ---------------- character looks (parametric pixel people) -------- */
  const skinA = "#e8b98f", skinB = "#d9a06b", skinC = "#c98d5e";
  const looks = {
    you_arrive: { skin: skinA, hair: "long", hairC: "#3a2d23", top: "#3f6f6a", bottom: "#2a3145", shoe: "#1d2330" },
    you_mall:   { skin: skinA, hair: "long", hairC: "#3a2d23", top: "#2e3a5c", bottom: "#2e3a5c", shoe: "#1d2330" },
    you_bunny:  { skin: skinA, hair: "long", hairC: "#3a2d23", top: "#f2f2f6", bottom: "#e8e8ee", shoe: "#cfd6e4", gown: true },
    kramer:     { skin: skinB, hair: "side", hairC: "#2b2b2b", top: "#7a4a3a", bottom: "#3a3f4e", shoe: "#23262f", glasses: false },
    liu:        { skin: skinB, hair: "short", hairC: "#9aa2b1", top: "#22304e", bottom: "#1d2740", shoe: "#12151c", tie: "#8b2f2f", age: true, badge: true },
    chan:       { skin: skinB, hair: "short", hairC: "#20222a", top: "#6b5a3e", bottom: "#2f3340", shoe: "#23262f", glasses: true, coat: true },
    lin:        { skin: skinC, hair: "short", hairC: "#e6e8ee", top: "#5d6470", bottom: "#3a3f4e", shoe: "#23262f", glasses: true, age: true },
    yen:        { skin: skinB, hair: "short", hairC: "#23262f", top: "#33507a", bottom: "#2a3145", shoe: "#1d2330", glasses: true },
    krach:      { skin: "#e9c39a", hair: "side", hairC: "#b9bfca", top: "#31343e", bottom: "#23262f", shoe: "#15171d", tie: "#41597d", age: true },
    orderly:    { skin: skinB, hair: "short", hairC: "#20222a", top: "#f2f2f6", bottom: "#e8e8ee", shoe: "#cfd6e4", gown: true },
    clerk_mall: { skin: skinA, hair: "bob", hairC: "#1f232e", top: "#a05070", bottom: "#2a3145", shoe: "#23262f" },
    clerk_711:  { skin: skinB, hair: "short", hairC: "#23262f", top: "#2f7a52", bottom: "#2a3145", shoe: "#23262f" },
    clerk_air:  { skin: skinC, hair: "bob", hairC: "#2b2b2b", top: "#38507c", bottom: "#2a3145", shoe: "#23262f" },
    doorman:    { skin: skinB, hair: "short", hairC: "#1c1e26", top: "#23262f", bottom: "#1d2027", shoe: "#101216", tie: "#8b2f2f" },
    worker_f:   { skin: skinB, hair: "bob", hairC: "#2b2620", top: "#8a8f9c", bottom: "#5d6470", shoe: "#3a3f4e" },
    worker_m:   { skin: skinC, hair: "short", hairC: "#2b2620", top: "#8a8f9c", bottom: "#5d6470", shoe: "#3a3f4e" },
    wang:       { skin: skinB, hair: "bald", hairC: "#000", top: "#37405a", bottom: "#2a3145", shoe: "#1d2330", glasses: true, age: true },
    li:         { skin: skinB, hair: "side", hairC: "#9aa2b1", top: "#454a58", bottom: "#33363f", shoe: "#1d2330", tie: "#2f4d6b", age: true },
    chang_sil:  { skin: "#2a3145", hair: "short", hairC: "#1c2130", top: "#232a3d", bottom: "#1c2130", shoe: "#141824" }
  };
  const outfits = { arrive: "you_arrive", mall: "you_mall", bunny: "you_bunny" };

  /* ---------------- tile painters ------------------------------------ */
  const R = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
  const base = (c, col) => R(c, 0, 0, 16, 16, col);
  const speck = (c, seed, col, n) => { for (let i = 0; i < n; i++) { const x = (seed * 5 + i * 7) % 15, y = (seed * 3 + i * 11) % 15; R(c, x, y, 1, 1, col); } };

  const tiles = {
    wood: (c, s) => { base(c, "#6b5138"); for (let y = 0; y < 16; y += 4) R(c, 0, y, 16, 1, "#5d4630"); speck(c, s, "#7a5f42", 3); },
    pale: (c, s) => { base(c, "#b9bcc6"); R(c, 0, 0, 16, 1, "#a7abb8"); R(c, 0, 0, 1, 16, "#a7abb8"); speck(c, s, "#c6c9d3", 2); },
    lab: (c, s) => { base(c, "#d9dce6"); R(c, 0, 0, 16, 1, "#c6cad8"); R(c, 0, 0, 1, 16, "#c6cad8"); },
    carpet: (c, s) => { base(c, "#31405f"); speck(c, s, "#3a4a6d", 4); },
    carpetR: (c, s) => { base(c, "#5e2f35"); speck(c, s, "#6d383f", 4); },
    asphalt: (c, s) => { base(c, "#23262e"); speck(c, s, "#2b2f39", 4); },
    sidewalk: (c, s) => { base(c, "#3a3f4c"); R(c, 0, 0, 16, 1, "#333844"); R(c, 0, 0, 1, 16, "#333844"); },
    grass: (c, s) => { base(c, "#2f4a35"); speck(c, s, "#3a5a41", 5); },
    dirt: (c, s) => { base(c, "#6b5a3e"); speck(c, s, "#7a684a", 4); },
    platform: (c, s) => { base(c, "#4a4f5c"); R(c, 0, 13, 16, 3, "#d9a441"); R(c, 0, 15, 16, 1, "#23262e"); },
    fabfloor: (c, s) => { base(c, "#e8ebf2"); R(c, 0, 0, 16, 1, "#d6dae6"); R(c, 0, 0, 1, 16, "#d6dae6"); if (s === 0) R(c, 7, 7, 2, 2, "#dfe3ec"); },
    rug: (c) => { base(c, "#7a4a3a"); R(c, 1, 1, 14, 14, "#8a5a48"); R(c, 3, 3, 10, 10, "#7a4a3a"); },
    track: (c) => { base(c, "#15171d"); R(c, 0, 4, 16, 2, "#3a3f4c"); R(c, 0, 10, 16, 2, "#3a3f4c"); },

    wallTop: (c) => { base(c, "#12151c"); R(c, 0, 12, 16, 4, "#1c2029"); },
    wallOffice: (c) => { base(c, "#39415a"); R(c, 0, 0, 16, 2, "#2e354b"); R(c, 0, 14, 16, 2, "#2e354b"); },
    wallHotel: (c) => { base(c, "#4a3d4e"); R(c, 0, 0, 16, 2, "#3e3342"); R(c, 0, 14, 16, 2, "#3e3342"); },
    wallBrick: (c, s) => { base(c, "#4e3a38"); for (let y = 0; y < 16; y += 4) { R(c, 0, y, 16, 1, "#40302e"); R(c, (y / 4 % 2) * 8 + 3, y + 1, 1, 3, "#40302e"); } },
    wallGlass: (c) => { base(c, "#2b3550"); R(c, 1, 1, 14, 14, "#3d4f79"); R(c, 2, 2, 5, 12, "#4a5f92"); },
    wallFab: (c) => { base(c, "#eef0f6"); R(c, 0, 0, 16, 2, "#dfe3ec"); R(c, 0, 14, 16, 2, "#dfe3ec"); },
    wallRed: (c) => { base(c, "#8b2f2f"); R(c, 0, 0, 16, 2, "#7a2828"); R(c, 0, 14, 16, 2, "#7a2828"); },
    windowN: (c) => { base(c, "#39415a"); R(c, 2, 2, 12, 10, "#16204a"); R(c, 3, 3, 3, 3, "#d9a441"); R(c, 9, 5, 2, 2, "#8b7cf6"); },
    windowD: (c) => { base(c, "#39415a"); R(c, 2, 2, 12, 10, "#7ea3c8"); R(c, 3, 3, 4, 4, "#a9c4dd"); },

    counter: (c) => { R(c, 0, 0, 16, 16, "#2b2f39"); R(c, 0, 0, 16, 8, "#5d4630"); R(c, 0, 7, 16, 2, "#4a3826"); },
    counterW: (c) => { R(c, 0, 0, 16, 16, "#8a8f9c"); R(c, 0, 0, 16, 8, "#c6cad8"); R(c, 0, 7, 16, 2, "#a7abb8"); },
    shelf: (c, s) => { base(c, "#4a3826"); R(c, 1, 2, 14, 4, "#5d4630"); R(c, 1, 9, 14, 4, "#5d4630"); const cols = ["#a05070", "#3f6f6a", "#d9a441", "#8b7cf6"]; for (let i = 0; i < 4; i++) { R(c, 2 + i * 3.5, 3, 2, 2, cols[(i + s) % 4]); R(c, 2 + i * 3.5, 10, 2, 2, cols[(i + s + 1) % 4]); } },
    fridge: (c, s) => { base(c, "#2f7a52"); R(c, 1, 1, 14, 14, "#163a26"); R(c, 2, 2, 12, 5, "#1e5c3a"); R(c, 2, 9, 12, 5, "#1e5c3a"); for (let i = 0; i < 3; i++) { R(c, 3 + i * 4, 3, 2, 3, ["#d9a441", "#e0e4ee", "#a05070"][(i + s) % 3]); R(c, 3 + i * 4, 10, 2, 3, ["#8b7cf6", "#d9a441", "#e0e4ee"][(i + s) % 3]); } },
    tableT: (c) => { base(c, "#3a3f4c"); R(c, 1, 1, 14, 10, "#6b5138"); R(c, 2, 2, 12, 8, "#7a5f42"); R(c, 2, 11, 2, 4, "#4a3826"); R(c, 12, 11, 2, 4, "#4a3826"); },
    chairT: (c) => { R(c, 4, 4, 8, 8, "#4a5068"); R(c, 4, 2, 8, 3, "#3a415a"); R(c, 5, 12, 2, 3, "#2b2f39"); R(c, 9, 12, 2, 3, "#2b2f39"); },
    deskT: (c) => { base(c, "#2b2f39"); R(c, 0, 2, 16, 9, "#4a3f5c"); R(c, 1, 3, 14, 7, "#584a6d"); R(c, 3, 4, 4, 3, "#e0e4ee"); R(c, 9, 5, 4, 2, "#9aa2b1"); },
    bedH: (c) => { R(c, 1, 0, 14, 16, "#5d4630"); R(c, 2, 2, 12, 8, "#e0e4ee"); R(c, 3, 3, 10, 4, "#c6cad8"); },
    bedF: (c) => { R(c, 1, 0, 14, 14, "#7a4a3a"); R(c, 2, 0, 12, 12, "#8a5a48"); R(c, 1, 13, 14, 2, "#5d4630"); },
    plant: (c) => { R(c, 5, 10, 6, 5, "#7a4a3a"); R(c, 4, 3, 8, 8, "#2f5a3a"); R(c, 6, 1, 4, 4, "#3a6f47"); R(c, 3, 6, 3, 3, "#3a6f47"); R(c, 10, 5, 3, 3, "#2f5a3a"); },
    tree: (c) => { R(c, 6, 10, 4, 6, "#4a3826"); R(c, 2, 1, 12, 10, "#2f5a3a"); R(c, 4, 0, 8, 5, "#3a6f47"); },
    bin: (c) => { R(c, 4, 5, 8, 10, "#3a415a"); R(c, 3, 4, 10, 2, "#4a5068"); },
    vending: (c) => { R(c, 1, 0, 14, 16, "#8b2f2f"); R(c, 3, 2, 8, 9, "#16204a"); R(c, 4, 3, 2, 2, "#d9a441"); R(c, 7, 3, 2, 2, "#e0e4ee"); R(c, 4, 6, 2, 2, "#8b7cf6"); R(c, 12, 3, 2, 6, "#23262f"); },
    beltT: (c) => { base(c, "#2b2f39"); R(c, 0, 3, 16, 10, "#15171d"); R(c, 0, 3, 16, 1, "#4a5068"); R(c, 0, 12, 16, 1, "#4a5068"); },
    seatT: (c) => { R(c, 1, 2, 14, 11, "#38507c"); R(c, 1, 1, 14, 3, "#2c405f"); R(c, 2, 13, 3, 2, "#23262f"); R(c, 11, 13, 3, 2, "#23262f"); },
    doorD: (c) => { base(c, "#0b0e15"); R(c, 1, 0, 14, 16, "#12151c"); R(c, 3, 2, 10, 14, "#08090d"); },
    doorS: (c) => { base(c, "#39415a"); R(c, 1, 1, 6, 14, "#5a6a8f"); R(c, 9, 1, 6, 14, "#5a6a8f"); R(c, 7, 1, 2, 14, "#12151c"); },
    turnstileT: (c) => { base(c, "#b9bcc6"); R(c, 2, 4, 3, 12, "#5d6470"); R(c, 11, 4, 3, 12, "#5d6470"); R(c, 4, 7, 8, 2, "#d9a441"); },
    washT: (c) => { base(c, "#d9dce6"); R(c, 1, 2, 14, 12, "#8a8f9c"); R(c, 3, 4, 10, 6, "#3d4f79"); R(c, 5, 6, 6, 2, "#7ea3c8"); R(c, 7, 11, 2, 2, "#d9a441"); },
    lockerT: (c) => { base(c, "#c6cad8"); R(c, 1, 1, 6, 14, "#a7abb8"); R(c, 9, 1, 6, 14, "#a7abb8"); R(c, 5, 6, 1, 3, "#5d6470"); R(c, 13, 6, 1, 3, "#5d6470"); },
    machineT: (c, s) => { base(c, "#eef0f6"); R(c, 1, 2, 14, 12, "#f7f8fb"); R(c, 1, 2, 14, 2, "#dfe3ec"); R(c, 3, 6, 2, 2, s % 2 ? "#8b7cf6" : "#d9a441"); R(c, 11, 6, 2, 1, "#9aa2b1"); },
    crateT: (c) => { base(c, "#6b5a3e"); R(c, 1, 1, 14, 14, "#7a684a"); R(c, 1, 7, 14, 2, "#5d4e35"); R(c, 7, 1, 2, 14, "#5d4e35"); },
    gateT: (c) => { base(c, "#3a3f4c"); for (let x = 1; x < 16; x += 4) R(c, x, 2, 2, 14, "#5d6470"); R(c, 0, 2, 16, 2, "#5d6470"); },
    tvT: (c) => { base(c, "#39415a"); R(c, 1, 2, 14, 10, "#12151c"); R(c, 2, 3, 12, 8, "#16204a"); R(c, 3, 4, 5, 3, "#8b7cf6"); R(c, 9, 5, 4, 2, "#d9a441"); R(c, 6, 13, 4, 2, "#23262f"); },
    posterT: (c, s) => { base(c, "#39415a"); R(c, 2, 1, 12, 14, s % 2 ? "#2c3550" : "#4a2f38"); R(c, 3, 2, 10, 3, "#e0e4ee"); R(c, 3, 7, 10, 1, "#9aa2b1"); R(c, 3, 9, 8, 1, "#9aa2b1"); R(c, 3, 11, 9, 1, "#9aa2b1"); },
    boardT: (c) => { base(c, "#39415a"); R(c, 1, 2, 14, 11, "#e8ebf2"); R(c, 2, 4, 8, 1, "#3d4f79"); R(c, 2, 6, 10, 1, "#8b2f2f"); R(c, 2, 8, 6, 1, "#3d4f79"); },
    neonT: (c, s) => { base(c, "#12151c"); R(c, 1, 3, 14, 10, "#1c2029"); R(c, 2, 4, 12, 8, s % 2 ? "#16303f" : "#3f1630"); R(c, 3, 6, 10, 2, s % 2 ? "#3fd9a4" : "#e05a8a"); R(c, 3, 9, 7, 1, "#d9a441"); },
    phoneT: (c) => { base(c, "#4a3f5c"); R(c, 3, 5, 10, 8, "#23262f"); R(c, 4, 3, 8, 3, "#8b2f2f"); R(c, 5, 7, 6, 4, "#3d4f79"); },
    starb: (c) => { base(c, "#163a26"); R(c, 1, 1, 14, 14, "#1e5c3a"); R(c, 5, 4, 6, 6, "#e0e4ee"); R(c, 6, 5, 4, 4, "#1e5c3a"); R(c, 3, 12, 10, 2, "#e0e4ee"); },
    seven: (c) => { base(c, "#e0e4ee"); R(c, 0, 0, 16, 5, "#e8542f"); R(c, 0, 5, 16, 5, "#2f7a52"); R(c, 0, 10, 16, 6, "#e0e4ee"); R(c, 6, 11, 4, 5, "#d9a441"); },
    dark: (c) => base(c, "#0b0e15"),
    void: (c) => base(c, "#05070c")
  };

  /* ---------------- prop painters (drawn above tiles) ---------------- */
  const props = {
    label: (c, x, y, p) => {
      c.font = "7px monospace"; c.textBaseline = "top";
      const w = c.measureText(p.text).width + 6;
      R(c, x + 8 - w / 2, y, w, 10, "rgba(11,14,21,0.82)");
      c.fillStyle = p.color || "#d9a441"; c.fillText(p.text, x + 11 - w / 2, y + 2);
    },
    euv: (c, x, y) => {
      R(c, x - 4, y - 18, 56, 34, "#f7f8fb"); R(c, x - 4, y - 18, 56, 5, "#dfe3ec");
      R(c, x, y - 10, 12, 16, "#c6cad8"); R(c, x + 16, y - 8, 22, 12, "#e3e6ef");
      R(c, x + 20, y - 4, 6, 4, "#8b7cf6"); R(c, x + 30, y - 4, 4, 4, "#d9a441");
      R(c, x + 42, y - 12, 6, 20, "#b9bcc6"); R(c, x - 4, y + 15, 56, 2, "#a7abb8");
    },
    ship: (c, x, y) => { R(c, x + 2, y + 6, 12, 4, "#7a4a3a"); R(c, x + 7, y - 2, 1, 8, "#4a3826"); R(c, x + 4, y - 1, 7, 4, "#e0e4ee"); R(c, x, y + 9, 16, 2, "#5d4630"); },
    lego: (c, x, y) => { R(c, x + 3, y + 8, 10, 5, "#8b2f2f"); R(c, x + 5, y + 4, 6, 5, "#d9a441"); R(c, x + 6, y + 1, 4, 4, "#3d6fb0"); },
    mountain: (c, x, y, p) => {
      const w = p.w || 200;
      c.fillStyle = "#1a2030";
      c.beginPath(); c.moveTo(x, y + 30); c.lineTo(x + w * 0.25, y); c.lineTo(x + w * 0.45, y + 18); c.lineTo(x + w * 0.6, y + 4); c.lineTo(x + w, y + 30); c.closePath(); c.fill();
      c.fillStyle = "#232c42"; c.fillRect(x, y + 28, w, 4);
    },
    suitcase: (c, x, y) => { R(c, x + 2, y + 4, 12, 9, "#6d383f"); R(c, x + 6, y + 2, 4, 3, "#4a2328"); R(c, x + 4, y + 6, 8, 1, "#d9a441"); },
    umbrellas: (c, x, y) => { R(c, x + 2, y + 2, 3, 10, "#8b2f2f"); R(c, x + 6, y + 1, 3, 11, "#3d6fb0"); R(c, x + 10, y + 3, 3, 9, "#d9a441"); R(c, x + 1, y + 12, 14, 3, "#4a3826"); },
    books: (c, x, y) => { R(c, x + 3, y + 6, 4, 8, "#8b2f2f"); R(c, x + 8, y + 4, 4, 10, "#2c5f8a"); },
    barbieSign: (c, x, y) => { R(c, x, y, 32, 12, "#e05a8a"); R(c, x + 2, y + 2, 28, 8, "#f2f2f6"); R(c, x + 4, y + 4, 20, 3, "#e05a8a"); }
  };

  /* ---------------- scenes ------------------------------------------- */
  // legend helper
  const L = (o) => o;
  const W = { t: "wallTop", solid: 1 }, OF = { t: "wallOffice", solid: 1 }, HO = { t: "wallHotel", solid: 1 },
    BR = { t: "wallBrick", solid: 1 }, GL = { t: "wallGlass", solid: 1 }, FB = { t: "wallFab", solid: 1 },
    RD = { t: "wallRed", solid: 1 }, NN = { t: "windowN", solid: 1 }, DY = { t: "windowD", solid: 1 };

  const scenes = {
    /* --- Prologue: New York apartment ------------------------------- */
    ny: {
      name: "New York — the night before", mood: "dim", audio: [110, false], bg: "#0b0e15",
      map: [
        "############",
        "#nWWn#WWnWW#",
        "#w.w.w.wwww#",
        "#w.......b.#",
        "#wd..t..ss.#",
        "#w.......p.#",
        "#w.w..w.w..#",
        "#####D######"
      ],
      legend: L({
        "#": W, "n": NN, "W": OF, "w": { t: "wood" }, ".": { t: "wood" },
        "d": { t: "deskT", solid: 1 }, "t": { t: "tableT", solid: 1 }, "b": { t: "bedH", solid: 1 },
        "s": { t: "bedF", solid: 1 }, "p": { t: "plant", solid: 1 }, "D": { t: "doorD" }
      }),
      props: [
        { type: "suitcase", x: 3, y: 5 }, { type: "books", x: 4, y: 4 },
        { type: "label", x: 1, y: 2, text: "phone", color: "#8b7cf6" }, { type: "label", x: 8, y: 2, text: "podcast" }
      ],
      npcs: [],
      triggers: [
        { type: "interact", x: 3, y: 5, dialog: "ny_pack", label: "the suitcase" },
        { type: "interact", x: 1, y: 2, w: 2, dialog: "ny_phone", label: "the phone" },
        { type: "interact", x: 8, y: 2, w: 3, dialog: "ny_podcast", label: "the podcast" },
        { type: "walk", x: 5, y: 7, dialog: "ny_door", marker: "exit", if: { notFlag: "ny_ready" } },
        { type: "walk", x: 5, y: 7, fx: { cutscene: "flight" }, marker: "exit", if: { flag: "ny_ready" } }
      ],
      hints: [
        { t: "Pack the case. Take the calls.", if: { notFlag: "ny_ready" } },
        { t: "The door. The airport. Taipei.", if: { flag: "ny_ready" } }
      ]
    },

    /* --- Act 1: Taoyuan baggage claim -------------------------------- */
    airport: {
      name: "Taoyuan — baggage claim", mood: "dim", audio: [130.8, false], bg: "#101319",
      map: [
        "######################",
        "#pppppppppppppppppppp#",
        "#p.......C..........p#",
        "#p.bbbbbbbbbbbbbbbb.p#",
        "#p.b..............b.p#",
        "#p.bbbbbbbbbbbbbbbb.p#",
        "#p..................p#",
        "#p....s.............p#",
        "#p..................p#",
        "#pppppppppppppDppppp##",
        "######################"
      ],
      legend: L({
        "#": W, "p": { t: "pale" }, ".": { t: "pale" }, "b": { t: "beltT", solid: 1 },
        "C": { t: "counterW", solid: 1 }, "s": { t: "pale" }, "D": { t: "doorS" }
      }),
      props: [
        { type: "suitcase", x: 6, y: 7, if: { flag: "___never" } },
        { type: "label", x: 9, y: 2, text: "BAGGAGE SERVICES", color: "#e0e4ee" }
      ],
      npcs: [
        { id: "airclerk", look: "clerk_air", x: 9, y: 2.2, facing: "down", dialogs: [{ id: "air_clerk2", if: { flag: "air_asked" } }, { id: "air_clerk" }] }
      ],
      triggers: [
        { type: "walk", x: 3, y: 6, w: 14, h: 1, dialog: "air_carousel", once: true, flag: "aircar" },
        { type: "walk", x: 14, y: 9, goto: { s: "street", x: 4, y: 3, f: "down" }, if: { flag: "air_asked" } },
        { type: "walk", x: 14, y: 9, dialog: "air_nudge", if: { notFlag: "air_asked" } }
      ],
      hints: [{ t: "Your Samsonite is not coming.", if: { notFlag: "air_asked" } }, { t: "Taxi to Taipei — the doors.", if: { flag: "air_asked" } }]
    },

    /* --- Act 1/2 hub: Taipei street ---------------------------------- */
    street: {
      name: "Taipei — night market street", mood: "dusk", audio: [146.8, false], bg: "#0d0f16",
      map: [
        "##############################",
        "#BBnBBnBB#GGGGG#BBnBB#7#sssss#",
        "#BB.HHH.B#G...G#B...B#7#s...s#",
        "#Bd.....D#Gd..D#Bd..D#d#sd..D#",
        "#........#.....#.....#.#.....#",
        "#ssssssssssssssssssssssssssss#",
        "#............................#",
        "#aaaaaaaaaaaaaaaaaaaaaaaaaaaa#",
        "#aaaaaaaaaaaaaaaaaaaaaaaaaaaa#",
        "#............................#",
        "#ssssssTsssssssVssnssssssssss#",
        "#s..........................s#",
        "#s..........................s#",
        "##############¤###############"
      ],
      legend: L({
        "#": W, "B": BR, "G": GL, "n": NN, "H": { t: "neonT", solid: 1 }, "7": { t: "seven", solid: 1 },
        ".": { t: "sidewalk" }, "s": { t: "sidewalk" }, "a": { t: "asphalt" },
        "d": { t: "doorD" }, "D": { t: "doorD" }, "T": { t: "tree", solid: 1 }, "V": { t: "vending", solid: 1 },
        "¤": { t: "platform" }
      }),
      props: [
        { type: "label", x: 3, y: 1, text: "HOTEL", color: "#e05a8a" },
        { type: "label", x: 11, y: 1, text: "MINI-MALL 3F", color: "#3fd9a4" },
        { type: "label", x: 17, y: 1, text: "STARBUCKS", color: "#3fd9a4" },
        { type: "label", x: 22, y: 1, text: "7-ELEVEN", color: "#e8542f" },
        { type: "label", x: 25, y: 1, text: "TV·NEWS", color: "#8b7cf6" },
        { type: "label", x: 14, y: 10, text: "to HSINCHU →", color: "#d9a441" }
      ],
      npcs: [
        { id: "newsstand", look: "worker_m", name: "the news-stand", x: 18.5, y: 10.6, facing: "down", dialogs: [{ id: "newsstand" }] }
      ],
      triggers: [
        { type: "walk", x: 2, y: 3, dialog: "hotel_enter_router" },
        { type: "walk", x: 8, y: 3, goto: { s: "hotel", x: 7, y: 8, f: "up" }, if: { flag: "___never" } },
        { type: "walk", x: 11, y: 3, dialog: "mall_router" },
        { type: "walk", x: 13, y: 3, goto: { s: "street", x: 13, y: 4 }, if: { flag: "___never" } },
        { type: "walk", x: 17, y: 3, dialog: "starbucks_router" },
        { type: "walk", x: 22, y: 3, dialog: "seven_router" },
        { type: "interact", x: 26, y: 3, dialog: "tv_window", label: "the TV", if: { flag: "met_kramer" } },
        { type: "interact", x: 26, y: 3, dialog: "tv_early", label: "the TV", if: { notFlag: "met_kramer" } },
        { type: "walk", x: 14, y: 13, dialog: "train_router" }
      ],
      hints: [
        { t: "A man named Kramer drinks 7-Eleven coffee.", if: { notFlag: "met_kramer" } },
        { t: "Learn the island · the litho · the stakes.", if: { flag: "met_kramer", notFlag: "tourGranted" } },
        { t: "Sleep. Tomorrow: the Sacred Mountain.", if: { flag: "tourGranted", notFlag: "tour_day" } },
        { t: "Hsinchu. The fab. Go.", if: { flag: "tour_day" } }
      ]
    },

    /* --- interiors off the street ------------------------------------ */
    hotel: {
      name: "Hotel — room 9F", mood: "dim", audio: [98, false], bg: "#0b0e15",
      map: [
        "##############",
        "#nHHnHHHHnHHH#",
        "#w..........w#",
        "#wbs....d.p.w#",
        "#w......t...w#",
        "#w..r.......w#",
        "#w......f...w#",
        "#w..........w#",
        "#######D######"
      ],
      legend: L({
        "#": W, "n": NN, "H": HO, "w": { t: "wood" }, ".": { t: "wood" }, "r": { t: "rug" },
        "b": { t: "bedH", solid: 1 }, "s": { t: "bedF", solid: 1 }, "d": { t: "deskT", solid: 1 },
        "t": { t: "phoneT", solid: 1 }, "p": { t: "plant", solid: 1 }, "f": { t: "tableT", solid: 1 }, "D": { t: "doorD" }
      }),
      props: [
        { type: "label", x: 8, y: 3, text: "phone", color: "#8b7cf6" },
        { type: "suitcase", x: 11, y: 6, if: { flag: "luggage_back" } }
      ],
      npcs: [],
      triggers: [
        { type: "interact", x: 8, y: 4, dialog: "phone_router", label: "the phone" },
        { type: "interact", x: 1, y: 3, w: 2, dialog: "bed_router", label: "the bed" },
        { type: "interact", x: 7, y: 3, dialog: "desk_notes", label: "your notebook" },
        { type: "interact", x: 11, y: 6, dialog: "case_back", label: "your Samsonite", if: { flag: "luggage_back" } },
        { type: "walk", x: 7, y: 8, goto: { s: "street", x: 2, y: 4, f: "down" } }
      ],
      hints: [
        { t: "The phone works. The bed forgives.", if: { notFlag: "tourGranted" } },
        { t: "COVID test, then sleep.", if: { flag: "tourGranted", notFlag: "tour_day" } }
      ]
    },

    mall: {
      name: "Mini-mall — third floor, open after hours", mood: "night", audio: [123.5, false], bg: "#0b0e15",
      map: [
        "##############",
        "#SSSS#nn#SSSS#",
        "#............#",
        "#.SS......SS.#",
        "#............#",
        "#....C.......#",
        "#............#",
        "#######D######"
      ],
      legend: L({
        "#": W, "n": NN, "S": { t: "shelf", solid: 1 }, ".": { t: "pale" }, "C": { t: "counter", solid: 1 }, "D": { t: "doorD" }
      }),
      props: [{ type: "label", x: 5, y: 4, text: "NAVY SEPARATES", color: "#3fd9a4" }],
      npcs: [
        { id: "mallclerk", look: "clerk_mall", x: 5, y: 3.4, facing: "down", dialogs: [{ id: "mall_clerk2", if: { flag: "bought_clothes" } }, { id: "mall_clerk" }] }
      ],
      triggers: [{ type: "walk", x: 7, y: 7, goto: { s: "street", x: 11, y: 4, f: "down" } }],
      hints: [{ t: "Toothbrush. Shapeless navy-blue separates.", if: { notFlag: "bought_clothes" } }]
    },

    seven: {
      name: "7-Eleven", mood: "day", audio: [155.6, false], bg: "#0e1118",
      map: [
        "############",
        "#ffff#nn#fff#",
        "#..........s#",
        "#.SS...SS..s#",
        "#..........s#",
        "#C..........#",
        "######D#####",
        "############"
      ],
      legend: L({
        "#": W, "n": NN, "f": { t: "fridge", solid: 1 }, "S": { t: "shelf", solid: 1 },
        ".": { t: "pale" }, "s": { t: "pale" }, "C": { t: "counter", solid: 1 }, "D": { t: "doorD" }
      }),
      props: [{ type: "label", x: 8, y: 4, text: "coffee ·10%·", color: "#d9a441" }],
      npcs: [
        { id: "sclerk", look: "clerk_711", x: 1, y: 4.2, facing: "right", dialogs: [{ id: "seven_clerk" }] },
        {
          id: "kramer", look: "kramer", x: 8, y: 4.2, facing: "left",
          dialogs: [
            { id: "kramer_gate", if: { pillarsDone: true, flag: "refusal3", notFlag: "tourGranted" } },
            { id: "kramer_refusal3", if: { pillarTwo: true, flag: "refusal2", notFlag: "refusal3" } },
            { id: "kramer_refusal2", if: { pillarAny: true, notFlag: "refusal2" } },
            { id: "kramer_press", if: { flag: "krach2_done", notFlag: "press_done" } },
            { id: "kramer_smalltalk", if: { flag: "met_kramer" } },
            { id: "kramer_first" }
          ]
        }
      ],
      triggers: [{ type: "walk", x: 6, y: 6, goto: { s: "street", x: 22, y: 4, f: "down" } }],
      hints: [{ t: "He's by the coffee machine.", if: { notFlag: "met_kramer" } }]
    },

    starbucks: {
      name: "Starbucks — mediocre flatbread", mood: "day", audio: [138.6, false], bg: "#0e1118",
      map: [
        "##############",
        "#nn##nn##nn###",
        "#............#",
        "#.Th....Th...#",
        "#.hT....hT...#",
        "#............#",
        "#C.......D...#",
        "##############"
      ],
      legend: L({
        "#": W, "n": NN, "T": { t: "tableT", solid: 1 }, "h": { t: "chairT" }, ".": { t: "wood" },
        "C": { t: "counter", solid: 1 }, "D": { t: "doorD" }
      }),
      props: [],
      npcs: [
        {
          id: "chan", look: "chan", x: 2, y: 3.4, facing: "right",
          dialogs: [
            { id: "chan_done", if: { flag: "fb_all_done" } },
            { id: "chan_mid", if: { flag: "chan_intro" } },
            { id: "chan_intro" }
          ]
        }
      ],
      triggers: [{ type: "walk", x: 9, y: 6, goto: { s: "street", x: 17, y: 4, f: "down" } }],
      hints: [{ t: "The historian talks in a steady stream.", if: { notFlag: "fb_all_done" } }]
    },

    /* --- transitions & Hsinchu ---------------------------------------- */
    train: {
      name: "THSR — southbound", mood: "day", audio: [164.8, false], bg: "#10131a",
      map: [
        "####################",
        "#yyyyyyyyyyyyyyyyyy#",
        "#..................#",
        "#ss.ss.ss.ss.ss.ss.#",
        "#..................#",
        "#ss.ss.ss.ss.ss.ss.#",
        "#..................#",
        "######D#############"
      ],
      legend: L({
        "#": W, "y": DY, "s": { t: "seatT", solid: 1 }, ".": { t: "carpet" }, "D": { t: "doorD" }
      }),
      props: [{ type: "label", x: 9, y: 2, text: "HSINCHU — 30 min", color: "#d9a441" }],
      npcs: [],
      triggers: [
        { type: "walk", x: 9, y: 4, w: 2, dialog: "train_thoughts", once: true, flag: "trainthink" },
        { type: "walk", x: 6, y: 7, goto: { s: "park", x: 3, y: 4, f: "right" } }
      ],
      hints: [{ t: "Walk the aisle. Watch the island go by.", if: {} }]
    },

    park: {
      name: "Hsinchu Science Park", mood: "day", audio: [174.6, false], bg: "#0d1017",
      map: [
        "########################",
        "#gggggggggggggggggggggg#",
        "#g..gg..............gg.#",
        "#g.....OOOOnOOnOOOO....#",
        "#s.....O..........O..s.#",
        "#s.....O...RR.....O..s.#",
        "#s.....OOOODOOOOOOO..s.#",
        "#s......ssssssss.....s.#",
        "#sTs..s..........s..sTs#",
        "#s.....GGGGDGGGG.....s.#",
        "#s.....G.......G.....s.#",
        "#gggggg.........gggggg.#",
        "########################"
      ],
      legend: L({
        "#": W, "g": { t: "grass" }, "s": { t: "sidewalk" }, ".": { t: "sidewalk" },
        "O": OF, "n": NN, "R": RD, "G": GL, "D": { t: "doorD" }, "T": { t: "tree", solid: 1 }
      }),
      props: [
        { type: "label", x: 10, y: 3, text: "TSMC", color: "#e0e4ee" },
        { type: "label", x: 10, y: 9, text: "UMC — across the street", color: "#9aa2b1" }
      ],
      npcs: [
        { id: "doorman", look: "doorman", x: 10, y: 6.4, facing: "down", dialogs: [{ id: "doorman_tour", if: { flag: "tour_day" } }, { id: "doorman" }] }
      ],
      triggers: [
        { type: "walk", x: 11, y: 6, dialog: "hq_enter_router" },
        { type: "interact", x: 11, y: 9, dialog: "umc_door", label: "UMC, the rival" },
        { type: "walk", x: 1, y: 4, h: 3, goto: { s: "train", x: 6, y: 6, f: "up" }, if: { notFlag: "tour_day" } },
        { type: "walk", x: 1, y: 4, h: 3, dialog: "no_return_tour", if: { flag: "tour_day" } }
      ],
      hints: [
        { t: "The Sacred Mountain is a building in a business park.", if: { notFlag: "liu_met" } },
        { t: "Today they are expecting you.", if: { flag: "tour_day" } }
      ]
    },

    hq: {
      name: "TSMC — headquarters", mood: "day", audio: [130.8, false], bg: "#0e1118",
      map: [
        "########################",
        "#OOnOOOOROOOOOnOOOOOOOO#",
        "#......................#",
        "#..pp.............pp...#",
        "#......................#",
        "#...C.....RR...........#",
        "#......................#",
        "#..Th..........#####D###",
        "#..hT..........#cccccc.#",
        "#..............Dc.tsc..#",
        "#..............#c.ll...#",
        "######D#########cccccc.#",
        "########################"
      ],
      legend: L({
        "#": W, "O": OF, "n": NN, "R": RD, ".": { t: "pale" }, "p": { t: "plant", solid: 1 },
        "C": { t: "counterW", solid: 1 }, "T": { t: "tableT", solid: 1 }, "h": { t: "chairT" },
        "c": { t: "carpet" }, "t": { t: "tableT", solid: 1 }, "s": { t: "tableT", solid: 1 }, "l": { t: "chairT" },
        "D": { t: "doorD" }
      }),
      props: [
        { type: "label", x: 4, y: 4, text: "reception", color: "#9aa2b1" },
        { type: "label", x: 9, y: 5, text: "a few half-hearted pops of red", color: "#e05a8a" },
        { type: "label", x: 17, y: 8, text: "conference room", color: "#d9a441" },
        { type: "ship", x: 18 * 16 / 16, y: 9, if: { flag: "___never" } },
        { type: "poster_air", x: 0, y: 0, if: { flag: "___never" } }
      ],
      npcs: [
        {
          id: "kramer_hq", look: "kramer", x: 6, y: 5.4, facing: "down",
          dialogs: [
            { id: "kramer_gate", if: { pillarsDone: true, flag: "refusal3", notFlag: "tourGranted" } },
            { id: "kramer_refusal3", if: { pillarTwo: true, flag: "refusal2", notFlag: "refusal3" } },
            { id: "kramer_refusal2", if: { pillarAny: true, notFlag: "refusal2" } },
            { id: "kramer_hq_chat", if: { flag: "met_kramer" } }
          ],
          if: { flag: "met_kramer", notFlag: "tour_day" }
        },
        {
          id: "liu", look: "liu", x: 18, y: 9.4, facing: "down",
          dialogs: [
            { id: "liu_again", if: { flag: "liu_done" } },
            { id: "liu_interview" }
          ],
          if: { flag: "met_kramer" }
        }
      ],
      triggers: [
        { type: "interact", x: 17, y: 9, dialog: "ship_look", label: "the trophy ship", if: { flag: "liu_done" } },
        { type: "interact", x: 2, y: 1, w: 3, dialog: "poster_air", label: "the framed photo" },
        { type: "walk", x: 6, y: 11, goto: { s: "park", x: 11, y: 7, f: "down" } },
        { type: "walk", x: 20, y: 7, goto: { s: "uni", x: 7, y: 7, f: "up" }, if: { flag: "liu_done" } },
        { type: "walk", x: 20, y: 7, dialog: "uni_locked", if: { notFlag: "liu_done" } }
      ],
      hints: [
        { t: "The chairman brought Lego.", if: { notFlag: "liu_done" } },
        { t: "Professor Lin sees God in any scale. Door on the right.", if: { flag: "liu_done", notFlag: "lin_done" } }
      ]
    },

    uni: {
      name: "University — a quiet conference room", mood: "day", audio: [146.8, false], bg: "#0e1118",
      map: [
        "##############",
        "#nnWWWWWWWnn##",
        "#............#",
        "#..b.........#",
        "#....TTT.....#",
        "#....hhh.....#",
        "#............#",
        "#######D######"
      ],
      legend: L({
        "#": W, "n": NN, "W": OF, ".": { t: "wood" }, "b": { t: "boardT", solid: 1 },
        "T": { t: "tableT", solid: 1 }, "h": { t: "chairT" }, "D": { t: "doorD" }
      }),
      props: [{ type: "label", x: 5, y: 3, text: "litho, briefly", color: "#8b7cf6" }],
      npcs: [
        {
          id: "lin", look: "lin", x: 6, y: 3.4, facing: "down",
          dialogs: [
            { id: "lin_after", if: { flag: "lin_done" } },
            { id: "lin_interview" }
          ]
        }
      ],
      triggers: [{ type: "walk", x: 7, y: 7, goto: { s: "hq", x: 19, y: 7, f: "left" } }],
      hints: [{ t: "Ask him how the water works.", if: { notFlag: "lin_done" } }]
    },

    /* --- flashbacks ---------------------------------------------------- */
    fb_umbrella: {
      name: "Memory — an umbrella line, 1970s", mood: "sepia", audio: [220, false], bg: "#141008",
      map: [
        "##################",
        "#dddddddddddddddd#",
        "#d..u..u..u..u..d#",
        "#d..CCCCCCCCCC..d#",
        "#d..............d#",
        "#d..CCCCCCCCCC..d#",
        "#d....w..w......d#",
        "#dddddddddddDddd##",
        "##################"
      ],
      legend: L({
        "#": W, "d": { t: "dirt" }, ".": { t: "dirt" }, "C": { t: "counter", solid: 1 },
        "u": { t: "crateT", solid: 1 }, "w": { t: "dirt" }, "D": { t: "doorD" }
      }),
      props: [{ type: "umbrellas", x: 3, y: 2 }, { type: "umbrellas", x: 9, y: 2 }, { type: "label", x: 8, y: 1, text: "MEMORY · 1970s", color: "#d9a441" }],
      npcs: [
        { id: "foreman", look: "worker_m", x: 6, y: 6.2, facing: "down", dialogs: [{ id: "fb_umb_foreman" }] },
        { id: "w1", look: "worker_f", x: 5, y: 3.4, facing: "down", dialogs: [] },
        { id: "w2", look: "worker_f", x: 9, y: 5.4, facing: "up", dialogs: [] }
      ],
      triggers: [
        { type: "interact", x: 3, y: 2, dialog: "fb_umb_crate" },
        { type: "walk", x: 12, y: 7, dialog: "fb_umb_exit" }
      ],
      hints: [{ t: "Three of every four umbrellas on Earth.", if: {} }]
    },

    fb_taishan: {
      name: "Memory — the gates of Taishan", mood: "sepia", audio: [196, false], bg: "#141008",
      map: [
        "##################",
        "#BBBBBBGGBBBBBBBB#",
        "#B..............B#",
        "#B..............B#",
        "#........w......B#",
        "#....w..........B#",
        "#ggggggggggggggg##",
        "#gggggggggggDggg##",
        "##################"
      ],
      legend: L({
        "#": W, "B": BR, "G": { t: "gateT", solid: 1 }, ".": { t: "dirt" }, "w": { t: "dirt" },
        "g": { t: "grass" }, "D": { t: "doorD" }
      }),
      props: [{ type: "barbieSign", x: 6 * 16 / 16, y: 2 }, { type: "label", x: 8, y: 0, text: "MEMORY · the 1970s turn", color: "#d9a441" }],
      npcs: [
        { id: "tworker", look: "worker_f", x: 9, y: 4.2, facing: "down", dialogs: [{ id: "fb_tai_worker" }] },
        { id: "tworker2", look: "worker_m", x: 5, y: 5.2, facing: "right", dialogs: [] }
      ],
      triggers: [
        { type: "interact", x: 7, y: 1, w: 2, dialog: "fb_tai_gate" },
        { type: "walk", x: 12, y: 7, dialog: "fb_tai_exit" }
      ],
      hints: [{ t: "Read the notice on the gate.", if: {} }]
    },

    fb_rca: {
      name: "Memory — a classroom, 1976", mood: "sepia", audio: [233, false], bg: "#141008",
      map: [
        "####################",
        "#WWbWWWWWWWWbWWWWWW#",
        "#..................#",
        "#..TT..TT..TT..TT..#",
        "#..hh..hh..hh..hh..#",
        "#..TT..TT..TT..TT..#",
        "#..hh..hh..hh..hh..#",
        "#..................#",
        "#########D##########",
        "####################"
      ],
      legend: L({
        "#": W, "W": OF, "b": { t: "boardT", solid: 1 }, ".": { t: "wood" },
        "T": { t: "tableT", solid: 1 }, "h": { t: "chairT" }, "D": { t: "doorD" }
      }),
      props: [{ type: "label", x: 9, y: 1, text: "MEMORY · 1976 — RCA tech transfer", color: "#d9a441" }],
      npcs: [
        { id: "wang", look: "wang", x: 3, y: 2.2, facing: "down", dialogs: [{ id: "fb_rca_wang" }] },
        { id: "li", look: "li", x: 14, y: 2.2, facing: "down", dialogs: [{ id: "fb_rca_li" }] },
        { id: "st1", look: "worker_f", x: 4, y: 4.4, facing: "up", dialogs: [{ id: "fb_rca_student" }] },
        { id: "st2", look: "worker_f", x: 8, y: 6.4, facing: "up", dialogs: [] },
        { id: "st3", look: "worker_m", x: 12, y: 4.4, facing: "up", dialogs: [] },
        { id: "chang", look: "chang_sil", x: 16, y: 6.4, facing: "left", dialogs: [{ id: "fb_rca_chang" }] }
      ],
      triggers: [{ type: "walk", x: 9, y: 8, dialog: "fb_rca_exit" }],
      hints: [{ t: "A silhouette by the window is reading a Song-dynasty poem.", if: {} }]
    },

    fb_dial: {
      name: "Memory — the fab, 14 Oct 2014, late", mood: "fabnight", audio: [87.3, false], bg: "#07060f",
      map: [
        "################",
        "#FFFFFFFFFFFFFF#",
        "#F....M.М..M..F#",
        "#F............F#",
        "#F.....e......F#",
        "#F............F#",
        "#FFFFFFFDFFFFF##",
        "################"
      ],
      legend: L({
        "#": W, "F": FB, ".": { t: "fabfloor" }, "M": { t: "machineT", solid: 1 }, "М": { t: "machineT", solid: 1 },
        "e": { t: "fabfloor" }, "D": { t: "doorD" }
      }),
      props: [{ type: "euv", x: 6, y: 4 }, { type: "label", x: 7, y: 1, text: "MEMORY · the power source test", color: "#8b7cf6" }],
      npcs: [
        { id: "yen_fb", look: "yen", x: 4, y: 4.2, facing: "right", dialogs: [{ id: "fb_dial_yen" }] },
        { id: "asml1", look: "worker_m", x: 10, y: 4.2, facing: "left", dialogs: [] }
      ],
      triggers: [],
      hints: [{ t: "Talk to Yen. Hold the beam steady.", if: {} }]
    },

    /* --- Act 3 ---------------------------------------------------------- */
    ante: {
      name: "Fab 12A — antechamber", mood: "sterile", audio: [196, false], bg: "#0e1118",
      map: [
        "##################",
        "#FFFFFFFFFFFFFFFF#",
        "#F..t...w...L..LF#",
        "#F..............F#",
        "#F..............F#",
        "#FFFFFFFFDFFFFFF##",
        "##################"
      ],
      legend: L({
        "#": W, "F": FB, ".": { t: "lab" }, "t": { t: "turnstileT", solid: 1 },
        "w": { t: "washT", solid: 1 }, "L": { t: "lockerT", solid: 1 }, "D": { t: "doorD" }
      }),
      props: [
        { type: "label", x: 3, y: 1, text: "turnstile", color: "#9aa2b1" },
        { type: "label", x: 8, y: 1, text: "wash·rinse·dry", color: "#9aa2b1" },
        { type: "label", x: 13, y: 1, text: "gowning", color: "#9aa2b1" }
      ],
      npcs: [
        { id: "orderly1", look: "orderly", x: 12, y: 3.2, facing: "left", dialogs: [{ id: "gowning", if: { flag: "washed" } }, { id: "gowning_wait" }] },
        { id: "kramer_ante", look: "kramer", x: 2, y: 3.4, facing: "right", dialogs: [{ id: "kramer_ante" }] }
      ],
      triggers: [
        { type: "interact", x: 4, y: 2, dialog: "turnstile", label: "the turnstile", if: { notFlag: "turnstiled" } },
        { type: "interact", x: 8, y: 2, dialog: "wash_intro", label: "the wash machine", if: { flag: "turnstiled", notFlag: "washed" } },
        { type: "walk", x: 9, y: 5, goto: { s: "fab", x: 2, y: 6, f: "right" }, if: { outfit: "bunny" } },
        { type: "walk", x: 9, y: 5, dialog: "ante_not_ready", if: { notFlag: "___x", outfit: "arrive" } },
        { type: "walk", x: 9, y: 5, dialog: "ante_not_ready", if: { outfit: "mall" } }
      ],
      hints: [
        { t: "Turnstile → wash → gown. In that order.", if: { notFlag: "washed" } },
        { t: "The orderlies are waiting with your size.", if: { flag: "washed", outfit: "mall" } }
      ]
    },

    fab: {
      name: "Fab 12A — the hall", mood: "lumen", audio: [261.6, true], slow: true, hideHud: true, bg: "#f2f4fa",
      map: [
        "##########################",
        "#FFFFFFFFFFFFFFFFFFFFFFFF#",
        "#F.M..M..M..M..M..M..M..F#",
        "#F......................F#",
        "#F......................F#",
        "#F..M..M...ee...M..M....F#",
        "#F......................F#",
        "#F......................F#",
        "#F.M..M..M..M..M..M..M..F#",
        "#F......................F#",
        "#FFFFFFFFFFFFDFFFFFFFFFF##",
        "##########################"
      ],
      legend: L({
        "#": W, "F": FB, ".": { t: "fabfloor" }, "M": { t: "machineT", solid: 1 }, "e": { t: "fabfloor" }, "D": { t: "doorD" }
      }),
      props: [{ type: "euv", x: 11, y: 5 }],
      npcs: [
        { id: "guide1", look: "orderly", x: 4, y: 3.2, facing: "down", dialogs: [{ id: "fab_guide" }] }
      ],
      triggers: [
        { type: "walk", x: 2, y: 5, w: 2, h: 2, dialog: "fab_enterlight", once: true, flag: "fablight" },
        { type: "interact", x: 3, y: 2, w: 3, dialog: "fab_machines", label: "the machines" },
        { type: "interact", x: 11, y: 5, w: 3, dialog: "fab_litho", label: "the lithography machine" },
        { type: "interact", x: 16, y: 8, w: 3, dialog: "fab_incubators", label: "the far machines" },
        { type: "walk", x: 13, y: 10, dialog: "fab_exit_router" }
      ],
      hints: []
    }
  };

  return { looks, outfits, tiles, props, scenes };
})();
