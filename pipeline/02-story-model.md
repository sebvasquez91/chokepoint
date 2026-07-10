# Pipeline stage 02 — Story model

**Input**: [01-article.md](01-article.md) (Heffernan, WIRED, 2023-03-21; 108 paragraphs).
**What this stage is**: the structured, machine-usable representation of the article that every later stage builds from. In the engine this is produced by schema-constrained extraction where **every field must cite a source span** — fields that can't be grounded are rejected, not guessed. For this PoC the extraction was model-assisted and human-verified against the numbered text.

## Genre & narrative signals

| Signal | Value | Evidence |
|---|---|---|
| Genre | First-person reported long-read (literary essay + business/geopolitics reporting) | P001, P008, P018 |
| Dominant structures | Historical arc (national strategy over ~60 yrs); dependency network; argued thesis | P059–P068; P014; P013/P015 |
| Authorial stance | Present and explicit (awe, pro-democracy viewpoint, self-questioning) | P008, P098, P102 |
| Temporal span | 1675 (Savary) / 1950s → 2025 (2nm production) | P012, P059, P086 |
| Correction on record | Liu's doctorate is UC Berkeley, not MIT | P106 |

## Core theses (the article's argument, as claims)

- **T1 — Dispersed gifts**: no one place holds the whole chip-making chain; trade in mutual need creates ties (Savary's providence thesis, adopted by the author for TSMC). [P012–P014, P047, P102]
- **T2 — Manufactured indispensability**: Taiwan *deliberately* made itself invaluable to the US "so it couldn't be neglected or pushed around". [P060, P068]
- **T3 — Silicon Shield**: TSMC's near-monopoly on the best chips deters seizure — force would render TSMC inoperative because the global trust network would cut off; "porcupine". [P015, P017, P069]
- **T4 — Trust as business model**: pure-play foundry works because customers trust TSMC not to compete with them ("a printing press doesn't steal plots from novelists"); trust also organises the "clean" tech alliance. [P050, P070, P046–P051]
- **T5 — Moore's Law as shared optimism**: relentless doubling is a collective faith requiring curiosity + stamina and repeated R&D leaps. [P026, P072, P075]
- **T6 — Ambivalence**: the shield is "realpolitik", the US–Taiwan relationship "ambiguous", the label "Sacred Mountain" disliked by TSMC's own chairman; the piece questions its own awe. [P004, P015, P019, P043, P098]

## Entities

**Orgs**: TSMC (P001–), UMC (P010, P022), ASML — Veldhoven, NL (P014, P067, P077, P084), Sumco — JP (P014), Philips — NL, first major investor (P067), Apple (P003, P053), Nvidia (P016, P047), Marvell/AMD/MediaTek/Broadcom (P014), Intel (P034, P061, P072), Wang Laboratories (P064–P065), RCA (P061), Texas Instruments (P061, P066, P073), ITRI (P066), Mattel/Barbie (P060), Huawei (P048–P049), Cerebras (P072).
**People**: Morris Chang (founder, P035, P066, P070–P073), Mark Liu (chairman, P017, P019, P026–P028, P041, P052, P103–P104), Burn-Jeng Lin (immersion litho inventor, P076, P080–P083, P087–P089), Anthony Yen (EUV, P084–P086), Keith Krach (P017, P044–P051), Robert Tsao (P010–P011), Victor Chan (historian, P058–P062), Jensen Huang (P016), Gina Raimondo (P052), K.T. Li (P066), An Wang (P064–P065), Jacques Savary (P012–P013), Adam Tooze (P038).
**Places**: Hsinchu Science Park (P001, P067), Fab 18 Tainan (P003), Fab 12A GigaFab (P057), Phoenix/Arizona (P034, P052–P054), Taishan (P060), Veldhoven (P067), the 110-mile strait (P004).

## Claim table (game-relevant subset; verified against paragraph text)

| ID | Claim | Source |
|---|---|---|
| C01 | TSMC is the largest semiconductor company by revenue; joined world's 10 most valuable companies in 2020; bigger than Meta and Exxon | P002 |
| C02 | TSMC produces ~92% of the world's most advanced chips ("by one analysis") | P002, P070 |
| C03 | TSMC makes a third of all silicon chips; Fab 18 etches a quintillion transistors for Apple every six months; 13 foundries | P003 |
| C04 | The threat across the 110-mile strait is constant; Taiwanese papers euphemise it as "cross-strait tensions" | P004 |
| C05 | Supply chain of "gifts": silicon sand quarried in Brazil, France, Appalachians; Sumco (Japan) grows ingots & slices wafers (up to a foot wide, flattest objects in the world); ASML (Netherlands) builds many of TSMC's machines | P014 |
| C06 | Pure-play: TSMC only makes chips for customers (Marvell, AMD, MediaTek, Broadcom, Apple, Nvidia) | P014 |
| C07 | Silicon Shield: near-monopoly on best chips = "sturdiest artifact of 20th-century realpolitik"; seizing TSMC = slaying the golden goose | P015 |
| C08 | Without TSMC chips, "every new iPad, iPhone, and Mac would be instantly bricked"; Jensen Huang 2014: "there is air—and TSMC" | P016 |
| C09 | Krach: Taiwan is "the porcupine… blow the whole island up, but it will be useless to you"; Liu: force/invasion renders TSMC inoperative; suppliers, designers, networks would cut off; "the fabs themselves would be bricked" | P017, P069 |
| C10 | Tsao (UMC founder) pledged ~$100M for national defence: training 3M civilians | P010 |
| C11 | Liu rejects the "Sacred Mountain" label: "We represent a collaboration of the globalization era" | P019 |
| C12 | Engineer starting salary ≈ $5,400/month; Hsinchu one-bed rent ≈ $450; the famous perk: 10% Burger King discount | P023 |
| C13 | Liu: what sets TSMC scientists apart is **curiosity and stamina** | P026 |
| C14 | Fab process: EUV light through inscribed crystal plate onto wafer, chemical etch, dozens of layers, chips cut from wafer; billions of transistors each | P031 |
| C15 | No "lights-out" fab exists; 20,000 technicians (one-third of workforce) monitor the cycle; engineers roused from bed; spotting a nano-defect ≈ spotting a half-dollar on the moon from your backyard | P033 |
| C16 | From 2021 hundreds of American engineers trained at TSMC for the Arizona fab (production slated for the year after the article); culture-clash rumours: "sweatshop" vs "babies" | P034 |
| C17 | Morris Chang founded TSMC in 1987; claims US engineers less dedicated: "No one in the United States is as dedicated to their work as in Taiwan" (2021) | P035 |
| C18 | States either race to keep up (China "hell-bent") or ally with TSMC/Taiwan (the US); US–Taiwan relationship still ambiguous | P043 |
| C19 | CHIPS and Science Act signed Aug 2022; grew out of a $12bn deal to bring TSMC fabs to the US brokered by Krach; provides ~$280bn; explicit aim of sidelining China; Krach: "Xi is absolutely obsessed with the semiconductor business" | P044 |
| C20 | Krach's "Clean Network": 30+ country tour against Huawei 5G; Huawei routed; ~15% of world chip supply still originates in China; CCP chip czar commands a trillion-dollar budget for the next decade | P048–P049 |
| C21 | Dec 2022 Phoenix fab unveiling (Liu, Biden, Cook); Raimondo: US doesn't make the most sophisticated chips — "a national security vulnerability… we're changing that" | P052 |
| C22 | Arizona fab: 10,000 jobs, largest foreign investment in Arizona history; Apple to use TSMC's "American-made chips" | P053 |
| C23 | Those chips remain Taiwanese-engineered (specs from Hsinchu R&D); Phoenix framed as locking in the entente, **not** semiconductor independence | P053–P054 |
| C24 | Fab 12A "GigaFab" processes 100,000 12-inch wafers per month | P057 |
| C25 | Postwar Taiwan "barely survived"; light industry: spoons, mugs, umbrellas; at the 70s peak, 3 of every 4 umbrellas worldwide were made on the island | P059 |
| C26 | Nixon-era: China took over Taiwan's export goods; Mattel moved Barbie production from Taishan to China for cheaper labour; the government's response: make Taiwan **invaluable** to the US "so it couldn't be neglected or pushed around" | P060 |
| C27 | 1976: RCA began sharing technology with Taiwanese engineers; TI (under Chang) opened a facility near Taipei; early fabs staffed largely by women (per Miller, Intel Penang 1972 "performed better on dexterity tests"); men took the jobs once well-paid | P061 |
| C28 | Government plowed money into engineering education while China's Cultural Revolution persecuted academics | P063 |
| C29 | 1980s: government approached Wang Labs — "How do you make a computer?"; An Wang 1982: Taiwan's engineering-graduate output per population "much higher than in the US"; Wang planted R&D in the new Hsinchu park | P064–P065 |
| C30 | Chang consulted a Song Dynasty poem, left TI, ran ITRI; in 1987 minister K.T. Li persuaded him to start a private chip manufacturer | P066 |
| C31 | TSMC's first major investors: the Taiwanese government and Philips (Dutch); the Dutch connection is a leitmotif → ASML is TSMC's "blood brother" | P067 |
| C32 | Chips took the place of umbrellas and Barbies; Taiwan "did indeed force the US to rely on it" | P068 |
| C33 | Chang's strategy: install TSMC at a crux of the supply chain; he studies the Battles of Midway and Stalingrad; pure-play trust: "TSMC stealing from chip designers would be like a printing press stealing plots from novelists" | P070 |
| C34 | Moore's Law (1965): transistor count doubles ~every 2 years; early-60s: 4 transistors on a thumbnail chip → today 2.6 trillion on a Cerebras chip; Liu: "shared optimism" | P072 |
| C35 | TI's factories wasted up to half their silicon; TSMC's yield is closely guarded, analysts estimate ~80% of latest chips make it | P073 |
| C36 | Strategy: "indispensable but invisible"; employees call the work "unsexy" | P074 |
| C37 | R&D institute passing as a factory; ~56,000 patents | P075 |
| C38 | Next-gen litho machines rumoured ~$400M each; every one of the world's most sophisticated chips uses ASML lithography | P077 |
| C39 | Lithography invented 1796 by playwright Alois Senefelder (grease crayon on wet limestone) | P078 |
| C40 | ~2000 panic that Moore's Law had stalled: 65nm reachable with the tried system, 45nm = trouble (Lin) | P080 |
| C41 | The two fashionable bets: EUV (years away — source power too weak) and a "less aggressive" wavelength needing an exotic calcium-fluoride lens — hundreds of furnaces, no method worked, "close to a billion dollars went up in smoke" | P081 |
| C42 | ~2002 Lin's immersion litho: shoot light through perfectly homogenous water; etch to 28nm, eventually zero defects; "Water is a miracle" | P082 |
| C43 | 14 Oct 2014: Yen + ASML team test new power-source conditions; 10W reliable → hoping for 250W; at 90W, eureka — the tripling was "inevitable"; Yen ran out "too excited", flinging off his bunny suit | P084–P086 |
| C44 | Today TSMC's transistors are just over 2nm — smallest in the world; production in 2025 | P086 |
| C45 | Ordinary air: up to 1M dust particles/m³; the fabs: ≤100 | P094 |
| C46 | Liu: "I hope the bad guys will get their penalty… and I hope the righteous human collaboration will continue" | P103 |
| C47 | Silicon is the second most abundant element in Earth's crust after oxygen; "God made silicon for us" (Liu) | P104 |
| C48 | AR used intensively for partner coordination since 2020 (shared virtual space, goggles) | P032 |
| C49 | Ukraine as "trauma-bonded sister state"; the lost-luggage detail: US flights banned from Russian airspace must circumnavigate | P009–P010 |
| C50 | TSMC HQ is deliberately recessive — "discretion is not just the better part of valor; it's the business model" | P022 |

## Causal / strategic graph (article-asserted edges)

```
postwar poverty ──▶ light industry (umbrellas №1 worldwide)        [C25]
Nixon opens China ──▶ China takes Taiwan's export niches (Barbie)  [C26]
abandonment risk ──▶ STRATEGY: become invaluable to the US        [C26→T2]
education investment + RCA/TI tech transfer ──▶ engineering depth  [C27–C29]
K.T. Li recruits Chang ──▶ TSMC founded 1987 (gov + Philips $)     [C30–C31]
pure-play (no own designs) ──▶ customer trust ──▶ crux position    [C33, T4]
relentless litho R&D bets ──▶ process lead (28nm → 2nm)            [C40–C44]
crux position + process lead ──▶ 92% of most advanced chips        [C02]
92% + global interdependence ──▶ Silicon Shield deterrence         [C07–C09, T3]
CHIPS Act / Arizona fab ──▶ entente locked in (NOT independence)   [C19–C23]
```

## Quantities table (all in-game numbers must come from here)

3 of 4 umbrellas worldwide (C25) · 1987 founding (C17/C30) · 92% most-advanced chips (C02) · one-third of all chips (C03) · quintillion transistors/6 months (C03) · 13 foundries (C03) · 110-mile strait (C04) · $5,400/mo vs $450 rent, 10% Burger King (C12) · 20,000 technicians, ⅓ of workforce (C15) · $12bn deal → $280bn CHIPS Act (C19) · ~15% of chips from China; $1tn China budget (C20) · 10,000 AZ jobs (C22) · 100,000 wafers/month at Fab 12A (C24) · 1976 RCA (C27) · Moore 1965; 4 → 2.6tn transistors (C34) · ~80% yield estimate; TI wasted ~half (C35) · 56,000 patents (C37) · $400M/machine (C38) · 1796 Senefelder (C39) · 65nm ok/45nm trouble (C40) · ~$1bn up in smoke (C41) · 28nm via water (C42) · 14 Oct 2014; 10W→90W→250W (C43) · 2nm, 2025 (C44) · 1M vs ≤100 dust particles/m³ (C45) · ~$100M Tsao pledge; 3M civilians (C10) · silicon 2nd most abundant element (C47).

## Sensitive-content flags (feed to stage 06 fidelity check)

1. **Cross-strait conflict**: the article treats invasion as a deterred hypothetical discussed by named sources (Liu, Krach). The experience must do the same — deterrence logic only, quoted, never a playable war scenario. [P004, P017]
2. **Perspective**: the article has an explicit liberal-democracy viewpoint and a first-person narrator. The experience renders *this article's* account and says so on its About panel — it is a rendition of one piece of journalism, not a neutral encyclopedia.
3. **Gender history** (C27): reported historical labour practice with the author's ironic framing ("no, really?"); include only with the receipt visible and the irony preserved, or omit from scoring mechanics.
4. **Corrections propagation**: P106 corrects Liu's doctorate to UC Berkeley — any use must reflect the corrected fact. (Demonstrates the engine's corrections requirement.)
5. **Quotes**: all named-person quotes must appear verbatim and attributed, never paraphrased into game copy.
