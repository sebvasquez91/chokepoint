# Pipeline stage 05 — Content & provenance map

**Input**: [04-mechanic-spec.md](04-mechanic-spec.md) → **Output**: [`content.js`](../content.js) (the generated per-article data file; the runtime `app.js` is article-agnostic).

## The provenance rule, as implemented

Every factual element in the experience carries a machine-readable pointer to its source span. In `content.js` this is the `receipts` table: **60 verbatim quotes**, each keyed to a paragraph ID (`P002`–`P104`) of [01-article.md](01-article.md). In-game, receipts render as ¶ chips; tapping one shows the exact sentence(s), attributed (WIRED · Virginia Heffernan · March 2023) and deep-linked to the original. 53 of the 60 extracted receipts are surfaced in-game; 7 remain in the data layer unused (over-extraction is intentional — editorial choice happens downstream of extraction).

## Element → source coverage

| Experience element | Grounding | Where |
|---|---|---|
| Intro framing ("110 miles") | P004 | intro.receipts |
| Era 1 brief + umbrella outcome | P059 | era1 |
| Era 2 brief + strategy outcome | P060 | era2 |
| Era 3 brief + education outcome + labour-history card | P061, P063, P064, P065 | era3 |
| Era 4 brief + pure-play outcome | P066, P067, P070 | era4 |
| Era 5 brief + all three bet outcomes | P072, P080, P081, P082, P085, P086 (+P075, P026) | era5 |
| Era 6 brief + Arizona outcome | P002, P003, P044, P052, P053, P054, P034 | era6 |
| Meter names & shield weighting rationale | value language of T2–T4 (P060, P070, P015) | meters/gaugeNote |
| Verdict tiers | P017, P015, P060 | epilogue.verdicts |
| Chain map: 6 nodes + sever consequences | P014, P077, P067, P016, P017, P104, P003, P070 | epilogue.map |
| Savary thesis | P013 | epilogue.map.thesis |
| Closing ambivalence | P019, P015, P043, P049, P103 | epilogue.doubt |
| "Time flies" sign-off | P098 | epilogue.timeFlies |

## What is deliberately NOT receipt-backed (and how it's marked)

1. **Counterfactual outcomes** (options history didn't take): extrapolated from article logic, marked with the amber `MODELLED — not reported in the article` badge; the badge itself opens a policy explainer. Where a modelled card cites a receipt, the receipt grounds the *logic used*, not the outcome.
2. **Meter deltas**: game balancing (design values), constrained by one designed invariant — the historically true path is the optimum (77/100, "The Porcupine"; every deviation scores lower). Comprehension = mastery.
3. **Verdict copy & UI text**: engine-authored connective tissue, declared as such in the About panel.
4. **One receipt-backed failure**: the calcium-fluoride dead end is REPORTED (P081), not modelled — the game marks it with a distinct violet `REPORTED` badge. The three-way badge system (★ historical / REPORTED / MODELLED) is the visible grammar of the integrity layer.
