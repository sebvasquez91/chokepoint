# Pipeline stage 06 — Fidelity & distortion check

**What this stage is**: the adversarial review — could the experience imply anything the article doesn't support? Run against the sensitivity flags raised in [stage 02](02-story-model.md). In the engine this is an automated consistency-checking layer plus editorial sign-off; here it was performed manually and logged.

## Risks identified & mitigations shipped

| # | Distortion risk | Mitigation in the shipped experience |
|---|---|---|
| 1 | **Simulating conflict.** A game about the Silicon Shield could drift into a playable invasion scenario — far beyond the article, and editorially unacceptable. | No conflict is ever simulated. Deterrence appears only as sourced, attributed quotes (Krach's porcupine, P017; Liu's "render TSMC inoperative", P017). The epilogue's "test" of the shield is severing supply-chain links, which is exactly the article's own thought experiment (P016–P017). |
| 2 | **Counterfactual leakage.** Players could mistake modelled outcomes ("what if Taiwan refused Arizona?") for reporting. | Three-way badge grammar: ★ historical (receipt-backed), REPORTED (receipt-backed failure), amber MODELLED (extrapolated; badge opens a policy explainer). Every modelled card also carries a "→ history:" rail stating what actually happened, with receipts. |
| 3 | **False optimisation.** If a counterfactual strategy could out-score history, the game would implicitly argue the article's subjects chose wrong — an editorial claim the article doesn't make. | Scoring invariant: the truth path is the designed optimum (77/100). All deviations score lower. Verified in testing. |
| 4 | **Triumphalism.** The article is ambivalent (Liu rejects the "Sacred Mountain" label, P019; the shield is "realpolitik", P015; US–Taiwan is "ambiguous", P043; China's race continues, P049). A win-state game could flatten this into "Taiwan won". | A mandatory epilogue block — "What the article won't let you forget" — carries the ambivalence verbatim, and the highest verdict copy stops short of security guarantees. |
| 5 | **Viewpoint laundering.** The article has an explicit liberal-democracy stance and first-person narrator; presenting its claims as neutral fact would misrepresent both game and source. | About panel declares: this experience renders *this article's* reporting and viewpoint, not an encyclopedia; prominent read-the-original CTAs. |
| 6 | **Sensitive reported history.** The gender-labour paragraph (P061) includes the author's irony; paraphrase could distort it into either endorsement or erasure. | Included as a non-scoring fact card with the verbatim quote one tap away; the author's framing is preserved in the receipt, and the game copy signals the irony ("claimed small hands and paid small wages"). |
| 7 | **Corrections.** The article carries a published correction (P106: Liu's doctorate is UC Berkeley, not MIT). | The game doesn't state the doctorate; era copy describing Chang (MIT/Stanford, P035/P071) is distinct from Liu. The About panel documents the corrections-propagation principle with this example. |
| 8 | **Source-internal inconsistency.** The article calls Savary "Jacques" (P012) and later "Thomas" (P102). | The engine must flag, not silently resolve: the game's Savary quote uses P013 (which names neither) and attributes to "the article's oldest source, from 1675". Logged here as the worked example of the flag-don't-fix rule. |
| 9 | **Numbers drift.** Paraphrasing quantities invites error (e.g. "92% of chips" vs the article's "92% of the most avant-garde chips", P002). | All quantities in game copy were checked against the stage-02 quantities table; qualifiers preserved ("by one analysis", "most advanced"); the receipt is always adjacent. |
| 10 | **Staleness.** The article is a March-2023 snapshot; the world has moved (the game is being played in 2026). | The experience is framed throughout as a rendition of the article as published ("In the world the article reports…", attribution with date on every receipt). No post-publication facts are imported — staleness is disclosed, not patched, in the demonstrator. The production engine adds update/corrections workflows (see R&D plan). |

## Quote-handling convention (logged)

Receipts are verbatim sentence-level quotes. Trimming conventions: quotes may start at a sentence-internal
clause boundary with the first letter silently capitalised (standard editorial practice); internal elisions
are marked `[…]`; leading conjunctions ("But…", "And…") are **retained** where the source sentence begins
with one, after an audit found two quotes that had silently dropped them (P081, P053 — fixed). The engine
requirement this implies: quote extraction must be character-exact against the source span, with trims and
elisions recorded as structured metadata, not left to generation.

## Residual risks accepted for the demonstrator

- **Compression**: six decisions cannot carry a 8,935-word essay's full texture (the theology thread is deliberately untouched — it resists mechanisation and belongs to the original). The read-the-original CTA is the answer; the game is a door, not a replacement.
- **Rights**: the demonstrator quotes ~60 sentences (~7% of the article) with attribution and links, under a research-demonstrator framing; the full text is not republished. In the commercial model, publishers transform their own content, so this class of risk disappears at product stage.
