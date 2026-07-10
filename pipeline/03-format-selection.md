# Pipeline stage 03 — Format selection

**Input**: [02-story-model.md](02-story-model.md).
**What this stage is**: mapping the story model onto the news→play taxonomy and choosing the interaction format(s). In the engine this is a ranked classification with editorial rationale (WP2 of the R&D plan); here it was scored by hand to establish the method.

## Taxonomy scoring for this article

Score = how well the article's *grounded* content can drive that format without importing outside facts (0–5). The provenance-purity rule is binding: a format that needs facts the article doesn't contain scores low **even if the topic suggests it**.

| Interaction pattern | Score | Rationale against the story model |
|---|---|---|
| **Role-taking decision simulation through a historical arc** | **5** | The article's spine IS a sequence of strategic decisions with reported outcomes: light industry → "become invaluable" (C26) → education/tech transfer (C27–C29) → found TSMC, pure-play (C30–C33) → litho bets (C40–C43) → Arizona/entente (C19–C23). Dense causal edges, quotable consequences, named actors. |
| **Dependency-network play ("break the chain")** | **4** | T1/T3 give a complete argument graph: dispersed gifts (C05), pure-play customers (C06), ASML (C38), and the article's own counterfactuals for removal — "every new iPad… bricked" (C08), "fabs themselves would be bricked" (C09). Perfect as a bounded epilogue interaction; too thin for a full game. |
| Operational/logistics management sim (routing, stockpiles, shocks) | 2 | The *topic* suggests it, but this article contains no operational data — no shortage timeline, no capacity/logistics numbers beyond flavour (C03, C24). Building it would require importing facts from other reporting → provenance violation. |
| Timeline reconstruction / ordering | 3 | The 1959→2025 arc supports it, but ordering alone under-uses the causal richness; comprehension value lower than playing the decisions. |
| Estimation / data-play ("guess the number") | 2 | Striking quantities exist (92%, 3-of-4 umbrellas, $280bn) but they're evidence, not a dataset; works as micro-moments inside another format, not as the format. |
| Branching perspective narrative | 2 | Strong voices (Chang, Liu, Lin, Krach) but the article is argument-driven, not experience-of-events-driven; the narrator's pilgrimage doesn't convert without heavy invention. |
| Evidence-board / investigation | 1 | Nothing hidden to reconstruct; the piece is access journalism, not an investigation. |
| System-dynamics sandbox (sliders, feedback loops) | 1 | The article asserts a strategic logic, not a parameterised model; a sandbox would fabricate dynamics. |

## Decision

**Primary format: role-taking decision simulation across six historical eras** ("you steer Taiwan's strategy"), with per-decision consequence cards carrying receipts, and four meters derived from the article's own value language: **Economy, Know-how, Trust, Indispensability** (composite: Silicon Shield strength).

**Secondary format (epilogue): dependency-network "try to break the chain"** — the final map of dispersed gifts where tapping any node shows the article-sourced consequence of removing it. This lands thesis T1/T3 kinaesthetically in 30 seconds — the "understand by doing" money-shot.

**Counterfactual policy** (feeds stage 06): options the history didn't take get outcomes *modelled from the article's stated logic*, and the UI must mark these visually as **"modelled — not reported in the article"**, distinct from receipt-backed outcomes. The truth-path is calibrated to be the optimum, so mastering the game = comprehending the article, and replays converge on what actually happened.

## Addendum (build 2) — editorial format override

After playtesting the shipped era-strategy build, the commissioning editor overrode the format choice:
*"a 2D narrative RPG with relevant characters, dialogues, dynamics and quests."* Note what this validates
rather than contradicts: the role-taking decision pattern scored 5/5 above precisely because the article is
a first-person quest narrative — the RPG template is the fuller rendering of the same signal (protagonist,
gatekeeper, three refusals, transformation ending, all in the source). The engine requirement this adds:
**format selection is a proposal; the editor picks the template, and the story model must be renderable
through more than one.** Both formats now ship from the same stage-02 analysis (see
[08-narrative-design.md](08-narrative-design.md)) — the template-library architecture, demonstrated.

## Method note for the R&D plan (honest record)

The human pre-selection for this PoC — made *before* the story model existed — was an operational logistics sim ("run the supply chain through shocks"). The grounded analysis overturned it: this article cannot support that format without importing external facts. **Format selection must happen downstream of story-model extraction, not from the headline/topic** — a newsroom user would have made the same initial mis-guess. This ordering constraint is now a design requirement for the engine (WP2 before WP3 in the pipeline, per article), and this file is the worked example of why.
