# CHOKEPOINT — a playable long-read

**Play it: https://sebvasquez91.github.io/chokepoint/** · [How it was made](https://sebvasquez91.github.io/chokepoint/pipeline.html)

CHOKEPOINT is a playable rendition of one piece of journalism — Virginia Heffernan's
[“I Saw the Face of God in a Semiconductor Factory”](https://www.wired.com/story/i-saw-the-face-of-god-in-a-tsmc-factory/)
(WIRED, March 2023). You steer Taiwan's strategy across six eras, from umbrella factories to the centre
of the digital world, and try to build the Silicon Shield. Every rule in the game cites the article:
tap the ¶ chips to read the exact sentences.

This is **demonstrator №1 of PressPlay**, an engine by [Kita](https://getkita.org) that turns journalism
into playable interactive experiences — analysis → format selection → constrained generation → provenance,
with the journalist in editorial control. The point of the demonstrator is the *transformation*, documented
end-to-end in [`pipeline/`](pipeline/):

| Stage | Artefact |
|---|---|
| 01 Source capture | [`pipeline/01-article.public.md`](pipeline/01-article.public.md) (paragraph map; full text not republished) |
| 02 Story model | [`pipeline/02-story-model.md`](pipeline/02-story-model.md) — 50 claims, 6 theses, causal graph, sensitivity flags |
| 03 Format selection | [`pipeline/03-format-selection.md`](pipeline/03-format-selection.md) — taxonomy scoring; why era-strategy beat the obvious logistics sim |
| 04 Mechanic spec | [`pipeline/04-mechanic-spec.md`](pipeline/04-mechanic-spec.md) — the game, parameterised by the article |
| 05 Provenance | [`pipeline/05-content-provenance.md`](pipeline/05-content-provenance.md) — every element → source span |
| 06 Fidelity check | [`pipeline/06-fidelity-check.md`](pipeline/06-fidelity-check.md) — 10 distortion risks & mitigations |
| 07 Build notes | [`pipeline/07-build-notes.md`](pipeline/07-build-notes.md) — what was manual, what the engine automates |

## Integrity by construction

- **Receipts**: 53 verbatim, attributed quotes surface in-game; every number and rule traces to a paragraph.
- **Badge grammar**: ★ historical (receipt-backed) · REPORTED (receipt-backed failure) · amber MODELLED
  (counterfactual, extrapolated from the article's stated logic — never invented facts).
- **Truth-path optimality**: the historically true strategy is the highest-scoring run; mastering the game
  means comprehending the article.
- **No conflict simulation**: deterrence appears only in sourced quotes.

## Architecture (the product claim, in code)

- [`content.js`](content.js) — pure data: what the engine generates *per article*.
- [`app.js`](app.js) — the reusable era-strategy mechanic template (engine IP): state machine, meters,
  receipts sheet, chain map. A different article on this template is a different game.
- No frameworks, no build step, no tracking, no external requests. Static hosting anywhere.

Run locally: any static server, e.g. `python3 -m http.server 4173` then open `http://localhost:4173`.

## Credits & rights

Source article © Condé Nast; quoted (≈60 sentences) with attribution and links for research-demonstration
purposes. This project is unofficial and unaffiliated with WIRED or the author; it renders that article's
reporting and viewpoint, and it exists to send you to the original.

Built by [Kita](https://getkita.org) as evidence for the PressPlay R&D programme. Contact: Sebastian Vasquez.
