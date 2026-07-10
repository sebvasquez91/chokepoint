/* =========================================================================
   CHOKEPOINT — content.js
   This file is PURE DATA: the per-article artefact the PressPlay engine
   generates. The runtime (app.js) is the reusable mechanic template.
   Every receipt quote below is verbatim from the source article; paragraph
   refs [Pnnn] map to pipeline/01-article.md.
   ========================================================================= */

const CONTENT = {
  meta: {
    title: "CHOKEPOINT",
    subtitle: "How an island made itself unconquerable",
    minutes: "6",
    article: {
      title: "I Saw the Face of God in a Semiconductor Factory",
      author: "Virginia Heffernan",
      publisher: "WIRED",
      date: "March 2023",
      url: "https://www.wired.com/story/i-saw-the-face-of-god-in-a-tsmc-factory/"
    },
    engine: {
      name: "PressPlay",
      line: "PressPlay demonstrator №1 — an engine that turns journalism into playable experiences.",
      by: "Kita"
    }
  },

  meters: [
    { id: "economy", label: "Economy", icon: "coin" },
    { id: "knowhow", label: "Know-how", icon: "flask" },
    { id: "trust", label: "Trust", icon: "hands" },
    { id: "indisp", label: "Indispensability", icon: "mountain" }
  ],
  start: { economy: 15, knowhow: 5, trust: 10, indisp: 0 },
  shieldWeights: { indisp: 0.45, trust: 0.25, knowhow: 0.20, economy: 0.10 },

  /* ------------------------------------------------------------------ */
  receipts: {
    P004_strait: { ref: "P004", quote: "The threat from across the 110-mile-wide strait to the west of the foundries menaces Taiwan every second of every day. So as not to mention either country by name—or are they one?—Taiwanese newspapers often euphemize Beijing’s bellicosity toward the island as “cross-strait tensions.”" },
    P059_survive: { ref: "P059", quote: "In the postwar period, the country barely survived, but it steadily got into light industry, manufacturing spoons, mugs, and, famously, umbrellas. Taiwan excelled at umbrellas." },
    P059_umbrella: { ref: "P059", quote: "At the height of the boom in the ’70s, three out of every four umbrellas worldwide were made on the island." },
    P060_nixon: { ref: "P060", quote: "Nixon had opened trade with China, and now China was making and exporting the goods Taiwan had once been known for." },
    P060_barbie: { ref: "P060", quote: "For 20 years, Mattel contracted with Taiwan to manufacture Barbie dolls in suburban Taishan, not far from Taipei; the town was devastated when Mattel eventually moved its Barbie business to China, where labor was cheaper." },
    P060_invaluable: { ref: "P060", quote: "The Taiwanese government began to devise a new way to make itself valuable to the US. Invaluable, rather, so it couldn’t be neglected or pushed around." },
    P061_rca: { ref: "P061", quote: "In 1976, RCA began sharing technology with Taiwanese engineers. Texas Instruments, under the direction of Morris Chang, who was then in charge of its global semiconductor business, opened a facility in Zhonghe, a district near Taipei." },
    P061_women: { ref: "P061", quote: "Like all the new semiconductor foundries, including the ones in Silicon Valley, the Taiwanese shops were staffed largely with women. Not only did industrialists consider women easier to mistreat and underpay than men (no, really?), but they believed that women were better at working with small objects because we have small hands." },
    P063_edu: { ref: "P063", quote: "The Taiwanese government began to plow money into engineering education, just at the time that expertise was plainly depleted in China and academics had been persecuted and murdered in the Cultural Revolution." },
    P064_koan: { ref: "P064", quote: "This is how the Taiwanese government came to approach the American company Wang Laboratories in the 1980s with a koan: How do you make a computer?" },
    P065_wang: { ref: "P065", quote: "“Careful attention to education over the last 30 years has begun to pay dividends,” Wang said of Taiwan in 1982. “The output of engineering graduates in relation to the total population is much higher than in the US.”" },
    P066_li: { ref: "P066", quote: "Then, in 1987, K. T. Li, the minister in charge of tech and science, persuaded Chang to start a private manufacturing company that would export chips and generate more money for research." },
    P067_philips: { ref: "P067", quote: "TSMC opened its first fab that year and not long after laid the cornerstone for its headquarters in the same Hsinchu park as UMC and Wang. The Taiwanese government and the Dutch electronics company Philips were the first major investors." },
    P067_asml: { ref: "P067", quote: "Not only was Philips instrumental in starting TSMC, but TSMC’s blood brother in chipmaking is now ASML, the photolithography giant based in Veldhoven." },
    P068_rely: { ref: "P068", quote: "Chips, the ones without ketchup, would eventually take the place of umbrellas and Barbie dolls in Taiwan’s economy. And with its engineers developing the leading-edge chips faster than any place on earth, Taiwan did indeed force the US to rely on it." },
    P070_crux: { ref: "P070", quote: "To be truly essential, a global company must situate itself at a crux in the supply chain." },
    P070_midway: { ref: "P070", quote: "Chang, who has said he studies the Battles of Midway and Stalingrad to devise corporate strategy, cannily installed TSMC between design and product." },
    P070_pureplay: { ref: "P070", quote: "Chang gained trust by allaying fears that TSMC would steal designs, as pure-play foundries have no use of them; TSMC stealing from chip designers would be like a printing press stealing plots from novelists." },
    P070_92: { ref: "P070", quote: "Some tech companies get Super Bowl ads, adoring fanboys, and rockets for their founders; TSMC gets 92 percent." },
    P072_moore: { ref: "P072", quote: "In 1965, Gordon Moore, who would go on to cofound Intel, proposed that the number of transistors in a dense integrated circuit would double roughly every two years. In the early ’60s, four transistors could fit on a thumbnail-sized microchip. Today, on a stupendous chip TSMC makes for the AI company Cerebras, more than 2.6 trillion can." },
    P072_hope: { ref: "P072", quote: "Moore’s Law is, of course, not a law at all. Liu calls it a piece of “shared optimism.” A simple way to put TSMC into ideological perspective is to think of Moore’s Law as hope itself." },
    P073_yield: { ref: "P073", quote: "TI’s factories had wasted as much as half of their meticulously sanded and latticed silicon in making delicate chips. That was insupportable. At TSMC today, the yield rate is a closely guarded number, but analysts estimate that some 80 percent of its latest chips make it to the finish line." },
    P075_patents: { ref: "P075", quote: "The company now holds some 56,000 patents." },
    P080_45nm: { ref: "P080", quote: "“It was still possible using the tried system,” Lin tells me. “But I foresaw that at the next node, which was 45 nanometers, we were going to have trouble.”" },
    P081_euv: { ref: "P081", quote: "People were putting their bets on extreme ultraviolet light, but it would be years before the litho machines in the fabs could muster enough steady source power for that." },
    P081_lens: { ref: "P081", quote: "But because such light couldn’t pierce existing lenses, it would need an exotic new lens made of calcium fluoride. Researchers built hundreds of furnaces in which to grow the right crystal, but no method did the trick. Close to a billion dollars went up in smoke." },
    P082_water: { ref: "P082", quote: "He invented a system for keeping water perfectly homogenous, and then he shot the light through it onto the wafer. Bingo. He could etch transistors as small as 28 nanometers, eventually with zero defects. “Water is a miracle,” Lin says." },
    P085_eureka: { ref: "P085", quote: "With the existing specs, the power source was reliable only at 10 watts; with the new ones, they hoped to hit 250. […] When it hit 90, that’s when he knew. “This was the eureka moment,” Yen says." },
    P086_2nm: { ref: "P086", quote: "Yen became so excited—“too excited,” he says—that he couldn’t even stay to watch the power hit 250. He ran out of the fab, flinging off his bunny suit. […] Today, TSMC’s transistors are down to just over 2 nanometers—the smallest in the world. These unseeable gems go into production in 2025." },
    P002_92: { ref: "P002", quote: "The company also has the world’s biggest logic chip manufacturing capacity and produces, by one analysis, a staggering 92 percent of the world’s most avant-garde chips—the ones inside the nuclear weapons, planes, submarines, and hypersonic missiles on which the international balance of hard power is predicated." },
    P002_big: { ref: "P002", quote: "By revenue, TSMC is the largest semiconductor company in the world. In 2020 it quietly joined the world’s 10 most valuable companies. It’s now bigger than Meta and Exxon." },
    P003_third: { ref: "P003", quote: "TSMC makes a third of all the world’s silicon chips, notably the ones in iPhones and Macs. Every six months, just one of TSMC’s 13 foundries—the redoubtable Fab 18 in Tainan—carves and etches a quintillion transistors for Apple." },
    P044_chips: { ref: "P044", quote: "The CHIPS Act now provides roughly $280 billion to boost American semiconductor research, manufacturing, and security, with the explicit aim of aggressively sidelining China from the sector—and thus from the world economy." },
    P044_deal: { ref: "P044", quote: "The CHIPS and Science Act, which US President Joe Biden signed into law in August 2022, grew out of a $12 billion deal to bring TSMC fabs to American soil." },
    P052_raimondo: { ref: "P052", quote: "“Right now in the United States, we don’t really make any of the world’s most sophisticated, bleeding-edge, cutting-edge chips,” she said. “That’s a national security issue, a national security vulnerability. Today, we say we’re changing that.”" },
    P053_jobs: { ref: "P053", quote: "And while Biden focused on the 10,000 jobs the TSMC fab is bringing to Arizona—the largest foreign investment in the state in history—the biggest news in tech was that Tim Cook was in attendance. Weeks before, Cook had disclosed that Apple was going to start using TSMC’s “American-made chips.”" },
    P053_entente: { ref: "P053", quote: "Liu and Biden were careful not to describe the fab as a move toward semiconductor independence for either country but, rather, as one that locked in their entente." },
    P054_engineered: { ref: "P054", quote: "Known but not spoken at the opening event was that these chips would still be Taiwanese-engineered, their specs brought up to the minute—up to the femtosecond—by TSMC’s research team in Hsinchu." },
    P034_clash: { ref: "P034", quote: "American engineers have called TSMC a “sweatshop,” while TSMC engineers retort that Americans are “babies” who are mentally unequipped to run a state-of-the-art fab." },
    P015_shield: { ref: "P015", quote: "The company, with its near monopoly on the best chips, serves as the umbo of the region’s so-called Silicon Shield, which is perhaps the sturdiest artifact of 20th-century realpolitik. For an imperial power to seize TSMC, the logic goes, would be to slay the world’s goldenest goose." },
    P016_bricked: { ref: "P016", quote: "Anyone in the business understands that, were TSMC chips to vanish from this earth, every new iPad, iPhone, and Mac would be instantly bricked." },
    P016_air: { ref: "P016", quote: "TSMC’s simultaneous invisibility and indispensability to the human race is something that Jensen Huang, the CEO of Nvidia, likes to joke about. “Basically, there is air—and TSMC,” he said at Stanford in 2014." },
    P017_porcupine: { ref: "P017", quote: "“They call Taiwan the porcupine, right? It’s like, just try to attack. You may just blow the whole island up, but it will be useless to you,” Keith Krach, a former US State Department undersecretary, told me a few weeks before I left for Taiwan." },
    P017_liu: { ref: "P017", quote: "TSMC’s chairman and former CEO, Mark Liu, has put it more concretely: “Nobody can control TSMC by force. If you take by military force, or invasion, you will render TSMC inoperative.”" },
    P017_bricked2: { ref: "P017", quote: "The relevant material suppliers, chip designers, software engineers, 5G networks, augmented-reality services, artificial-intelligence operators, and product manufacturers would block their calls. The fabs themselves would be bricked." },
    P019_liu: { ref: "P019", quote: "Mark Liu, the chairman of TSMC, dislikes referring to the company as the Sacred Mountain of Protection. “We represent a collaboration of the globalization era,” he says. “That label makes us a sore thumb.”" },
    P043_race: { ref: "P043", quote: "They’re either building fabs and improving technology to keep up with TSMC, as China is hell-bent on doing, or deepening an alliance with TSMC and Taiwan, which often speak as one. That’s what the US is doing." },
    P043_ambiguous: { ref: "P043", quote: "Although the special relationship between the US and Taiwan is still an ambiguous affair, it may now compete in consequence with the 20th-century alliance between the US and the UK." },
    P049_china: { ref: "P049", quote: "About 15 percent of the world’s chip supply still originates in China, and the Communist Party’s new chip czar commands a trillion-dollar budget to expand the business over the next decade." },
    P013_savary: { ref: "P013", quote: "“It’s not God’s will that all human necessities be found in the same place,” Savary wrote. “Divine Providence has dispersed its gifts so that humans will trade together and find that their mutual need to help each other establishes ties of friendship among them.”" },
    P014_gifts: { ref: "P014", quote: "Companies like Sumco, in Japan, process polycrystalline silicon sand, which is quarried for the world’s semiconductor companies in places like Brazil, France, and the Appalachian Mountains in the US, to grow hot single-crystal silicon ingots." },
    P014_wafers: { ref: "P014", quote: "With diamond wire saws, Sumco’s machines slice shimmering wafers that, polished so smooth they feel like nothing under a fingertip, are the flattest objects in the world." },
    P014_customers: { ref: "P014", quote: "The firm is merrily known as “pure play,” meaning all it does is produce bespoke chips for customer companies. These include fabless semiconductor firms like Marvell, AMD, MediaTek, and Broadcom, and fabless consumer-electronics firms like Apple and Nvidia." },
    P077_asml: { ref: "P077", quote: "Photolithography machines are the specialty of TSMC’s partner firms, and above all ASML. It’s rumored that the next generation of these machines will cost around $400 million. Every one of the world’s most sophisticated chips uses ASML lithography." },
    P026_curiosity: { ref: "P026", quote: "Two qualities, Mark Liu tells me, set the TSMC scientists apart: curiosity and stamina." },
    P033_tech: { ref: "P033", quote: "For now, 20,000 technicians, the rank and file at TSMC who make up one-third of the workforce, monitor every step of the atomic construction cycle." },
    P094_dust: { ref: "P094", quote: "Ordinary air can have up to 1 million particles of dust per cubic meter. The fabs and cleaning rooms have no more than 100." },
    P104_silicon: { ref: "P104", quote: "Silicon is one of the few supremely un-rare objects of desire. It’s the second most abundant element in the Earth’s crust, after oxygen." },
    P103_liu: { ref: "P103", quote: "“I hope the bad guys will get their penalty,” Liu said, when I asked about his hopes for the future. It was the first edgy thing I’d heard the TSMC chairman say. “And I hope the righteous”—he broke off—“human collaboration will continue.”" },
    P098_time: { ref: "P098", quote: "A saying at TSMC is that time flies in the fabs. It’s true. We’re inside for an hour, but it feels like 20 minutes." }
  },

  /* ------------------------------------------------------------------ */
  intro: {
    kicker: "A playable long-read",
    lede: "1950. Taiwan is poor, unrecognised, and 110 miles from a neighbour that claims it. Within one lifetime it will make the one thing the modern world cannot live without — and bet its survival on being impossible to replace.",
    task: "You are Taiwan’s strategy. Six decisions across six eras. Build the Silicon Shield.",
    receiptNote: "Every rule in this game comes from the article — tap the ¶ chips to see the exact sentences.",
    receipts: ["P004_strait"]
  },

  eras: [
    {
      id: "era1", year: "1950s–60s", title: "Survival", icon: "umbrella",
      brief: "The postwar decades. The country barely survives. Little capital, few allies you can count on, no seat at most tables. What you do have: hands, discipline, and ports. Choose your first economy.",
      briefReceipts: ["P059_survive"],
      prompt: "What does Taiwan make?",
      options: [
        {
          id: "light", historical: true, label: "Light industry",
          blurb: "Spoons, mugs, umbrellas — small things, made well, sold abroad.",
          deltas: { economy: 25, knowhow: 5, trust: 0, indisp: 0 },
          outcome: {
            headline: "The umbrella island",
            body: "By the height of the boom, three of every four umbrellas on Earth are made here. It’s a living — a good one. It is not leverage: anything you can make cheaply, someone cheaper can eventually take.",
            receipts: ["P059_survive", "P059_umbrella"]
          }
        },
        {
          id: "heavy", historical: false, label: "Heavy industry",
          blurb: "Steel, ships, petrochemicals — the prestige route.",
          deltas: { economy: 6, knowhow: 4, trust: 0, indisp: 0 },
          outcome: {
            headline: "Mills without money",
            body: "Blast furnaces demand capital a barely-surviving country doesn’t have, and buyers it can’t yet reach. Growth comes — slowly, and heavily mortgaged.",
            modelled: true,
            rail: "History’s Taiwan started lighter: spoons, mugs and — famously — umbrellas.",
            railReceipts: ["P059_survive"]
          }
        },
        {
          id: "agri", historical: false, label: "Stay agrarian",
          blurb: "Feed the island first. Rice, sugar, tea.",
          deltas: { economy: 8, knowhow: 0, trust: 0, indisp: 0 },
          outcome: {
            headline: "Stable, small, invisible",
            body: "Nobody starves; nobody notices. Export ladders start in workshops, not fields — and you haven’t stepped on one.",
            modelled: true,
            rail: "History’s Taiwan climbed into light industry — and came to make three of every four umbrellas on Earth.",
            railReceipts: ["P059_umbrella"]
          }
        }
      ]
    },
    {
      id: "era2", year: "1970s", title: "Abandonment", icon: "ship",
      brief: "Nixon opens China, and Washington’s attention drifts across the strait — followed by your customers. Mattel moves Barbie production out of Taishan: labour is cheaper on the mainland. The goods that fed you are leaving, and the diplomacy that protected you is fraying.",
      briefReceipts: ["P060_nixon", "P060_barbie"],
      prompt: "What is your answer?",
      options: [
        {
          id: "price", historical: false, label: "Compete on price",
          blurb: "Cut wages, keep the orders. Out-cheap the mainland.",
          deltas: { economy: -5, knowhow: 0, trust: 0, indisp: 0 },
          outcome: {
            headline: "A race to the bottom of the strait",
            body: "You can always pay people less — and so can a country with twenty times your workforce. The article is blunt about why Barbie left: labour was cheaper there. You cannot win this game; you can only get poorer playing it.",
            modelled: true,
            rail: "History’s Taiwan refused the race and changed the game instead: become invaluable.",
            railReceipts: ["P060_invaluable"]
          }
        },
        {
          id: "invaluable", historical: true, label: "Become invaluable",
          blurb: "Find something the US cannot function without. Then be the only one who does it.",
          deltas: { economy: 0, knowhow: 0, trust: 5, indisp: 18 },
          outcome: {
            headline: "The strategy",
            body: "Not valuable — invaluable. If the world’s most powerful country cannot run without you, it cannot neglect you either. You don’t yet know what the indispensable thing will be. You know it must be hard, and it must be yours.",
            receipts: ["P060_invaluable"]
          }
        },
        {
          id: "patrons", historical: false, label: "Court new patrons",
          blurb: "Hedge Washington. Cultivate Tokyo, Europe, anyone who’ll trade.",
          deltas: { economy: 3, knowhow: 0, trust: 5, indisp: 0 },
          outcome: {
            headline: "Many friends, no anchor",
            body: "Friends are good. But in the article’s telling, one relationship anchored the island’s survival — and drift is what you were trying to escape.",
            modelled: true,
            rail: "History’s Taiwan bet on making itself impossible for Washington to neglect.",
            railReceipts: ["P060_invaluable"]
          }
        }
      ]
    },
    {
      id: "era3", year: "1976–85", title: "The Apprenticeship", icon: "cap",
      brief: "Leverage needs a craft. American chipmakers want careful hands: RCA offers technology-sharing; Texas Instruments — its semiconductor business run by a Chinese-born engineer named Morris Chang — opens a plant near Taipei. Across the strait, the Cultural Revolution is destroying a generation of expertise. A once-in-history opening.",
      briefReceipts: ["P061_rca", "P063_edu"],
      prompt: "How do you build the capability?",
      options: [
        {
          id: "educate", historical: true, label: "Educate & absorb",
          blurb: "Pour money into engineering schools. Say yes to every apprenticeship. Ask Wang Labs the koan: how do you make a computer?",
          deltas: { economy: 5, knowhow: 30, trust: 5, indisp: 5 },
          outcome: {
            headline: "The long game",
            body: "You fund the schools and take the tech-sharing deals. By 1982, An Wang is telling the world that your engineering-graduate output, per person, beats America’s. Nobody much notices. That’s fine — umbrellas taught you patience.",
            receipts: ["P063_edu", "P064_koan", "P065_wang"],
            meanwhile: {
              text: "Meanwhile, on the line: the first fabs are staffed largely by women — industrialists claimed small hands and paid small wages. When the jobs turned prestigious, men took them.",
              receipts: ["P061_women"]
            }
          }
        },
        {
          id: "buy", historical: false, label: "Buy the technology",
          blurb: "Licences and turnkey factories. Skip the decade of schooling.",
          deltas: { economy: 5, knowhow: 8, trust: 0, indisp: 0 },
          outcome: {
            headline: "Machines arrive; understanding doesn’t",
            body: "You can operate what you cannot yet improve — and the sellers know exactly what that’s worth. Every upgrade is a new invoice.",
            modelled: true,
            rail: "History’s Taiwan ploughed money into engineering education while rivals persecuted their engineers.",
            railReceipts: ["P063_edu"]
          }
        },
        {
          id: "alone", historical: false, label: "Indigenous everything",
          blurb: "No foreign tech, no dependence. Build it all here.",
          deltas: { economy: 0, knowhow: 5, trust: 0, indisp: 0 },
          outcome: {
            headline: "Pride is not a process node",
            body: "The article’s oldest source insists no one place holds all the gifts. Refusing the world’s help doesn’t make you sovereign; it makes you slow.",
            modelled: true,
            rail: "History’s Taiwan absorbed RCA’s and TI’s know-how — and out-taught everyone.",
            railReceipts: ["P061_rca", "P013_savary"]
          }
        }
      ]
    },
    {
      id: "era4", year: "1987", title: "The Founding Bet", icon: "press",
      brief: "Minister K. T. Li sits across from Morris Chang — MIT- and Stanford-trained, passed over in Dallas, ready to build something of his own — and persuades him to start a chip company. Your government and the Dutch giant Philips put up the first money. One question decides everything: whose chips will it make?",
      briefReceipts: ["P066_li", "P067_philips"],
      prompt: "What company do you found?",
      options: [
        {
          id: "champion", historical: false, label: "National champion",
          blurb: "Design and sell chips under your own brand. Keep the glory.",
          deltas: { economy: 10, knowhow: 5, trust: -10, indisp: 5 },
          outcome: {
            headline: "The trust ceiling",
            body: "Your own brand, your own designs — and every potential customer is now a competitor who’d be mad to hand you their blueprints. You built the ceiling yourself, and it’s low.",
            modelled: true,
            rail: "History’s bet inverted this: a foundry that could never compete with its customers.",
            railReceipts: ["P070_pureplay"]
          }
        },
        {
          id: "pureplay", historical: true, label: "Pure play",
          blurb: "Make only other people’s chips. Never sell a design of your own.",
          deltas: { economy: 5, knowhow: 5, trust: 30, indisp: 25 },
          outcome: {
            headline: "The printing press",
            body: "TSMC will manufacture other companies’ chips and never — ever — compete with them. A printing press doesn’t steal plots from novelists, so the novelists all come to you. Trust becomes the product; the crux of the supply chain becomes your address. Chang, for the record, studies Midway and Stalingrad for strategy.",
            receipts: ["P070_pureplay", "P070_crux", "P070_midway"]
          }
        },
        {
          id: "downstream", historical: false, label: "Stay downstream",
          blurb: "Assembly and packaging. Safe, steady, someone else’s risk.",
          deltas: { economy: 5, knowhow: 0, trust: 5, indisp: 2 },
          outcome: {
            headline: "Umbrellas, with cleaner rooms",
            body: "Honest work that ten other coastlines can do. You’ve rebuilt the replaceable business at higher precision — and replaceable was the thing you swore off in 1970.",
            modelled: true,
            rail: "History installed itself at the crux instead: between design and product.",
            railReceipts: ["P070_crux"]
          }
        }
      ]
    },
    {
      id: "era5", year: "~2000", title: "The Treadmill", icon: "drop",
      brief: "In 1965 Gordon Moore proposed that transistor counts double every two years — not a law, the chairman says, but “shared optimism.” Around 2000 the optimism stalls: 65 nanometres works with the tried system, but at 45 “we were going to have trouble”, and the light itself is running out. A billion-dollar question.",
      briefReceipts: ["P072_moore", "P072_hope", "P080_45nm"],
      prompt: "Where do you place the R&D bet?",
      options: [
        {
          id: "lens", historical: false, reported: true, label: "The exotic lens",
          blurb: "A calcium-fluoride lens for a new wavelength. The industry’s fashionable bet.",
          deltas: { economy: -10, knowhow: -5, trust: 0, indisp: 0 },
          outcome: {
            headline: "Up in smoke",
            body: "Hundreds of furnaces try to grow the perfect crystal. No method works. Close to a billion dollars burns. This isn’t a simulation — the article reports this dead end exactly as it happened to the industry.",
            reported: true,
            receipts: ["P081_lens"],
            rail: "The way through, it turned out, was water.",
            railReceipts: ["P082_water"]
          }
        },
        {
          id: "euv", historical: false, label: "Wait for EUV",
          blurb: "Extreme ultraviolet is the future. Sit tight until the machines can hold it.",
          deltas: { economy: 0, knowhow: 5, trust: 0, indisp: -5 },
          outcome: {
            headline: "The future isn’t now",
            body: "EUV is real — and the source power is reliable at ten watts, a fraction of what production needs. Years pass. Moore’s clock doesn’t.",
            modelled: true,
            receipts: ["P081_euv"],
            rail: "History found a bridge first: light through water, down to 28 nanometres.",
            railReceipts: ["P082_water"]
          }
        },
        {
          id: "water", historical: true, label: "Shoot light through water",
          blurb: "Burn-Jeng Lin’s heresy: forget new lenses — use the refraction you can trust.",
          deltas: { economy: 0, knowhow: 30, trust: 0, indisp: 25 },
          outcome: {
            headline: "“Water is a miracle”",
            body: "Keep the water perfectly homogenous, shoot the existing light through it, and — bingo — 28 nanometres, eventually with zero defects. The treadmill turns. Then, one October night in 2014, a new power source jumps from ten reliable watts to ninety on its way to 250, and Anthony Yen runs from the fab flinging off his bunny suit: extreme ultraviolet works too. Today the transistors are just over two nanometres — the smallest in the world.",
            receipts: ["P080_45nm", "P082_water", "P085_eureka", "P086_2nm"],
            meanwhile: {
              text: "The house that R&D built: some 56,000 patents, and a workforce prized for two qualities — curiosity and stamina.",
              receipts: ["P075_patents", "P026_curiosity"]
            }
          }
        }
      ]
    },
    {
      id: "era6", year: "2020s", title: "The Shield & the Invitation", icon: "shield",
      brief: "In the world the article reports, the island now makes 92 per cent of the most advanced chips and a third of all of them; one fab alone etches a quintillion transistors for Apple every six months. Washington has noticed what that means about Washington. The $280-billion CHIPS Act — grown from a $12-billion deal to bring your fabs to American soil — arrives with an invitation: build in Arizona.",
      briefReceipts: ["P002_92", "P003_third", "P044_deal", "P044_chips"],
      prompt: "The superpower asks. You answer:",
      options: [
        {
          id: "refuse", historical: false, label: "Refuse",
          blurb: "The shield is concentration. Every advanced wafer stays home.",
          deltas: { economy: 0, knowhow: 0, trust: -5, indisp: 5 },
          outcome: {
            headline: "Home alone",
            body: "Concentration preserved — and an ally’s ask declined. The article doesn’t report this path. It does report how urgently Washington wanted those fabs: “a national security vulnerability… we’re changing that.”",
            modelled: true,
            receipts: ["P052_raimondo"],
            rail: "History said yes — carefully.",
            railReceipts: ["P053_entente"]
          }
        },
        {
          id: "arizona", historical: true, label: "Build in Arizona",
          blurb: "A subsidiary fab in Phoenix. The leading edge — and the R&D — stay home.",
          deltas: { economy: 15, knowhow: 0, trust: 20, indisp: 12 },
          outcome: {
            headline: "The entente, in concrete",
            body: "Ten thousand jobs; the largest foreign investment in Arizona’s history; Tim Cook in the audience for “American-made chips” — which will still be Taiwanese-engineered, their specs tuned from Hsinchu to the femtosecond. Everyone on stage chooses words carefully: this is not chip independence; it locks the entente in. (Off stage, your engineers call the trainees “babies”; theirs call your fabs a “sweatshop.” Alliances take work.)",
            receipts: ["P053_jobs", "P054_engineered", "P053_entente", "P034_clash"]
          }
        },
        {
          id: "license", historical: false, label: "License the crown jewels",
          blurb: "Sell the process to every ally. Make the free world self-sufficient.",
          deltas: { economy: 5, knowhow: 0, trust: 5, indisp: -20 },
          outcome: {
            headline: "Generosity dissolves leverage",
            body: "If everyone can make the best chips, nobody needs your island in particular. The strategy that began in 1970 — invaluable, so you can’t be pushed around — runs here in reverse.",
            modelled: true,
            rail: "History kept the crux at home and exported an outpost.",
            railReceipts: ["P054_engineered"]
          }
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------ */
  epilogue: {
    gaugeTitle: "The Silicon Shield",
    gaugeNote: "Shield strength weighs what the article says matters most: how badly the world needs you (45%), whether it trusts you (25%), what you uniquely know (20%), and what you earn (10%).",
    verdicts: [
      {
        min: 74, title: "The Porcupine",
        body: "“Just try to attack… it will be useless to you.” You built what the article describes: protection made of everyone else’s need. Seizing the island would switch its treasure off.",
        receipts: ["P017_porcupine", "P017_liu", "P015_shield"]
      },
      {
        min: 54, title: "The Golden Goose",
        body: "Seizing you would slay the world’s goldenest goose — but geese get eyed. Indispensable on your best days; merely valuable on the rest.",
        receipts: ["P015_shield"]
      },
      {
        min: 34, title: "Valued, not vital",
        body: "The world likes you. The world could also live without you — and, on the article’s logic, both of you know what that means when pressure comes.",
        receipts: ["P060_invaluable"]
      },
      {
        min: 0, title: "Neglected and pushed around",
        body: "“…so it couldn’t be neglected or pushed around.” That was the whole assignment. This run, it didn’t happen — the island stayed replaceable.",
        receipts: ["P060_invaluable"]
      }
    ],
    map: {
      title: "Break the chain",
      note: "This is the machine you were playing inside — the article’s “dispersed gifts.” Tap any link to sever it and see what the article says happens.",
      nodes: [
        {
          id: "sand", label: "Sand", sub: "Brazil · France · Appalachia",
          severed: { text: "Silicon is the second most abundant element in the Earth’s crust — the sand is everywhere; the skill isn’t. The chain re-routes, slowly. The gifts are dispersed on purpose.", receipts: ["P104_silicon", "P014_gifts"] }
        },
        {
          id: "wafers", label: "Wafers", sub: "Sumco · Japan",
          severed: { text: "Companies like Japan’s Sumco grow the single-crystal ingots and slice the flattest objects in the world. Few kitchens cook this dish; lose them and the fabs starve.", receipts: ["P014_gifts", "P014_wafers"] }
        },
        {
          id: "machines", label: "Machines", sub: "ASML · Veldhoven, NL",
          severed: { text: "“Every one of the world’s most sophisticated chips uses ASML lithography.” No Veldhoven, no leading edge — at any price near $400 million a machine.", receipts: ["P077_asml", "P067_asml"] }
        },
        {
          id: "fabs", label: "Fabs", sub: "TSMC · Hsinchu & Tainan",
          severed: { text: "“Were TSMC chips to vanish from this earth, every new iPad, iPhone, and Mac would be instantly bricked.” And taken by force? “You will render TSMC inoperative” — the partners hang up, and the fabs themselves are bricked.", receipts: ["P016_bricked", "P017_liu", "P017_bricked2"] }
        },
        {
          id: "designs", label: "Designs", sub: "Apple · Nvidia · fabless",
          severed: { text: "Pure play needs someone to print for: Marvell, AMD, MediaTek, Broadcom, Apple, Nvidia. No designers, no orders, no crux — the trust runs both ways.", receipts: ["P014_customers", "P070_pureplay"] }
        },
        {
          id: "world", label: "Your pocket", sub: "everywhere",
          severed: { text: "Demand is the one link nobody severs on purpose. “Basically, there is air — and TSMC.”", receipts: ["P016_air", "P003_third"] }
        }
      ],
      edges: [["sand", "wafers"], ["wafers", "fabs"], ["machines", "fabs"], ["designs", "fabs"], ["fabs", "world"]],
      thesis: {
        text: "“Divine Providence has dispersed its gifts so that humans will trade together and find that their mutual need to help each other establishes ties of friendship among them.” — the article’s oldest source, from 1675. No one place holds the whole chain. That interdependence IS the shield: seize any link, and the others switch off.",
        receipts: ["P013_savary", "P017_bricked2"]
      }
    },
    doubt: {
      title: "What the article won’t let you forget",
      body: "TSMC’s own chairman dislikes the “Sacred Mountain of Protection” label — “We represent a collaboration of the globalization era.” The shield is “perhaps the sturdiest artifact of 20th-century realpolitik”, the US–Taiwan relationship “still an ambiguous affair”, and the race isn’t over: about 15 per cent of chips still come from China, whose chip czar commands a trillion-dollar budget. The article ends on hope, not certainty: “I hope the righteous human collaboration will continue.”",
      receipts: ["P019_liu", "P015_shield", "P043_ambiguous", "P049_china", "P103_liu"]
    },
    timeFlies: { pre: "A saying at TSMC is that time flies in the fabs.", receipts: ["P098_time"] }
  },

  /* ------------------------------------------------------------------ */
  about: {
    what: "CHOKEPOINT is a research demonstrator by Kita: demonstrator №1 of PressPlay, an engine that turns journalism into playable interactive experiences. This experience was generated from a single piece of journalism through a documented transformation pipeline — analysis, format selection, constrained generation, provenance — with a human editor in the loop.",
    source: "Source and full credit: “I Saw the Face of God in a Semiconductor Factory” by Virginia Heffernan, WIRED, March 2023. This demonstrator is unofficial and unaffiliated with WIRED or the author; it renders that article’s reporting and viewpoint, and it exists to send you to the original.",
    integrity: [
      "Receipts (¶ chips): every factual rule, number and quote in the game traces to a specific paragraph of the article; tap to read the exact sentence, verbatim.",
      "Modelled outcomes: choices history didn’t take can’t have reported consequences. Their outcomes are extrapolated from the article’s own stated logic and are always marked with an amber MODELLED badge.",
      "Perspective: this is one article’s account — a first-person, pro-democracy long-read — not an encyclopedia. The game inherits its viewpoint deliberately and says so.",
      "Corrections: the game uses the article’s published correction (the chairman’s doctorate: UC Berkeley, not MIT). In the full engine, source corrections propagate into published experiences automatically."
    ],
    kita: "Kita builds AI systems that turn structured information into engaging interactive experiences with human editorial control. PressPlay extends that capability to news media: giving every newsroom a games desk.",
    engineViewCta: "See how this was made — the full pipeline, stage by stage"
  }
};
