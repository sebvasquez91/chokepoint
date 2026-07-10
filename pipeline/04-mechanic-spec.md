# Pipeline stage 04 — Mechanic spec (game design document)

**Input**: [02-story-model.md](02-story-model.md), [03-format-selection.md](03-format-selection.md).
**What this stage is**: the instantiation of the chosen mechanic template with article-derived parameters. In the engine, this document is generated (template + story model → spec) and reviewed by a journalist in the editorial workspace. Every parameter below traces to a claim ID from stage 02.

## Identity

- **Title**: **CHOKEPOINT** — *How an island made itself unconquerable* (working subtitle).
- **Framing line**: "A playable rendition of Virginia Heffernan's 'I Saw the Face of God in a Semiconductor Factory' (WIRED, 2023). You steer Taiwan's strategy from postwar poverty to the centre of the digital world. Can you build the Silicon Shield?"
- **Session length**: 5–8 minutes. Replayable (truth-path discovery + score).
- **Tone**: strategic, wry, awed — borrows the article's registers; never triumphalist about conflict (stage-02 flag #1); ends on the article's own ambivalence (T6).

## Core loop

Era briefing (≤120 words, article-grounded) → **choose 1 of 3 strategies** → consequence card (meter deltas + receipts, or "modelled" badge) → next era. Six eras, then the epilogue: Shield verdict + **break-the-chain dependency map** + truth-path recap + read-the-original CTA.

## State: four meters (0–100; start E15 / K5 / T10 / I0)

| Meter | Meaning (article language) | Anchors |
|---|---|---|
| Economy 💰 | national livelihood | "barely survived" C25 |
| Know-how 🔬 | engineering depth, process lead | curiosity & stamina C13; patents C37 |
| Trust 🤝 | customers & allies believe you won't cheat | pure-play T4; clean network C20 |
| Indispensability ⛰ | how badly the world needs you | T2 "invaluable… so it couldn't be neglected or pushed around" C26 |

**Silicon Shield gauge** = 0.45·I + 0.25·T + 0.20·K + 0.10·E, drawn as a mountain that fills. Verdicts: ≥80 **"The Porcupine"** (C09/P069 receipt) · 60–79 **"The Golden Goose"** (C07) · 40–59 **"Valued, not vital"** · <40 **"Neglected and pushed around"** (C26 phrase, receipted).

## Eras (decision nodes)

Historical option marked ★ (receipt-backed); others get **modelled** badge per stage-03 counterfactual policy. Deltas are E/K/T/I.

**1 · 1950s–60s — Survival** (brief from C25)
- ★ *Light industry — spoons, mugs, umbrellas* → +20/+5/0/0. Consequence: by the '70s, 3 of every 4 umbrellas worldwide (C25). Sting: anything you can make cheaply, someone cheaper can take (sets up Era 2, C26 logic).
- *Heavy industry drive* → +5/+3/0/0 · modelled (capital you don't have; C25 "barely survived").
- *Stay agrarian* → +8/0/0/0 · modelled (no export ladder).

**2 · 1970s — Abandonment** (brief from C26: Nixon, Barbie leaves Taishan, niches move to China)
- *Compete on price — cut wages* → −5/0/0/0 · modelled (the article reports China's labour was cheaper: a race you lose, C26).
- ★ *Become invaluable — pick something the US cannot ignore* → 0/0/+5/+10. Receipt: P060 "Invaluable, rather, so it couldn't be neglected or pushed around."
- *Court new patrons instead* → 0/0/+5/0 · modelled.

**3 · 1976–85 — The apprenticeship** (brief from C27–C29)
- ★ *Educate and absorb — fund engineering schools, welcome RCA tech-sharing and TI's factory, answer Wang's koan* → +5/+25/+5/+5. Receipts: P061 (RCA 1976, TI), P063 (education money), P064–P065 (An Wang 1982: graduate output per population "much higher than in the US"). Fact card (non-choice): early fabs staffed largely by women (C27, quote + irony preserved).
- *Buy finished technology* → +5/+8/0/0 · modelled (capability without depth).
- *Indigenous everything* → 0/+5/0/0 · modelled (against the dispersed-gifts thesis T1).

**4 · 1987 — The founding bet** (brief from C30–C31: K.T. Li persuades Morris Chang; gov + Philips money)
- *National champion — design and sell your own branded chips* → +10/+5/−10/+5 · modelled (customers won't hand designs to a competitor — trust ceiling, inverse of T4).
- ★ *Pure play — make only other people's chips, never your own designs* → +5/+5/+25/+15. Receipts: P070 ("like a printing press stealing plots from novelists"; crux strategy; Midway & Stalingrad), P067 (first investors: Taiwanese government and Philips).
- *Stay downstream — assembly and packaging only* → +5/0/+5/+2 · modelled (replaceable again — umbrella logic).

**5 · ~2000 — The Moore's Law crisis** (brief from C34/C40: 65nm fine, 45nm trouble; the treadmill is faith, "shared optimism")
- *Bet on the exotic calcium-fluoride lens* → −10/−5/0/0 · **reported dead end**: hundreds of furnaces, no method worked, "close to a billion dollars went up in smoke" (C41 — a receipt-backed failure, not modelled).
- *Wait for EUV to mature* → 0/+5/0/−5 · modelled tempo loss; receipt for the gap: source power reliable at 10W vs the ~250W needed (C41/C43).
- ★ *Shoot the light through water — immersion lithography* → 0/+25/0/+15. Receipts: P080 (Lin foresaw 45nm trouble), P082 ("Water is a miracle", 28nm, eventually zero defects). Follow-on beat (truth path): 14 Oct 2014 EUV eureka, 10W→90W, "too excited" (C43); 2nm into production 2025 (C44); ~56,000 patents (C37).

**6 · 2020s — The Shield and the invitation** (brief from C02/C19: you make 92% of the most advanced chips; Washington's $280bn CHIPS Act asks you to build in Arizona)
- *Refuse — the shield must stay concentrated at home* → 0/0/−5/+5 · modelled (explicitly: "the article does not report this path").
- ★ *Build the Arizona subsidiary — lock in the entente, keep the leading edge home* → +10/0/+15/0. Receipts: P052 (Raimondo: "national security vulnerability… we're changing that"), P053 (10,000 jobs, largest foreign investment in Arizona history; Apple & "American-made chips"), P054 (chips still Taiwanese-engineered; entente, **not** independence), P034 (culture-clash flavour: "sweatshop" vs "babies" rumours).
- *License the technology to everyone* → +5/0/+5/−20 · modelled (dissolves the crux; T2/T3 reversed).

## Epilogue

1. **Shield verdict** (gauge + verdict tier + truth-path tally "You found the real strategy: n/6").
2. **Break the chain** — the dependency map (interactive): SAND (Brazil · France · Appalachia, C05/C47) → WAFERS (Sumco, Japan, C05) → MACHINES (ASML, Veldhoven, ~$400M each, C31/C38) → FABS (TSMC, Hsinchu & Tainan — 92% / ⅓ of all chips / quintillion transistors per 6 months, C02/C03) → DESIGNERS (Apple, Nvidia, AMD, MediaTek, Broadcom, Marvell — fabless, C06) → THE WORLD ("there is air—and TSMC", C08). Tap any node to sever it → article-sourced consequence (C08 bricked devices; C09 fabs bricked without partners; C38 no EUV without ASML; C06/C33 no trust → no designs). Closing line: the Savary thesis — dispersed gifts, mutual need (P013/P102) — **the interdependence is the shield** (T1→T3).
3. **The article's own doubt** (T6): Liu rejecting the "Sacred Mountain" label (C11) and "I hope the righteous human collaboration will continue" (C46); one line on the ambiguity (C18). No triumphal ending.
4. **Read the original** — prominent CTA to the WIRED piece; "you'll recognise everything."

## Integrity surfaces (stage-06 requirements built into UI)

- **Receipt chips** on every consequence/fact card → bottom-sheet with verbatim quote, "WIRED · Virginia Heffernan · March 2023", deep link. Quotes verbatim, attributed, never blended into game copy (stage-02 flag #5).
- **Modelled badge** (amber) on every non-reported outcome: "Modelled from the article's logic — not reported in the article", tappable for the policy explanation.
- **About panel**: what this is (PressPlay demonstrator #1 by Kita), full attribution, quoted-vs-modelled explanation, corrections note (the game uses the article's published correction, P106), viewpoint disclosure (renders this article's account), and link to the engine-view page.
- **No conflict simulation**: deterrence discussed only in sourced quotes (flag #1).

## Architecture (the productisation claim, demonstrated)

- `content.js` — **pure data**: eras, options, deltas, receipts (quote + ¶ref + URL), map nodes/edges, verdict copy. *This file is what the engine generates per article.*
- `app.js` — **the mechanic template runtime** (era-strategy template): state machine, meters, cards, receipts sheet, map interaction, scoring. *This is engine IP, reused across articles.*
- `index.html` / `styles.css` — shell & design system; `pipeline.html` — engine view. No frameworks, no external requests, WCAG 2.2 AA targets, `prefers-reduced-motion` respected, mobile-first (≥375px), works offline once loaded.
