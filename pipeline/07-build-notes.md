# Pipeline stage 07 — Build notes: manual vs. automatable

**What this stage is**: the honest ledger. CHOKEPOINT was built in a hand-guided run of the pipeline — an AI system (Claude) performing each stage under human editorial direction, in roughly one working day end-to-end. This file records what each stage took, what needed human judgement, and what that implies for the engine R&D. This is the PoC's second job: evidence for exactly which parts of the transformation are automatable today, which are research problems, and which must stay human.

## Stage-by-stage ledger

| Stage | How it ran for this build | Automation status → R&D implication |
|---|---|---|
| 01 Source capture | Scripted fetch + paragraph extraction/numbering (see prompts log below) | **Automatable now** (engineering, not research): CMS/URL ingestion, boilerplate stripping, stable paragraph addressing |
| 02 Story model | AI extraction of claims/quotes/theses with paragraph refs; human verification of every quote against the numbered text | **Core R&D**: schema-constrained, span-grounded extraction with reject-don't-guess; precision target ≥90%, invented facts = 0. Verification pass must be built in, not bolted on |
| 03 Format selection | Scored by hand against the taxonomy; notably **overturned the human's pre-read format guess** (logistics sim → era-strategy) | **Core R&D + new knowledge**: the news→play taxonomy itself, plus a ranked classifier with editorial rationale. Key architectural rule proven here: format selection must run *after* story modelling — topic alone mis-predicts |
| 04 Mechanic spec | Template instantiation by hand: mapping article arc → decision nodes, claims → parameters, calibrating the truth-path-optimal scoring | **Partially automatable**: node/parameter mapping is generative-with-constraints; scoring calibration is a solvable optimisation (truth path = argmax); *fun* still needs a designer-in-the-loop (WP3's playtesting loop) |
| 05 Generation | Game copy written by AI under constraint (all facts from stage-02 claims; quotes verbatim; qualifiers preserved), into a data file separate from the runtime | **Core R&D**: constrained generation with provenance threading. The `content.js` / `app.js` split is the production architecture: engine generates data, templates render it |
| 06 Fidelity check | Manual adversarial review against stage-02 sensitivity flags; 10 risks mitigated, 2 accepted & disclosed | **Core R&D — the distinctive pillar**: automated entailment/consistency checking, distortion taxonomy, flag-don't-fix for source inconsistencies, corrections propagation |
| 07 Runtime & design | Hand-built once (vanilla JS/SVG, ~1,100 lines): the era-strategy template with receipts sheet, badge grammar, meters, chain map | **Engine IP, amortised**: each mechanic template is built once by humans, then reused across every article that maps to it. Demonstrator cost ≈ a day; marginal cost per additional article on this template ≈ the pipeline run + editorial review |

## What only humans did (and should keep doing)

- Editorial judgement calls: which claims are load-bearing; where the article's irony must survive; what not to gamify (the theology thread).
- Taste: tone of game copy, pacing, the decision to end on the article's ambivalence rather than a win-screen.
- Sign-off: every quote, badge and outcome was human-reviewed before shipping. The engine's editorial workspace productises exactly this review, aiming at <2h journalist time per piece.

## Cost line for the grant narrative

Bespoke newsgames of comparable polish are reported in the tens of thousands of pounds and weeks-to-months of team time per piece. This demonstrator: one hand-guided pipeline run, ~one day, one generalist + AI system — with the runtime template now reusable. The engine's promise is that the *pipeline run* becomes minutes of compute plus a bounded editorial review; this ledger is the evidence base for that claim and for where the remaining research risk sits (stages 02, 03, 05, 06).

## Prompts & method log (abridged)

1. **Capture**: fetch canonical HTML → extract `.body__inner-container` paragraphs → number `P001–P108` (python/BeautifulSoup; 8,935 words).
2. **Extraction prompt pattern**: "From the numbered article text, extract {claims, quantities, quotes, causal edges, theses, sensitivity flags}; every item must cite paragraph IDs; omit anything you cannot ground." Output human-verified against the source before use.
3. **Format scoring**: rubric = "score each taxonomy pattern 0–5 for how fully the *grounded* story model can drive it without external facts; justify from claim IDs."
4. **Copy generation constraint**: "Game copy may only assert facts present in the claim table; direct quotes verbatim with their ¶ ref; preserve qualifiers; counterfactual outcomes must be labelled modelled and derive only from stated article logic."
5. **Fidelity pass**: adversarial checklist from stage-02 flags + "what could this mechanic imply that the article does not?"

Full artefacts: [02-story-model.md](02-story-model.md) · [03-format-selection.md](03-format-selection.md) · [04-mechanic-spec.md](04-mechanic-spec.md) · [05-content-provenance.md](05-content-provenance.md) · [06-fidelity-check.md](06-fidelity-check.md) · [08-narrative-design.md](08-narrative-design.md)

## Addendum — build 2 (the narrative RPG)

The format override (stage 08) was executed as a second render of the SAME story model: no re-analysis of the
article was needed — the claim table, quotes, theses and sensitivity flags of stage 02 fed the RPG directly.
New work was: the narrative design document (08), a second mechanic template (`rpg.js` — canvas world, dialogue
trees, quests/notebook, cutscenes, two micro-interactions), and per-article content data (`rpg-data.js`,
`rpg-story.js`: 17 scenes, 18 parametric characters, 77 dialogue trees, 130 verbatim receipts, 63 ¶-tagged
spoken lines, 21 notebook insights). Hand-guided cost: roughly one further working day. Engine implication:
**templates amortise** — the second format cost no analysis and no provenance rework, only template + copy,
and the template is now reusable for any article whose story model carries a protagonist-quest signal.
Verification: automated full-path playthrough (all 11 quests to epilogue), per-scene render smoke test,
gate-order checks (three refusals enforce sequence), and a low-frame-rate resilience pass (hidden-tab tick
fallback; forgiving minigame windows).
