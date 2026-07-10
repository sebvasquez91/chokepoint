/* =========================================================================
   CHOKEPOINT RPG — rpg-story.js
   Narrative data: cast, receipts (verbatim, verified against the numbered
   article text), insights, quests, dialogue trees, cutscenes.
   Integrity rules: lines marked v:true are verbatim from the article and
   carry receipts; all other lines are paraphrase/connective tissue asserting
   only what the article reports. See pipeline/08-narrative-design.md §7.
   ========================================================================= */

window.RPG_STORY = (function () {
  "use strict";

  const article = {
    title: "I Saw the Face of God in a Semiconductor Factory",
    author: "Virginia Heffernan", publisher: "WIRED", date: "March 2023",
    url: "https://www.wired.com/story/i-saw-the-face-of-god-in-a-tsmc-factory/"
  };

  /* ---------------- cast ---------------- */
  const cast = {
    you:      { name: "You", look: "you_arrive" },
    inner:    { name: "You (notebook)", look: null },
    kramer:   { name: "Michael Kramer — TSMC PR", look: "kramer" },
    liu:      { name: "Mark Liu — Chairman, TSMC", look: "liu" },
    chan:     { name: "Victor Chan — historian", look: "chan" },
    lin:      { name: "Burn-Jeng Lin", look: "lin" },
    yen:      { name: "Anthony Yen", look: "yen" },
    krach:    { name: "Keith Krach (phone)", look: "krach" },
    clerk:    { name: "Clerk", look: "clerk_711" },
    mallclerk:{ name: "Shop clerk", look: "clerk_mall" },
    airclerk: { name: "Baggage services", look: "clerk_air" },
    doorman:  { name: "Doorman", look: "doorman" },
    foreman:  { name: "Line foreman (memory)", look: "worker_m" },
    worker:   { name: "Worker (memory)", look: "worker_f" },
    wang:     { name: "An Wang (memory)", look: "wang" },
    li:       { name: "K. T. Li (memory)", look: "li" },
    chang:    { name: "A silhouette (memory)", look: "chang_sil" },
    orderly:  { name: "Orderly", look: "orderly" },
    tv:       { name: "TV — news channel", look: null },
    podcast:  { name: "Podcast — The Ezra Klein Show", look: null },
    sign:     { name: "", look: null }
  };

  /* ---------------- receipts (verbatim; ¶ refs → pipeline/01-article) -- */
  const receipts = {
    P001_pilgrim: { ref: "P001", quote: "This is my pilgrimage to the Sacred Mountain of Protection. The Sacred Mountain is reckoned to protect the whole island of Taiwan—and even, by the supremely pious, to protect democracy itself, the sprawling experiment in governance that has held moral and actual sway over the would-be free world for the better part of a century." },
    P002_92: { ref: "P002", quote: "The company also has the world’s biggest logic chip manufacturing capacity and produces, by one analysis, a staggering 92 percent of the world’s most avant-garde chips—the ones inside the nuclear weapons, planes, submarines, and hypersonic missiles on which the international balance of hard power is predicated." },
    P003_third: { ref: "P003", quote: "TSMC makes a third of all the world’s silicon chips, notably the ones in iPhones and Macs. Every six months, just one of TSMC’s 13 foundries—the redoubtable Fab 18 in Tainan—carves and etches a quintillion transistors for Apple." },
    P004_strait: { ref: "P004", quote: "The threat from across the 110-mile-wide strait to the west of the foundries menaces Taiwan every second of every day. So as not to mention either country by name—or are they one?—Taiwanese newspapers often euphemize Beijing’s bellicosity toward the island as “cross-strait tensions.”" },
    P004_asteroid: { ref: "P004", quote: "The longer the threat is unnamed, the more it comes to seem like an asteroid, irrational and insensate. And, like an asteroid, it could hit anytime and destroy everything." },
    P008_flight: { ref: "P008", quote: "The flight from Kennedy Airport to Taipei nearly laid me to waste—just under 18 hallucinatory hours at the back of a packed 777." },
    P009_ukraine: { ref: "P009", quote: "As passengers learned only upon landing in Taipei, the plane took off without a single economy-class bag. We got two words at baggage claim: “Ukraine war.”" },
    P009_samsonite: { ref: "P009", quote: "My Samsonite wheelie, which contained Chris Miller’s Chip War and Albert O. Hirschman’s The Passions and the Interests —the book that got me thinking about the etymology of “commodities”—was back in New York." },
    P010_tsao: { ref: "P010", quote: "Last year, the microchip titan Robert Tsao, who founded United Microelectronics Corporation, the first semiconductor company in Taiwan and TSMC’s longtime rival, pledged nearly $100 million for national defense, an investment that provides for the training of 3 million Taiwanese civilians to confront Chinese invaders in the manner of the Ukrainian patriots." },
    P011_foil: { ref: "P011", quote: "TSMC, which plays everything cool, seems to view Tsao as a kind of foil. Tsao is a show-off." },
    P011_tv: { ref: "P011", quote: "In 2022 he issued a call to arms while wearing rococo tactical gear. He declined to speak to me for this piece unless I could promise television time. I could not." },
    P013_savary: { ref: "P013", quote: "“It’s not God’s will that all human necessities be found in the same place,” Savary wrote. “Divine Providence has dispersed its gifts so that humans will trade together and find that their mutual need to help each other establishes ties of friendship among them.”" },
    P014_gifts: { ref: "P014", quote: "Companies like Sumco, in Japan, process polycrystalline silicon sand, which is quarried for the world’s semiconductor companies in places like Brazil, France, and the Appalachian Mountains in the US, to grow hot single-crystal silicon ingots." },
    P015_shield: { ref: "P015", quote: "The company, with its near monopoly on the best chips, serves as the umbo of the region’s so-called Silicon Shield, which is perhaps the sturdiest artifact of 20th-century realpolitik. For an imperial power to seize TSMC, the logic goes, would be to slay the world’s goldenest goose." },
    P016_air: { ref: "P016", quote: "TSMC’s simultaneous invisibility and indispensability to the human race is something that Jensen Huang, the CEO of Nvidia, likes to joke about. “Basically, there is air—and TSMC,” he said at Stanford in 2014." },
    P016_bricked: { ref: "P016", quote: "Anyone in the business understands that, were TSMC chips to vanish from this earth, every new iPad, iPhone, and Mac would be instantly bricked." },
    P017_porcupine: { ref: "P017", quote: "“They call Taiwan the porcupine, right? It’s like, just try to attack. You may just blow the whole island up, but it will be useless to you,” Keith Krach, a former US State Department undersecretary, told me a few weeks before I left for Taiwan." },
    P017_liu: { ref: "P017", quote: "TSMC’s chairman and former CEO, Mark Liu, has put it more concretely: “Nobody can control TSMC by force. If you take by military force, or invasion, you will render TSMC inoperative.”" },
    P017_bricked2: { ref: "P017", quote: "The relevant material suppliers, chip designers, software engineers, 5G networks, augmented-reality services, artificial-intelligence operators, and product manufacturers would block their calls. The fabs themselves would be bricked." },
    P018_wired: { ref: "P018", quote: "No WIRED journalist has breached the chip world’s sanctum sanctorum and toured a TSMC fab. This is why I want to go inside." },
    P019_liu: { ref: "P019", quote: "Mark Liu, the chairman of TSMC, dislikes referring to the company as the Sacred Mountain of Protection. “We represent a collaboration of the globalization era,” he says. “That label makes us a sore thumb.”" },
    P020_mall: { ref: "P020", quote: "Still struggling to contact the airline about my Samsonite, I buy a toothbrush and some shapeless navy-blue separates in a third-story mini mall open after hours." },
    P020_chabuduo: { ref: "P020", quote: "I also learn a meme made famous in the 1920s by the Chinese philosopher Hu Shih: chabuduo. The word means something like whatever. Or close enough." },
    P021_style: { ref: "P021", quote: "But TSMC style, to my delight, is like mine today: cotton, normcore, a shrug. Three stars on Yelp." },
    P022_charlotte: { ref: "P022", quote: "The place is glassy and forgettable, with a few half-hearted pops of color, mostly red. It’s like a ’90s convention center in a small American city, perhaps Charlotte, North Carolina." },
    P022_discretion: { ref: "P022", quote: "But at TSMC, discretion is not just the better part of valor; it’s the business model. The company is recessive in every way." },
    P023_salary: { ref: "P023", quote: "A starting salary for an engineer is the equivalent of some $5,400 per month, where rent for a Hsinchu one-bedroom is about $450." },
    P023_bk: { ref: "P023", quote: "Kramer tells me that employees get a 10 percent discount at Burger King. Ten percent. Perhaps people come to work at TSMC just to work at TSMC." },
    P024_fairy: { ref: "P024", quote: "It was like a fairy tale; he had to refuse me three times and I had to persist, proving my sincerity like a knight or a daughter of King Lear." },
    P024_zeal: { ref: "P024", quote: "My interest in the fabs borders on zealotry. TSMC and the principles it expresses have started to appear in my dreams as the last best hope for—well, possibly human civilization." },
    P026_curiosity: { ref: "P026", quote: "Two qualities, Mark Liu tells me, set the TSMC scientists apart: curiosity and stamina. Religion, to my surprise, is also common. “Every scientist must believe in God,” Liu says." },
    P027_lego: { ref: "P027", quote: "To our interview Liu has brought a model of his own: a Lego model of TSMC’s showstopping fin field-effect transistor, which controls the flow of current in a semiconductor using an electric field, a narrow fin, a system of gates, and very little voltage." },
    P027_atomic: { ref: "P027", quote: "“We are doing atomic constructions,” Liu tells me. “I tell my engineers, ‘Think like an atomic-sized person.’”" },
    P027_proverbs: { ref: "P027", quote: "He also cites a passage from Proverbs, the one sometimes used to ennoble mining: “It’s the glory of God to conceal matter. But to search out the matter is the glory of men.”" },
    P028_reveal: { ref: "P028", quote: "“There's no way out,” Liu tells me. “You always feel you are scratching the surface. Until, one day, it’s revealed to you.”" },
    P028_berkeley: { ref: "P028", quote: "Liu’s doctoral research at UC Berkeley in the 1970s was on the serendipitous ways that ions behave when shot into silicon; he means it’s atoms that God has secreted away." },
    P031_process: { ref: "P031", quote: "First comes the silicon wafer. A projector, its lens covered by a crystal plate inscribed with distinctive patterns, is craned over the wafer. Extreme ultraviolet light is then beamed through the plate and onto the wafer, printing a design on it before it’s bathed in chemicals to etch along the pattern." },
    P033_lightsout: { ref: "P033", quote: "Though Liu is enthusiastic about the imminence of fabs run entirely by software, there is no “lights-out” fab yet, no fab that functions without human eyes and their dependence on light in the visible range." },
    P033_tech: { ref: "P033", quote: "For now, 20,000 technicians, the rank and file at TSMC who make up one-third of the workforce, monitor every step of the atomic construction cycle." },
    P033_moon: { ref: "P033", quote: "Liu tells me that spotting nano-defects on a chip is like spotting a half-dollar on the moon from your backyard." },
    P034_clash: { ref: "P034", quote: "American engineers have called TSMC a “sweatshop,” while TSMC engineers retort that Americans are “babies” who are mentally unequipped to run a state-of-the-art fab." },
    P035_dedicated: { ref: "P035", quote: "At a think-tank forum in Taipei in 2021, Chang shrugged off competition from Intel, declaring, \"No one in the United States is as dedicated to their work as in Taiwan.\"" },
    P036_coffee: { ref: "P036", quote: "Black coffee at 7-Eleven is perfectly potable, especially when Kramer treats me to a cup. He gets the company discount there too." },
    P036_hang: { ref: "P036", quote: "Kramer is a good hang. I like that he teases me about my fascination with TSMC; I get the sense that he’s used to brooking destabilizing questions about cross-strait tensions and maybe fewer about the sacredness of the fabs." },
    P038_tooze: { ref: "P038", quote: "“If you think about conflicts around Taiwan,” Tooze told Klein, “the global semiconductor industry isn’t just the supply chain. It’s one of humanity’s great technological scientific achievements. Our ability to do this stuff at nanoscale is us up against the face of God, in a sense.”" },
    P040_kramer: { ref: "P040", quote: "Kramer tells me he’s the son of a Lutheran missionary from the US and a Taiwanese teacher. He went to a Christian school in South Taiwan, and later Taipei American School." },
    P041_nature: { ref: "P041", quote: "When, later, I recite Tooze’s words about God’s face to Mark Liu, he quietly agrees, but refines the point. “God means nature. We are describing the face of nature at TSMC.”" },
    P043_race: { ref: "P043", quote: "They’re either building fabs and improving technology to keep up with TSMC, as China is hell-bent on doing, or deepening an alliance with TSMC and Taiwan, which often speak as one. That’s what the US is doing." },
    P043_ambiguous: { ref: "P043", quote: "Although the special relationship between the US and Taiwan is still an ambiguous affair, it may now compete in consequence with the 20th-century alliance between the US and the UK." },
    P044_chips: { ref: "P044", quote: "The CHIPS Act now provides roughly $280 billion to boost American semiconductor research, manufacturing, and security, with the explicit aim of aggressively sidelining China from the sector—and thus from the world economy." },
    P044_deal: { ref: "P044", quote: "The CHIPS and Science Act, which US President Joe Biden signed into law in August 2022, grew out of a $12 billion deal to bring TSMC fabs to American soil." },
    P044_xi: { ref: "P044", quote: "“Xi is absolutely obsessed with the semiconductor business,” Krach tells me." },
    P045_krach: { ref: "P045", quote: "As a teenager, he trained as a welder, and—though he was the youngest-ever vice president at General Motors, served as CEO of DocuSign, and cofounded the software company Ariba—he still comes across as disarmingly wholesome." },
    P046_trust: { ref: "P046", quote: "“Trust in technology is everything,” Krach says." },
    P048_5g: { ref: "P048", quote: "During the height of the pandemic, he and a small, masked delegation zipped around the world to more than 30 countries, from Spain to the Dominican Republic to Cyprus to the United Arab Emirates." },
    P049_china: { ref: "P049", quote: "About 15 percent of the world’s chip supply still originates in China, and the Communist Party’s new chip czar commands a trillion-dollar budget to expand the business over the next decade." },
    P049_routed: { ref: "P049", quote: "Huawei was successfully routed." },
    P051_trustlist: { ref: "P051", quote: "“Think about things like integrity, accountability, transparency, reciprocity, respect for rule of law, respect for the environment, respect for property of all kinds, respect for human rights, respect for sovereign nations, respect for the press,” Krach proposes to me. “These are things that we have in the free world”—the safeguards of mutual trust." },
    P052_raimondo: { ref: "P052", quote: "“Right now in the United States, we don’t really make any of the world’s most sophisticated, bleeding-edge, cutting-edge chips,” she said. “That’s a national security issue, a national security vulnerability. Today, we say we’re changing that.”" },
    P053_jobs: { ref: "P053", quote: "And while Biden focused on the 10,000 jobs the TSMC fab is bringing to Arizona—the largest foreign investment in the state in history—the biggest news in tech was that Tim Cook was in attendance. Weeks before, Cook had disclosed that Apple was going to start using TSMC’s “American-made chips.”" },
    P053_entente: { ref: "P053", quote: "Liu and Biden were careful not to describe the fab as a move toward semiconductor independence for either country but, rather, as one that locked in their entente." },
    P054_engineered: { ref: "P054", quote: "Known but not spoken at the opening event was that these chips would still be Taiwanese-engineered, their specs brought up to the minute—up to the femtosecond—by TSMC’s research team in Hsinchu." },
    P055_spycore: { ref: "P055", quote: "Yes, I’m told, spies hang around Taipei by the hundreds if not thousands; surely mall clothes make for superb spycore. But I’m just a tired pilgrim hoping for a glimpse of God." },
    P056_sneeze: { ref: "P056", quote: "A jittery, uninitiated person without an engineering degree could be a menace in the fabs, where she could sneeze like a putz and scatter a heap of glittering electrons like cocaine in Annie Hall." },
    P057_measure: { ref: "P057", quote: "Kramer has requested my measurements for a clean-room bunny suit and shoe protectors, which I take as a good sign I’ll get inside." },
    P057_giga: { ref: "P057", quote: "Then, suddenly, my tour of Fab 12A—known as a GigaFab because, every month, it processes fully 100,000 of the biggest wafers, the 12-inch ones—is on the calendar. My luggage even arrives." },
    P058_chan: { ref: "P058", quote: "Spirits buoyed, I head to Starbucks for a meal of mediocre flatbread with Victor Chan, a Taiwanese journalist and historian. I want to understand Taiwan before semiconductors, the Taiwan he grew up in. Chan talks in a steady stream." },
    P059_born: { ref: "P059", quote: "Taiwan’s commitment to semiconductor technology was born of economic necessity, Chan says, or maybe desperation." },
    P059_umbrella: { ref: "P059", quote: "In the postwar period, the country barely survived, but it steadily got into light industry, manufacturing spoons, mugs, and, famously, umbrellas. Taiwan excelled at umbrellas. At the height of the boom in the ’70s, three out of every four umbrellas worldwide were made on the island." },
    P060_nixon: { ref: "P060", quote: "Nixon had opened trade with China, and now China was making and exporting the goods Taiwan had once been known for." },
    P060_barbie: { ref: "P060", quote: "For 20 years, Mattel contracted with Taiwan to manufacture Barbie dolls in suburban Taishan, not far from Taipei; the town was devastated when Mattel eventually moved its Barbie business to China, where labor was cheaper. (Taishan still displays memorabilia of Barbie, the city’s shapely plastic patron saint.)" },
    P060_invaluable: { ref: "P060", quote: "The Taiwanese government began to devise a new way to make itself valuable to the US. Invaluable, rather, so it couldn’t be neglected or pushed around." },
    P061_rca: { ref: "P061", quote: "In 1976, RCA began sharing technology with Taiwanese engineers. Texas Instruments, under the direction of Morris Chang, who was then in charge of its global semiconductor business, opened a facility in Zhonghe, a district near Taipei." },
    P061_women: { ref: "P061", quote: "Like all the new semiconductor foundries, including the ones in Silicon Valley, the Taiwanese shops were staffed largely with women. Not only did industrialists consider women easier to mistreat and underpay than men (no, really?), but they believed that women were better at working with small objects because we have small hands." },
    P062_ketchup: { ref: "P062", quote: "“At first, we really didn’t have a clue about a chip,” Chan tells me. “Chips that come with ketchup? We had no clue.”" },
    P063_edu: { ref: "P063", quote: "The Taiwanese government began to plow money into engineering education, just at the time that expertise was plainly depleted in China and academics had been persecuted and murdered in the Cultural Revolution." },
    P064_koan: { ref: "P064", quote: "This is how the Taiwanese government came to approach the American company Wang Laboratories in the 1980s with a koan: How do you make a computer?" },
    P064_wang: { ref: "P064", quote: "An Wang, the company’s Shanghai-born founder, took up the challenge to conduct research into computer-making in Taiwan, eventually moving many of Wang’s operations to the island." },
    P065_wang82: { ref: "P065", quote: "\"Careful attention to education over the last 30 years has begun to pay dividends,” Wang said of Taiwan in 1982. “The output of engineering graduates in relation to the total population is much higher than in the US.”" },
    P066_li: { ref: "P066", quote: "Then, in 1987, K. T. Li, the minister in charge of tech and science, persuaded Chang to start a private manufacturing company that would export chips and generate more money for research." },
    P066_tower: { ref: "P066", quote: "He consulted a Song Dynasty poem that advised ambitious young men to climb to the top of a tall tower and survey all possible roads. He didn’t see a road for him at TI, so he lit out to build one in Taiwan." },
    P067_philips: { ref: "P067", quote: "TSMC opened its first fab that year and not long after laid the cornerstone for its headquarters in the same Hsinchu park as UMC and Wang. The Taiwanese government and the Dutch electronics company Philips were the first major investors." },
    P067_asml: { ref: "P067", quote: "Not only was Philips instrumental in starting TSMC, but TSMC’s blood brother in chipmaking is now ASML, the photolithography giant based in Veldhoven." },
    P068_rely: { ref: "P068", quote: "Chips, the ones without ketchup, would eventually take the place of umbrellas and Barbie dolls in Taiwan’s economy. And with its engineers developing the leading-edge chips faster than any place on earth, Taiwan did indeed force the US to rely on it." },
    P070_crux: { ref: "P070", quote: "To be truly essential, a global company must situate itself at a crux in the supply chain." },
    P070_midway: { ref: "P070", quote: "Chang, who has said he studies the Battles of Midway and Stalingrad to devise corporate strategy, cannily installed TSMC between design and product." },
    P070_pureplay: { ref: "P070", quote: "Chang gained trust by allaying fears that TSMC would steal designs, as pure-play foundries have no use of them; TSMC stealing from chip designers would be like a printing press stealing plots from novelists." },
    P070_92: { ref: "P070", quote: "Some tech companies get Super Bowl ads, adoring fanboys, and rockets for their founders; TSMC gets 92 percent." },
    P071_harvard: { ref: "P071", quote: "He grew up peripatetic in war-torn China and, in 1949, left for Harvard, where he studied English literature for two semesters. He remembers this period as “the most exciting year of my education.”" },
    P071_laundromat: { ref: "P071", quote: "But even as the humanities captured his heart, Chang realized that in the US of the 1950s, Chinese men without scientific training, even those with Ivy League degrees, could get stuck working in laundromats and restaurants. Engineering alone offered a shot at the middle class." },
    P071_oracle: { ref: "P071", quote: "Krach now calls Chang “the oracle.”" },
    P072_moore: { ref: "P072", quote: "In 1965, Gordon Moore, who would go on to cofound Intel, proposed that the number of transistors in a dense integrated circuit would double roughly every two years. In the early ’60s, four transistors could fit on a thumbnail-sized microchip. Today, on a stupendous chip TSMC makes for the AI company Cerebras, more than 2.6 trillion can." },
    P072_hope: { ref: "P072", quote: "Moore’s Law is, of course, not a law at all. Liu calls it a piece of “shared optimism.” A simple way to put TSMC into ideological perspective is to think of Moore’s Law as hope itself." },
    P073_yield: { ref: "P073", quote: "TI’s factories had wasted as much as half of their meticulously sanded and latticed silicon in making delicate chips. That was insupportable. At TSMC today, the yield rate is a closely guarded number, but analysts estimate that some 80 percent of its latest chips make it to the finish line." },
    P075_patents: { ref: "P075", quote: "The company now holds some 56,000 patents." },
    P076_covid: { ref: "P076", quote: "The night before my tour of the fabs, I take a Covid test and lay out respectable work clothes alongside two new black N-95s; masking is still mandatory. I hallucinate two red lines from across the room, but no, no Covid." },
    P077_asml: { ref: "P077", quote: "Photolithography machines are the specialty of TSMC’s partner firms, and above all ASML. It’s rumored that the next generation of these machines will cost around $400 million. Every one of the world’s most sophisticated chips uses ASML lithography." },
    P080_45nm: { ref: "P080", quote: "“It was still possible using the tried system,” Lin tells me. “But I foresaw that at the next node, which was 45 nanometers, we were going to have trouble.”" },
    P081_euv: { ref: "P081", quote: "People were putting their bets on extreme ultraviolet light, but it would be years before the litho machines in the fabs could muster enough steady source power for that." },
    P081_lens: { ref: "P081", quote: "But because such light couldn’t pierce existing lenses, it would need an exotic new lens made of calcium fluoride. Researchers built hundreds of furnaces in which to grow the right crystal, but no method did the trick. Close to a billion dollars went up in smoke." },
    P082_water: { ref: "P082", quote: "He invented a system for keeping water perfectly homogenous, and then he shot the light through it onto the wafer. Bingo. He could etch transistors as small as 28 nanometers, eventually with zero defects. “Water is a miracle,” Lin says." },
    P082_fish: { ref: "P082", quote: "“Water is a miracle. Not only for TSMC. It's a miracle for the whole of mankind. God is kind to the fish. And also to us.”" },
    P083_gene: { ref: "P083", quote: "Lin is another devout Christian at TSMC. His face is lively and expressive, and he looks and moves like a young Gene Kelly, though he’s 80." },
    P083_scale: { ref: "P083", quote: "“I see God in any scale,” he says. “Look at a dog or a tiger—and then look at the food that we eat. It's marvelous. Why? Why is that?”" },
    P084_yen: { ref: "P084", quote: "In 2014, Anthony Yen, who had succeeded Lin as head of research at TSMC, had been developing the next generation of litho for a decade. Yen, who now runs research at ASML, tells me that extreme ultraviolet lithography came together in the fall of that year." },
    P085_late: { ref: "P085", quote: "“We always worked late at TSMC,” Yen says." },
    P085_eureka: { ref: "P085", quote: "With the existing specs, the power source was reliable only at 10 watts; with the new ones, they hoped to hit 250. […] When it hit 90, that’s when he knew. “This was the eureka moment,” Yen says." },
    P086_2nm: { ref: "P086", quote: "Yen became so excited—“too excited,” he says—that he couldn’t even stay to watch the power hit 250. He ran out of the fab, flinging off his bunny suit. […] Today, TSMC’s transistors are down to just over 2 nanometers—the smallest in the world. These unseeable gems go into production in 2025." },
    P086_drugs: { ref: "P086", quote: "“I was euphoric. I was on drugs. For the believer, it is quite a religious experience.”" },
    P087_kind: { ref: "P087", quote: "“God is very kind to mankind,” he says again. God’s kindness, the miracle of water, religious euphoria—it swims in the mind like a school of blessed fish." },
    P087_blake: { ref: "P087", quote: "A line from William Blake seems right: To see a World in a Grain of Sand. That’s what we’re here for." },
    P088_spirit: { ref: "P088", quote: "I put a parting question to Lin: How in the world do you remain undaunted by all these extraordinary problems in nanotechnology? Lin laughs. “Well, we just have to solve them,” he says. “That is the TSMC spirit.”" },
    P089_us: { ref: "P089", quote: "Burn-Jeng Lin, TSMC's former head of research and the inventor of immersion litho, still speaks of the company as “us.”" },
    P090_neo: { ref: "P090", quote: "The moment has come. I’m Neo now, or the everyman in Pilgrim’s Progress, stepping into my destiny. Kramer, walking with me, once again laughs at my obsession with the fabs." },
    P091_behold: { ref: "P091", quote: "But to observe and to behold are two different pastures. Observation is for objects of scientific study. Beholding is for the sublime." },
    P092_tollbooth: { ref: "P092", quote: "I swish through a turnstile entrance that brings to mind The Phantom Tollbooth —allusions are coming fast and furious now—and I’m deposited before a kind of human car wash for dramatic personal ablutions. A single machine washes, rinses, and dries my hands." },
    P093_tender: { ref: "P093", quote: "To have a white-clad figure at my feet carefully adjusting the booties feels tender, somehow; I want to be sure to convey my gratitude, but it’s hard with a Covid mask on my face, glasses over my eyes, and a hood covering my hair and most of my forehead. Our bodies are not quite here." },
    P094_dust: { ref: "P094", quote: "Ordinary air can have up to 1 million particles of dust per cubic meter. The fabs and cleaning rooms have no more than 100. As I step into the fab at last, I can tell at once it’s the cleanest air I have ever inhaled." },
    P095_light: { ref: "P095", quote: "The vast room is bright and clear. When those who claim they’ve had a near-death experience during surgery speak of a bright light, they surely mean the hospital overheads. That’s what it looks like here in the bleached and antiseptic atmosphere, near death and clinical-heavenly." },
    P096_folly: { ref: "P096", quote: "What a wonderfully human folly, to try to create immaculateness." },
    P097_mist: { ref: "P097", quote: "At the sight of the lithography machine, my eyes mist. Oil, salt, water—human emotions are shameful contaminants. But I can’t help it." },
    P098_time: { ref: "P098", quote: "A saying at TSMC is that time flies in the fabs. It’s true. We’re inside for an hour, but it feels like 20 minutes." },
    P099_hum: { ref: "P099", quote: "The white humming machines are featureless, and thick hermetic glass stands between me and the fathomless nano-processes that I couldn’t have perceived with my crude pupils anyway." },
    P100_incu: { ref: "P100", quote: "It dawns on me at once that the machines resemble incubators in a neonatal intensive care unit." },
    P101_souls: { ref: "P101", quote: "I picture the transistors as trembling bodies with translucent skin and fast, shallow breaths. They are utterly dependent on adults who cherish them for their extraordinary smallness and cosmic potential. What’s present here is preciousness. To see the fabs is to feel a full-body urge to keep the tiny marvelous creations—newborns—and then humanity as a whole—alive." },
    P102_credo: { ref: "P102", quote: "There exists a physical world of calculable regularity. Math and logic can establish the truths of that world. Humans are capable of both profound goodness and feats of soaring genius. Democracy, individual liberty, and freedom of expression clear a path to wisdom, while closed autocratic hierarchies impede it." },
    P103_liu: { ref: "P103", quote: "“I hope the bad guys will get their penalty,” Liu said, when I asked about his hopes for the future. It was the first edgy thing I’d heard the TSMC chairman say. “And I hope the righteous”—he broke off—“human collaboration will continue.”" },
    P104_silicon: { ref: "P104", quote: "Silicon is one of the few supremely un-rare objects of desire. It’s the second most abundant element in the Earth’s crust, after oxygen. […] “God made silicon for us,” Liu told me." },
    P105_universe: { ref: "P105", quote: "While humans have been busy over these six decades with our political anguish, and our wars, we have also created a universe inside our universe, one with its own infinite intelligence, composed of cryptic atomic switches, enlightened with ultraviolet and built on sand." },
    P106_corr: { ref: "P106", quote: "Updated 3-22-2023, 10 am PST: Mark Liu earned his doctorate at UC Berkeley, not MIT." }
  };

  /* ---------------- insights (notebook) ---------------- */
  const insights = {
    umbrella_island: { pillar: "island", title: "The umbrella island", body: "Postwar Taiwan barely survived — then made three of every four umbrellas on Earth. A living, not leverage.", receipts: ["P059_born", "P059_umbrella"] },
    abandonment: { pillar: "island", title: "Abandonment", body: "Nixon opened China; the export niches left — Barbie left Taishan for cheaper labour. The diplomacy frayed with the orders.", receipts: ["P060_nixon", "P060_barbie"] },
    invaluable: { pillar: "island", title: "The strategy: invaluable", body: "Not valuable — invaluable, so the island couldn't be neglected or pushed around. Everything since follows from this sentence.", receipts: ["P060_invaluable"] },
    apprenticeship: { pillar: "island", title: "The apprenticeship", body: "RCA shared technology in 1976; TI opened a plant; the government poured money into engineering schools while the Cultural Revolution burned expertise across the strait. The early fabs were staffed largely by women — underpaid, and credited only with 'small hands'.", receipts: ["P061_rca", "P063_edu", "P061_women"] },
    wang_koan: { pillar: "island", title: "The koan", body: "The government asked Wang Labs: how do you make a computer? An Wang moved research to the island; by 1982 its per-person engineering-graduate output beat America's.", receipts: ["P064_koan", "P064_wang", "P065_wang82"] },
    founding: { pillar: "island", title: "1987 — the founding", body: "K. T. Li persuaded Morris Chang to build a private chip manufacturer. First money in: the Taiwanese government and Philips of the Netherlands — the Dutch thread that leads to ASML.", receipts: ["P066_li", "P067_philips", "P067_asml"] },

    atomic: { pillar: "litho", title: "Atomic constructions", body: "'Think like an atomic-sized person.' The chairman brings Lego of a transistor to interviews and quotes Proverbs about concealed matter.", receipts: ["P027_lego", "P027_atomic", "P027_proverbs"] },
    curiosity: { pillar: "litho", title: "Curiosity and stamina", body: "The two qualities that set TSMC scientists apart — plus, to the author's surprise, faith. (The chairman's doctorate: UC Berkeley — per the article's published correction.)", receipts: ["P026_curiosity", "P028_berkeley", "P106_corr"] },
    humans_needed: { pillar: "litho", title: "No lights-out fab", body: "20,000 technicians — a third of the workforce — monitor the atomic construction cycle. Spotting a nano-defect is like spotting a half-dollar on the moon from your backyard.", receipts: ["P033_lightsout", "P033_tech", "P033_moon"] },
    moores: { pillar: "litho", title: "Moore's Law is hope", body: "Not a law — 'shared optimism.' Four transistors fit a thumbnail chip in the early '60s; 2.6 trillion fit a Cerebras chip today.", receipts: ["P072_moore", "P072_hope"] },
    water: { pillar: "litho", title: "The miracle of water", body: "The exotic lens burned close to a billion dollars. EUV was years away at ten reliable watts. Lin shot the existing light through perfectly homogenous water: 28 nanometres, eventually zero defects.", receipts: ["P080_45nm", "P081_lens", "P081_euv", "P082_water"] },
    eureka: { pillar: "litho", title: "14 October 2014", body: "The power source jumped from 10 reliable watts to 90 on its way to 250. Yen ran out of the fab flinging off his bunny suit. Today: just over 2 nanometres, the smallest in the world.", receipts: ["P085_eureka", "P086_2nm", "P086_drugs"] },
    process: { pillar: "litho", title: "How a chip is printed", body: "Light through an inscribed plate onto a wafer, etched in chemicals, dozens of layers, cut into chips — printmaking, at the scale of atoms. ASML's machines (~$400M next-gen) print every one of the world's most sophisticated chips.", receipts: ["P031_process", "P077_asml"] },

    shield: { pillar: "stakes", title: "The Silicon Shield", body: "A near monopoly on the best chips as deterrence: 'just try to attack… it will be useless to you.' Taken by force, TSMC is inoperative — partners hang up, the fabs brick.", receipts: ["P015_shield", "P017_porcupine", "P017_liu", "P017_bricked2"] },
    pureplay: { pillar: "stakes", title: "The printing press", body: "Pure play: make everyone's chips, compete with no one. A printing press doesn't steal plots from novelists — so the novelists all print here. Trust as strategy; 92 percent as the result.", receipts: ["P070_pureplay", "P070_crux", "P070_92"] },
    invisible: { pillar: "stakes", title: "Indispensable, invisible", body: "'Basically, there is air — and TSMC.' Every new iPad, iPhone and Mac bricks without it; discretion is the business model.", receipts: ["P016_air", "P016_bricked", "P022_discretion"] },
    cleannet: { pillar: "stakes", title: "The Clean Network", body: "A masked delegation, 30+ countries, Huawei routed. About 15% of chips still come from China; its chip czar commands a trillion-dollar budget.", receipts: ["P048_5g", "P049_routed", "P049_china", "P046_trust"] },
    chipsact: { pillar: "stakes", title: "Arizona & the entente", body: "$280bn CHIPS Act, grown from a $12bn deal to bring the fabs to US soil. Ten thousand jobs, Tim Cook, 'American-made chips' — still Taiwanese-engineered to the femtosecond. Not independence: an entente, locked in.", receipts: ["P044_deal", "P044_chips", "P052_raimondo", "P053_jobs", "P054_engineered", "P053_entente"] },
    oracle: { pillar: "stakes", title: "The oracle", body: "Chang: war-torn childhood, a Harvard year he loved, the laundromat arithmetic of 1950s America, MIT instead. He studies Midway and Stalingrad, and read a Song poem about towers before leaving Dallas to build a road of his own.", receipts: ["P071_harvard", "P071_laundromat", "P071_oracle", "P066_tower", "P070_midway"] },
    foil: { pillar: "stakes", title: "The man who requires television", body: "Robert Tsao: UMC founder, TSMC's foil, $100M pledged to train 3 million civilians — and no interview without television time.", receipts: ["P010_tsao", "P011_foil", "P011_tv"] },
    euphemism: { pillar: "stakes", title: "Cross-strait tensions", body: "The papers never name the threat. Unnamed, it becomes an asteroid — irrational, insensate, possible at any time.", receipts: ["P004_strait", "P004_asteroid"] }
  };
  const pillarGoals = { island: 6, litho: 5, stakes: 5 };

  /* ---------------- quests & items ---------------- */
  const quests = {
    main: { name: "The Sacred Mountain", short: "Get inside the fab", desc: "No WIRED journalist has ever toured a TSMC fab. Get inside — and understand what you're asking to behold.", done: "You saw it. You beheld it." },
    luggage: { name: "Two Words at Baggage Claim", short: "Your Samsonite is missing", desc: "The plane left New York without a single economy-class bag. Two words of explanation: 'Ukraine war.' Your books are in that case.", done: "The Samsonite arrived, books and all — the night the tour was granted." },
    spycore: { name: "Spycore", short: "Buy something to wear", desc: "Everything you own is in the lost bag. A third-storey mini-mall is open after hours.", done: "Toothbrush. Shapeless navy-blue separates. Superb spycore." },
    island: { name: "The Island of Umbrellas", short: "Learn the island (Chan)", desc: "Victor Chan, historian, is at the Starbucks with a steady stream and mediocre flatbread. Understand Taiwan before semiconductors.", done: "Umbrellas → Barbie → invaluable → chips. You understand the island now." },
    water: { name: "The Miracle of Water", short: "Learn the litho (Liu, Lin)", desc: "The chairman brings Lego to interviews. A retired researcher sees God in any scale. Understand what is actually made here.", done: "Atomic constructions, a billion-dollar dead end, and light shot through water." },
    excited: { name: "Too Excited", short: "Call Anthony Yen", desc: "Lin says his successor was there the night extreme ultraviolet finally worked. He runs research at ASML now. The hotel phone works.", done: "10 watts → 90. He ran out flinging off his bunny suit." },
    porcupine: { name: "The Porcupine", short: "Learn the stakes (Krach)", desc: "The man who brokered the fabs' journey to Arizona keeps picking up on the second ring. Understand the shield.", done: "The shield, the clean network, the entente. You understand the stakes." },
    press: { name: "The Printing Press", short: "Ask Kramer about pure play", desc: "Why would Apple hand its crown jewels to a stranger? Kramer buys the coffee; ask him how trust became a business model.", done: "A printing press doesn't steal plots from novelists." },
    refusals: { name: "Three Refusals", short: "Earn the yes", desc: "Like a fairy tale: he must refuse you three times, and you must persist — proving sincerity like a knight, or a daughter of King Lear.", done: "Measurements taken. Tour on the calendar." },
    tvman: { name: "A Man Who Requires Television", short: "The rival on channel 4", desc: "Robert Tsao is on TV in rococo tactical gear. He does not talk to print journalists.", done: "He declined. Of course he declined. It's in your notebook anyway." },
    face: { name: "The Face of God", short: "Walk the fab", desc: "Fab 12A. A GigaFab. Walk it slowly.", done: "Time flies in the fabs." }
  };

  const items = {
    notebook: { name: "Reporter's notebook", icon: "📓", desc: "Every fact in here carries a ¶ receipt back to the article. Your sincerity, in paper form." },
    toothbrush: { name: "Toothbrush", icon: "🪥", desc: "Mini-mall, third floor, after hours. The glamour of foreign correspondence." },
    separates: { name: "Navy-blue separates", icon: "🧥", desc: "Shapeless. Superb spycore. Three stars on Yelp, like TSMC style itself." },
    coffee: { name: "7-Eleven coffee", icon: "☕", desc: "Perfectly potable — especially when Kramer treats you, with the company discount." },
    n95: { name: "Two black N-95s", icon: "😷", desc: "Masking is still mandatory. Laid out the night before, next to respectable work clothes." },
    samsonite: { name: "Samsonite wheelie", icon: "🧳", desc: "Contains Chip War and The Passions and the Interests. Went to war with the routing tables; won eventually." },
    bunny: { name: "Bunny suit", icon: "🥼", desc: "Fitted to your measurements by people who treat the fitting as a rite. Your body is not quite here." }
  };

  /* ---------------- dialogue trees ---------------- */
  const dialogs = {

    /* ===== PROLOGUE — NEW YORK ===== */
    ny_open: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "New York. The night before the flight. I've been brooding morbidly on the fate of democracy again." },
      { s: "inner", t: "Tomorrow: Taipei. The industrial park in Hsinchu. The company almost nobody can name that almost everything depends on." },
      { s: "inner", t: "Pack the case. Take the calls. Try to sleep." }
    ] } } },
    ny_pack: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "ny_packed" }, go: "again" }], redirectElse: "pack" },
      pack: { lines: [
        { s: "inner", t: "The Samsonite. In go: Chris Miller's Chip War. Hirschman's The Passions and the Interests — the book that got me thinking about the etymology of 'commodities'.", r: ["P009_samsonite"], v: true },
        { s: "inner", t: "Books for an 18-hour flight. What could go wrong." }
      ], fx: [{ flag: "ny_packed" }, { item: "notebook" }] },
      again: { lines: [{ s: "inner", t: "Packed. Zipped. Fine." }] }
    } },
    ny_phone: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "krach1_done" }, go: "again" }], redirectElse: "call" },
      call: { lines: [
        { s: "krach", t: "Keith Krach. You got my good line — I'm told you're going to see the Sacred Mountain." },
        { s: "you", t: "Trying to. Before I go: why does everyone in Washington sleep at night while one island makes all the chips?" },
        { s: "krach", t: "“They call Taiwan the porcupine, right? It’s like, just try to attack. You may just blow the whole island up, but it will be useless to you.”", v: true, r: ["P017_porcupine"] },
        { s: "krach", t: "Ask me again when you've seen the place. I brokered the deal that's bringing their fabs to Arizona — there's a longer story, and it's about trust." },
        { s: "inner", t: "A former State Department undersecretary who trained as a welder and ran DocuSign. 'Disarmingly wholesome' is the phrase in my notes.", r: ["P045_krach"] }
      ], fx: [{ flag: "krach1_done" }, { insight: "shield" }] },
      again: { lines: [{ s: "inner", t: "Krach's parting words: ask me again when you've seen the place." }] }
    } },
    ny_podcast: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "tooze_done" }, go: "again" }], redirectElse: "listen" },
      listen: { lines: [
        { s: "podcast", t: "…Adam Tooze, on the fabs:" },
        { s: "podcast", t: "“The global semiconductor industry isn’t just the supply chain. It’s one of humanity’s great technological scientific achievements. Our ability to do this stuff at nanoscale is us up against the face of God, in a sense.”", v: true, r: ["P038_tooze"] },
        { s: "inner", t: "Up against the face of God. In Tooze's peerless empire accent. I've rewound it four times." },
        { s: "inner", t: "That's the assignment, then. Not the machines. The face." }
      ], fx: [{ flag: "tooze_done" }, { quest: { id: "main", s: "active" } }] },
      again: { lines: [{ s: "inner", t: "The podcast player glows. 'Up against the face of God, in a sense.'" }] }
    } },
    ny_door: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "ny_packed", flag2: "x" }, go: "check" }], redirectElse: "check" },
      check: { redirect: [
        { if: { flag: "ny_packed" }, go: "check2" }
      ], redirectElse: "nope" },
      check2: { redirect: [
        { if: { flag: "krach1_done" }, go: "check3" }
      ], redirectElse: "nope" },
      check3: { redirect: [
        { if: { flag: "tooze_done" }, go: "go" }
      ], redirectElse: "nope" },
      nope: { lines: [{ s: "inner", t: "Case, phone, podcast. Then the door. A pilgrim should leave prepared." }] },
      go: { lines: [{ s: "inner", t: "JFK. Gate. Seat 52E. Here we go." }], endFx: [{ flag: "ny_ready" }, { cutscene: "flight" }] }
    } },

    /* ===== ACT 1 — AIRPORT ===== */
    air_open: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "“The flight from Kennedy Airport to Taipei nearly laid me to waste—just under 18 hallucinatory hours at the back of a packed 777.”", v: true, r: ["P008_flight"] },
      { s: "inner", t: "Taoyuan. Baggage claim. The belt is turning and turning and turning and it is very, very empty." }
    ] } } },
    air_carousel: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "No Samsonite. No anyone's-anything, actually. An entire economy class stares at a naked belt." }
    ] } } },
    air_clerk: { start: "a", nodes: {
      a: { lines: [
        { s: "you", t: "Hi — my case never came out. Navy Samsonite wheelie? It has my books in it." },
        { s: "airclerk", t: "Ukraine war." },
        { s: "you", t: "…Sorry?" },
        { s: "airclerk", t: "Ukraine war. Flights from the US route around Russian airspace now. They flew light. No economy bags." },
        { s: "inner", t: "“We got two words at baggage claim: ‘Ukraine war.’”", v: true, r: ["P009_ukraine"] },
        { s: "inner", t: "My Chip War is in that bag. There is a joke here and I am too tired to make it." }
      ], choices: [
        { t: "\"When does it arrive?\"", go: "when" },
        { t: "〜 Chabuduo. It'll come when it comes.", chab: true, go: "chab", if: { flag: "learned_chabuduo" } },
        { t: "Take a breath. Move on.", go: "end" }
      ], fx: [{ quest: { id: "luggage", s: "active" } }, { flag: "air_asked" }] },
      when: { lines: [
        { s: "airclerk", t: "Days. A week. The routing tables are at war with everyone's suitcases. We will call your hotel." },
        { s: "inner", t: "A week. In the clothes I slept in over the Pacific." }
      ] },
      chab: { lines: [{ s: "airclerk", t: "…Exactly. You will do fine here." }] },
      end: { lines: [{ s: "inner", t: "Taxi. Taipei. Sleep — or something adjacent to it." }] }
    } },
    air_clerk2: { start: "a", nodes: { a: { lines: [
      { s: "airclerk", t: "No news yet. The tables are still at war. We have your hotel." }
    ] } } },
    air_nudge: { start: "a", nodes: { a: { lines: [{ s: "inner", t: "Talk to baggage services first. The case matters — the books matter." }] } } },

    /* ===== STREET ROUTERS & FLAVOUR ===== */
    hotel_enter_router: { start: "a", nodes: { a: { lines: [], endFx: { goto: { s: "hotel", x: 7, y: 7, f: "up" } } } } },
    mall_router: { start: "a", nodes: { a: { lines: [], endFx: { goto: { s: "mall", x: 7, y: 6, f: "up" } } } } },
    seven_router: { start: "a", nodes: { a: { lines: [], endFx: { goto: { s: "seven", x: 6, y: 5, f: "up" } } } } },
    starbucks_router: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "met_kramer" }, go: "in" }], redirectElse: "later" },
      later: { lines: [{ s: "inner", t: "A Starbucks is a Starbucks is a Starbucks. Unless someone's waiting in it. Nobody's waiting in it yet." }] },
      in: { lines: [], endFx: { goto: { s: "starbucks", x: 9, y: 5, f: "up" } } }
    } },
    train_router: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "tour_day" }, go: "tour" }, { if: { flag: "met_kramer" } , go: "go" }], redirectElse: "later" },
      later: { lines: [{ s: "inner", t: "The high-speed rail to Hsinchu. No appointment, no doorman, no point. Coffee first." }] },
      go: { lines: [{ s: "inner", t: "Southbound. Thirty minutes to the Sacred Mountain's industrial park." }], endFx: { goto: { s: "train", x: 2, y: 4, f: "right" } } },
      tour: { lines: [{ s: "inner", t: "Tour day. Deep breath." }], endFx: { goto: { s: "train", x: 2, y: 4, f: "right" } } }
    } },
    newsstand: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "news_done" }, go: "again" }], redirectElse: "read" },
      read: { lines: [
        { s: "sign", t: "Front pages, all of them, all week: “cross-strait tensions.”" },
        { s: "inner", t: "“So as not to mention either country by name—or are they one?—Taiwanese newspapers often euphemize Beijing’s bellicosity toward the island as ‘cross-strait tensions.’”", v: true, r: ["P004_strait"] },
        { s: "inner", t: "“The longer the threat is unnamed, the more it comes to seem like an asteroid, irrational and insensate.”", v: true, r: ["P004_asteroid"] }
      ], fx: [{ flag: "news_done" }, { insight: "euphemism" }] },
      again: { lines: [{ s: "inner", t: "Same euphemism, new headlines. The asteroid stays unnamed." }] }
    } },
    tv_early: { start: "a", nodes: { a: { lines: [{ s: "tv", t: "…weather. Humid. More humid later. Now: golf." }] } } },
    tv_window: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "tv_done" }, go: "tsao" }], redirectElse: "news" },
      news: { lines: [
        { s: "tv", t: "…in Phoenix, the Commerce Secretary at the TSMC unveiling:" },
        { s: "tv", t: "“Right now in the United States, we don’t really make any of the world’s most sophisticated, bleeding-edge, cutting-edge chips. That’s a national security issue, a national security vulnerability. Today, we say we’re changing that.”", v: true, r: ["P052_raimondo"] },
        { s: "tv", t: "Ten thousand jobs. The largest foreign investment in Arizona's history. Tim Cook in the front row for 'American-made chips'.", r: ["P053_jobs"] },
        { s: "inner", t: "American-made — and still Taiwanese-engineered, tuned to the femtosecond from Hsinchu. Everyone on that stage chose their words like surgeons: not independence. An entente, locked in.", r: ["P054_engineered", "P053_entente"] }
      ], fx: [{ flag: "tv_done" }, { insight: "chipsact" }],
        next: "tsaoIntro" },
      tsaoIntro: { lines: [
        { s: "tv", t: "— up next on channel 4: chip billionaire Robert Tsao, in tactical gear, on why he pledged $100 million to train three million civilian defenders." }
      ], choices: [
        { t: "Watch the Tsao segment.", go: "tsao2" },
        { t: "That's enough television.", go: "bye" }
      ] },
      tsao: { lines: [{ s: "tv", t: "Channel 4 replays the Tsao segment on a loop. The tactical gear remains rococo." }], choices: [
        { t: "Watch it again.", go: "tsao2" }, { t: "Leave.", go: "bye" }
      ] },
      tsao2: { lines: [
        { s: "tv", t: "Robert Tsao — founder of UMC, TSMC's oldest rival — pledges nearly $100 million for national defence: training for 3 million civilians.", r: ["P010_tsao"] },
        { s: "inner", t: "“TSMC, which plays everything cool, seems to view Tsao as a kind of foil. Tsao is a show-off.”", v: true, r: ["P011_foil"] },
        { s: "inner", t: "I asked his office for an interview. He declined — unless I could promise television time. I could not.", r: ["P011_tv"] }
      ], fx: [{ quest: { id: "tvman", s: "active" } }, { insight: "foil" }, { quest: { id: "tvman", s: "done" } }] },
      bye: { lines: [{ s: "inner", t: "The window's reflection is a journalist in slept-in clothes. Onward." }] }
    } },

    /* ===== MALL ===== */
    mall_clerk: { start: "a", nodes: {
      a: { lines: [
        { s: "mallclerk", t: "We close at… actually we don't seem to close. Third floor never closes. What do you need?" },
        { s: "you", t: "Everything I own is circling a routing table over Alaska. Clothes. A toothbrush. Dignity, if it's in stock." },
        { s: "mallclerk", t: "Aisle three: shapeless navy-blue separates. Very popular with people whose luggage is at war." }
      ], choices: [
        { t: "Buy the navy separates + toothbrush.", go: "buy" },
        { t: "\"Is 'shapeless' a selling point here?\"", go: "banter" }
      ] },
      banter: { lines: [
        { s: "mallclerk", t: "In this humidity? Shape is a lie we tell the air conditioning. Buy the separates." }
      ], next: "buyChoice" },
      buyChoice: { lines: [], choices: [{ t: "Fine. The separates.", go: "buy" }] },
      buy: { lines: [
        { s: "inner", t: "“I buy a toothbrush and some shapeless navy-blue separates in a third-story mini mall open after hours.”", v: true, r: ["P020_mall"] },
        { s: "mallclerk", t: "One more thing, free with purchase. A word: chabuduo. It means — whatever. Close enough. You will need it here more than the toothbrush." },
        { s: "inner", t: "“Chabuduo becomes my passion.” A quiet-quitter defiance of jet lag, lost luggage, and sabre-rattling alike.", r: ["P020_chabuduo"] }
      ], fx: [{ flag: "bought_clothes" }, { flag: "learned_chabuduo" }, { item: "toothbrush" }, { item: "separates" }, { outfit: "mall" }, { quest: { id: "spycore", s: "active" } }, { quest: { id: "spycore", s: "done" } }, { sincerity: 1 }] },
    } },
    mall_clerk2: { start: "a", nodes: { a: { lines: [
      { s: "mallclerk", t: "The separates suit you. In the sense that they suit no one, equally." },
      { s: "you", t: "Chabuduo." },
      { s: "mallclerk", t: "Chabuduo!" }
    ] } } },

    /* ===== 7-ELEVEN & KRAMER ===== */
    seven_clerk: { start: "a", nodes: { a: { lines: [
      { s: "clerk", t: "Coffee machine's at the back. The TSMC people get ten percent. They never let you forget the ten percent." }
    ] } } },
    kramer_first: { start: "a", nodes: {
      a: { lines: [
        { s: "kramer", t: "You must be the WIRED pilgrim. Michael Kramer — TSMC public relations. You look like your luggage went to war." },
        { s: "you", t: "It did. 'Ukraine war', verbatim. I've been wearing the Pacific Ocean for two days." },
        { s: "kramer", t: "Then the first thing you need is not a fab. It's this." },
        { s: "inner", t: "“Black coffee at 7-Eleven is perfectly potable, especially when Kramer treats me to a cup. He gets the company discount there too.”", v: true, r: ["P036_coffee"] }
      ], next: "ask" },
      ask: { lines: [], choices: [
        { t: "\"I want to see inside a fab.\"", go: "refuse" },
        { t: "\"Tell me about yourself first.\"", go: "bio", fx: [{ sincerity: 1 }] },
        { t: "〜 \"Good coffee. Chabuduo.\"", chab: true, go: "chab", if: { flag: "learned_chabuduo" } }
      ] },
      bio: { lines: [
        { s: "kramer", t: "Son of a Lutheran missionary and a Taiwanese teacher. Christian school in the south, then Taipei American School. Now I explain the world's most secretive company to people like you.", r: ["P040_kramer"] },
        { s: "kramer", t: "Which — I'm guessing — brings us to what you actually want." }
      ], next: "ask2" },
      chab: { lines: [
        { s: "kramer", t: "Ha! Someone taught you the important word already. You'll survive. Now say the thing you came to say." }
      ], next: "ask2" },
      ask2: { lines: [], choices: [{ t: "\"I want to see inside a fab.\"", go: "refuse" }] },
      refuse: { lines: [
        { s: "kramer", t: "No." },
        { s: "kramer", t: "You're the — fourth? — this year. They all want the machines. The machines don't photograph. You would be looking at white boxes, through glass, in a bunny suit. What is it you think you'd be seeing?" }
      ], choices: [
        { t: "\"I don't want to look. I want to behold.\"", go: "behold", fx: [{ sincerity: 2 }] },
        { t: "\"The most important room on Earth.\"", go: "important" },
        { t: "\"Honestly? A scoop. WIRED's never been inside.\"", go: "scoop" }
      ] },
      behold: { lines: [
        { s: "kramer", t: "…Huh. That's a new one." },
        { s: "inner", t: "“To observe and to behold are two different pastures. Observation is for objects of scientific study. Beholding is for the sublime.”", v: true, r: ["P091_behold"] },
        { s: "kramer", t: "All right, pilgrim. Here's how this goes. Not a yes — a path." }
      ], next: "path" },
      important: { lines: [
        { s: "kramer", t: "Every visitor says that. Then they ask where the gift shop is." },
        { s: "kramer", t: "But fine. Here's how this goes. Not a yes — a path." }
      ], next: "path" },
      scoop: { lines: [
        { s: "kramer", t: "At least you're honest. It's true — no WIRED journalist has been inside. There's a reason.", r: ["P018_wired"] },
        { s: "kramer", t: "Here's how this goes. Not a yes — a path." }
      ], next: "path" },
      path: { lines: [
        { s: "kramer", t: "Learn the island — Victor Chan, a historian, eats mediocre flatbread at the Starbucks and talks in a steady stream. Learn the litho — the chairman will see you in Hsinchu; bring good questions. Learn the stakes — you have the diplomat's phone number already, I suspect." },
        { s: "kramer", t: "Fill that notebook. Then ask me again. And again. There's a rhythm to it — you'll see." },
        { s: "inner", t: "“It was like a fairy tale; he had to refuse me three times and I had to persist, proving my sincerity like a knight or a daughter of King Lear.”", v: true, r: ["P024_fairy"] },
        { s: "inner", t: "Refusal one. Noted. Sincerity: pending." }
      ], endFx: [{ flag: "met_kramer" }, { flag: "refusal1" }, { quest: { id: "island", s: "active" } }, { quest: { id: "water", s: "active" } }, { quest: { id: "porcupine", s: "active" } }, { quest: { id: "refusals", s: "active" } }, { item: "coffee" }] }
    } },
    kramer_smalltalk: { start: "a", nodes: {
      a: { redirect: [
        { if: { notFlag: "refusal2" }, go: "early" }
      ], redirectElse: "later" },
      early: { lines: [
        { s: "kramer", t: "Notebook first, pilgrim. The island. The litho. The stakes. The coffee will still be here." }
      ] },
      later: { lines: [
        { s: "kramer", t: "You're getting somewhere. I can tell because you've stopped asking me where the gift shop is." }
      ], choices: [
        { t: "\"What do TSMC people actually get? Perks?\"", go: "bk" },
        { t: "Back to work.", go: "bye" }
      ] },
      bk: { lines: [
        { s: "kramer", t: "“Kramer tells me that employees get a 10 percent discount at Burger King. Ten percent.”", v: true, r: ["P023_bk"] },
        { s: "kramer", t: "Starting engineers make about $5,400 a month; a one-bedroom in Hsinchu runs $450. People don't come for perks. Perhaps people come to work at TSMC just to work at TSMC.", r: ["P023_salary", "P023_bk"] }
      ] },
      bye: { lines: [{ s: "kramer", t: "Go on. The mountain isn't getting less sacred." }] }
    } },
    kramer_press: { start: "a", nodes: {
      a: { lines: [
        { s: "you", t: "Krach kept saying 'trust'. Explain something to me: why would Apple hand its crown jewels to a stranger in Hsinchu?" },
        { s: "kramer", t: "Because the stranger constitutionally cannot compete with them. Pure play. We make everyone's chips; we sell none of our own." },
        { s: "kramer", t: "“TSMC stealing from chip designers would be like a printing press stealing plots from novelists.”", v: true, r: ["P070_pureplay"] },
        { s: "kramer", t: "Morris Chang installed the company at a crux of the supply chain and made trust the product. He studies Midway and Stalingrad, you know. For strategy.", r: ["P070_crux", "P070_midway"] },
        { s: "you", t: "And the result?" },
        { s: "kramer", t: "“Some tech companies get Super Bowl ads, adoring fanboys, and rockets for their founders; TSMC gets 92 percent.”", v: true, r: ["P070_92"] },
        { s: "inner", t: "Invisible as suitors. Indispensable as husbands. There's a Jensen Huang line about air I keep seeing on posters." }
      ], fx: [{ flag: "press_done" }, { insight: "pureplay" }, { quest: { id: "press", s: "active" } }, { quest: { id: "press", s: "done" } }] }
    } },
    kramer_refusal2: { start: "a", nodes: {
      a: { lines: [
        { s: "kramer", t: "The notebook's heavier. I can hear it. Go on then — ask." },
        { s: "you", t: "Let me inside the fab." },
        { s: "kramer", t: "No." },
        { s: "kramer", t: "…Better, though. You asked like someone who knows what she's asking for. Twice more and you're a knight. Or a daughter of King Lear.", r: ["P024_fairy"] },
        { s: "inner", t: "Refusal two. He's enjoying this. So, horribly, am I." }
      ], fx: [{ flag: "refusal2" }, { sincerity: 1 }] }
    } },
    kramer_refusal3: { start: "a", nodes: {
      a: { lines: [
        { s: "kramer", t: "Back again. The island, the litho — you've been busy. Ask." },
        { s: "you", t: "The fab, Kramer." },
        { s: "kramer", t: "…No." },
        { s: "kramer", t: "That's three. The fairy-tale quota is met. Finish the notebook — if the stakes pillar is thin, try the poster in our lobby, the TV by the newsstand, and that phone of yours — then ask once more. I promise the answer changes." },
        { s: "inner", t: "Refusal three. 'My interest in the fabs borders on zealotry.' It's in my notes. It's possibly a diagnosis.", r: ["P024_zeal"] }
      ], fx: [{ flag: "refusal3" }, { sincerity: 1 }] }
    } },
    kramer_gate: { start: "a", nodes: {
      a: { lines: [
        { s: "kramer", t: "Island. Litho. Stakes. Three refusals, zero flouncing. One question left, and it's mine." },
        { s: "kramer", t: "Why do you want in? Really." }
      ], choices: [
        { t: "\"Because to behold is different from to observe. I came for the sublime.\"", go: "yes", fx: [{ sincerity: 2 }] },
        { t: "\"Because the whole world stands on that room and almost nobody's seen it.\"", go: "yes2" },
        { t: "〜 \"Chabuduo — would 'all of the above' do?\"", chab: true, go: "yesChab", if: { flag: "learned_chabuduo" } }
      ] },
      yes: { lines: [
        { s: "kramer", t: "…Yeah. All right. That's the answer of a pilgrim, not a tourist." }
      ], next: "grant" },
      yes2: { lines: [
        { s: "kramer", t: "True enough — and honestly put." }
      ], next: "grant" },
      yesChab: { lines: [
        { s: "kramer", t: "Ha. The word works on me, it's true. All of the above, then." }
      ], next: "grant" },
      grant: { lines: [
        { s: "kramer", t: "I need your measurements. Bunny suit, shoe protectors. Take the good sign." },
        { s: "inner", t: "“Kramer has requested my measurements for a clean-room bunny suit and shoe protectors, which I take as a good sign I’ll get inside.”", v: true, r: ["P057_measure"] },
        { s: "kramer", t: "Fab 12A. A GigaFab — one hundred thousand twelve-inch wafers a month. Tomorrow morning. Sleep, if you're capable of it.", r: ["P057_giga"] }
      ], endFx: [{ flag: "tourGranted" }, { quest: { id: "refusals", s: "done" } }, { cutscene: "granted" }] }
    } },
    kramer_hq_chat: { start: "a", nodes: { a: { lines: [
      { s: "kramer", t: "Welcome to headquarters. Glassy. Forgettable. A few half-hearted pops of red. We like it that way.", r: ["P022_charlotte", "P022_discretion"] },
      { s: "kramer", t: "The chairman's in the conference room. He brought the Lego. He always brings the Lego." }
    ] } } },

    /* ===== STARBUCKS — CHAN & THE MEMORIES ===== */
    chan_intro: { start: "a", nodes: {
      a: { lines: [
        { s: "chan", t: "You're Kramer's pilgrim. Sit. The flatbread is mediocre; the history is not.", r: ["P058_chan"] },
        { s: "you", t: "I want Taiwan before semiconductors. The island you grew up in." },
        { s: "chan", t: "“Taiwan’s commitment to semiconductor technology was born of economic necessity — or maybe desperation.”", v: true, r: ["P059_born"] },
        { s: "chan", t: "Close your eyes. I talk; you walk. We'll start with rain." }
      ], endFx: [{ flag: "chan_intro" }, { mood: "sepia" }, { goto: { s: "fb_umbrella", x: 2, y: 4, f: "right" } }] },
    } },
    chan_mid: { start: "a", nodes: {
      a: { redirect: [
        { if: { notFlag: "fb1" }, go: "toUmb" },
        { if: { notFlag: "fb2" }, go: "toTai" },
        { if: { notFlag: "fb3" }, go: "toRca" }
      ], redirectElse: "toRca" },
      toUmb: { lines: [{ s: "chan", t: "Where were we — rain. Umbrellas. Walk." }], endFx: { goto: { s: "fb_umbrella", x: 2, y: 4, f: "right" } } },
      toTai: { lines: [{ s: "chan", t: "Next memory. A factory gate in Taishan, and a notice pinned to it. Walk." }], endFx: { goto: { s: "fb_taishan", x: 2, y: 4, f: "right" } } },
      toRca: { lines: [{ s: "chan", t: "Last one. A classroom, 1976. Pay attention to the silhouette by the window. Walk." }], endFx: { goto: { s: "fb_rca", x: 9, y: 7, f: "up" } } }
    } },
    chan_done: { start: "a", nodes: { a: { lines: [
      { s: "chan", t: "“At first, we really didn’t have a clue about a chip. Chips that come with ketchup? We had no clue.”", v: true, r: ["P062_ketchup"] },
      { s: "chan", t: "Now the chips replaced the umbrellas and the Barbies both — and the US relies on this island whether it likes remembering that or not.", r: ["P068_rely"] },
      { s: "chan", t: "That's the island. Go see what they built on it." }
    ] } } },

    fb_umb_foreman: { start: "a", nodes: { a: { lines: [
      { s: "foreman", t: "Faster, faster! Every fourth umbrella opened anywhere on Earth — ours. You think that happens at strolling pace?" },
      { s: "inner", t: "“In the postwar period, the country barely survived, but it steadily got into light industry… Taiwan excelled at umbrellas. At the height of the boom in the ’70s, three out of every four umbrellas worldwide were made on the island.”", v: true, r: ["P059_umbrella"] }
    ], fx: [{ insight: "umbrella_island" }] } } },
    fb_umb_crate: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "Crates of umbrellas, stencilled for Rotterdam, Los Angeles, Lagos. A living. Not leverage — anyone can make an umbrella, given cheaper hands." }
    ] } } },
    fb_umb_exit: { start: "a", nodes: {
      a: { redirect: [{ if: { insight: "umbrella_island" }, go: "out" }], redirectElse: "stay" },
      stay: { lines: [{ s: "chan", t: "(from the rain) — Talk to the foreman first, pilgrim. The number matters. Three of four." }] },
      out: { lines: [
        { s: "chan", t: "(his voice, over the rain) — And then Washington changed the weather. Come back." }
      ], endFx: [{ flag: "fb1" }, { goto: { s: "starbucks", x: 4, y: 4, f: "left" } }, { mood: "day" }] }
    } },

    fb_tai_worker: { start: "a", nodes: { a: { lines: [
      { s: "worker", t: "Twenty years we made her. Every blonde inch. Now the notice says the moulds ship west across the strait." },
      { s: "inner", t: "“…the town was devastated when Mattel eventually moved its Barbie business to China, where labor was cheaper.”", v: true, r: ["P060_barbie"] }
    ], fx: [{ insight: "abandonment" }] } } },
    fb_tai_gate: { start: "a", nodes: { a: { lines: [
      { s: "sign", t: "NOTICE OF CLOSURE — production relocating. Nixon has opened trade; the goods this island was known for are now made across the strait.", r: ["P060_nixon"] },
      { s: "inner", t: "And in an office in Taipei, someone writes the sentence that decides the next fifty years:" },
      { s: "inner", t: "“The Taiwanese government began to devise a new way to make itself valuable to the US. Invaluable, rather, so it couldn’t be neglected or pushed around.”", v: true, r: ["P060_invaluable"] }
    ], fx: [{ insight: "invaluable" }] } } },
    fb_tai_exit: { start: "a", nodes: {
      a: { redirect: [{ if: { insight: "abandonment" }, go: "chk" }], redirectElse: "stay1" },
      chk: { redirect: [{ if: { insight: "invaluable" }, go: "out" }], redirectElse: "stay2" },
      stay1: { lines: [{ s: "chan", t: "(softly) — The worker by the fence. Hear her out first." }] },
      stay2: { lines: [{ s: "chan", t: "(softly) — Read the notice on the gate. The sentence that decides everything is pinned to it." }] },
      out: { lines: [
        { s: "chan", t: "(steady stream, softly) — Invaluable. Hold that word. Come back." }
      ], endFx: [{ flag: "fb2" }, { goto: { s: "starbucks", x: 4, y: 4, f: "left" } }, { mood: "day" }] }
    } },

    fb_rca_wang: { start: "a", nodes: { a: { lines: [
      { s: "wang", t: "The government came to us with a koan: how do you make a computer? I intend to answer it here, on this island.", r: ["P064_koan", "P064_wang"] },
      { s: "wang", t: "“Careful attention to education over the last 30 years has begun to pay dividends. The output of engineering graduates in relation to the total population is much higher than in the US.”", v: true, r: ["P065_wang82"] }
    ], fx: [{ insight: "wang_koan" }] } } },
    fb_rca_li: { start: "a", nodes: { a: { lines: [
      { s: "li", t: "RCA shares its technology as of this year. Texas Instruments builds in Zhonghe. And the schools — we fund the schools while our neighbour burns its own scholars.", r: ["P061_rca", "P063_edu"] },
      { s: "li", t: "One day soon I will sit across from a man in Dallas and persuade him to come home and build a company that makes chips for the whole world.", r: ["P066_li"] }
    ], fx: [{ insight: "apprenticeship" }] } } },
    fb_rca_student: { start: "a", nodes: { a: { lines: [
      { s: "worker", t: "They hire us because they say our hands are small and our wages can be smaller. Fine. Watch what the small hands build." },
      { s: "inner", t: "“…the Taiwanese shops were staffed largely with women. Not only did industrialists consider women easier to mistreat and underpay than men (no, really?)…” — the author's parenthesis, preserved.", v: true, r: ["P061_women"] }
    ] } } },
    fb_rca_chang: { start: "a", nodes: { a: { lines: [
      { s: "chang", t: "(a silhouette, reading) — A Song-dynasty poem: climb the tall tower; survey all possible roads. There is no road for me at Texas Instruments. So I will build one.", r: ["P066_tower"] },
      { s: "inner", t: "Morris Chang. Harvard for one exhilarating year of English literature — then the laundromat arithmetic of 1950s America sent him to MIT and into silicon.", r: ["P071_harvard", "P071_laundromat"] },
      { s: "chang", t: "(on a crackling broadcast, decades later) — \"No one in the United States is as dedicated to their work as in Taiwan.\"", v: true, r: ["P035_dedicated"] },
      { s: "inner", t: "In 1987 K. T. Li gets his wish: TSMC. First investors — the government, and Philips of the Netherlands. Remember the Dutch. They become the blood brother called ASML.", r: ["P066_li", "P067_philips", "P067_asml"] }
    ], fx: [{ insight: "founding" }] } } },
    fb_rca_exit: { start: "a", nodes: {
      a: { redirect: [{ if: { insight: "apprenticeship" }, go: "chk" }], redirectElse: "stayLi" },
      chk: { redirect: [{ if: { insight: "wang_koan" }, go: "chk2" }], redirectElse: "stayWang" },
      chk2: { redirect: [{ if: { insight: "founding" }, go: "out" }], redirectElse: "stay" },
      stayLi: { lines: [{ s: "chan", t: "(from everywhere) — The minister at the blackboard. He's about to fund a generation. Listen first." }] },
      stayWang: { lines: [{ s: "chan", t: "(from everywhere) — The bald man with the koan. Ask him how you make a computer." }] },
      stay: { lines: [{ s: "chan", t: "(from everywhere) — The silhouette, pilgrim. Listen to the silhouette before you wake." }] },
      out: { lines: [{ s: "chan", t: "(from everywhere) — And that is how an island decided to become a chokepoint. Wake up." }],
        endFx: [{ flag: "fb3" }, { flag: "fb_all_done" }, { quest: { id: "island", s: "done" } }, { goto: { s: "starbucks", x: 4, y: 4, f: "left" } }, { mood: "day" }] }
    } },

    /* ===== TRAIN / PARK / HQ ===== */
    train_thoughts: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "Rice fields at 300 km/h. Somewhere west of this window, 110 miles of water. The papers will call it 'tensions' again tomorrow.", r: ["P004_strait"] },
      { s: "inner", t: "“This is my pilgrimage to the Sacred Mountain of Protection.”", v: true, r: ["P001_pilgrim"] }
    ] } } },
    doorman: { start: "a", nodes: { a: { lines: [
      { s: "doorman", t: "No photographs of the facade, please." },
      { s: "inner", t: "They needn't have bothered. “The place is glassy and forgettable… like a ’90s convention center in a small American city, perhaps Charlotte, North Carolina.”", v: true, r: ["P022_charlotte"] }
    ] } } },
    doorman_tour: { start: "a", nodes: { a: { lines: [
      { s: "doorman", t: "They're expecting you. Antechamber's through the side entrance. Mr Kramer is already there, laughing about something." }
    ], endFx: { goto: { s: "ante", x: 2, y: 3, f: "right" } } } } },
    umc_door: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "UMC — the rival across the street. Founded by the man who requires television. Their doormen look equally unimpressed by me." }
    ] } } },
    no_return_tour: { start: "a", nodes: { a: { lines: [{ s: "inner", t: "Not today. Today is the fab. The doorman by the side entrance is waiting." }] } } },
    hq_enter_router: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "tour_day" }, go: "tour" }, { if: { flag: "met_kramer" }, go: "in" }], redirectElse: "no" },
      no: { lines: [{ s: "doorman", t: "Appointments only. And no photographs." }] },
      in: { lines: [], endFx: { goto: { s: "hq", x: 6, y: 10, f: "up" } } },
      tour: { lines: [{ s: "inner", t: "Not the lobby today — the side entrance. The doorman nods toward it." }] }
    } },
    uni_locked: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "A corridor to the university wing. Kramer's rule of order: the chairman first, then the professor who sees God in any scale." }
    ] } } },
    poster_air: { start: "a", nodes: { a: { lines: [
      { s: "sign", t: "A framed conference photo. Jensen Huang, Stanford, 2014, grinning:" },
      { s: "sign", t: "“Basically, there is air—and TSMC.”", v: true, r: ["P016_air"] },
      { s: "inner", t: "Were these chips to vanish, every new iPad, iPhone and Mac would be instantly bricked. Air, and TSMC.", r: ["P016_bricked"] }
    ], fx: [{ insight: "invisible" }] } } },
    ship_look: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "The Yamaha treasure ship, full-rigged, magnificent, sitting where other companies would put a golf trophy.", r: ["P027_lego"] }
    ] } } },
    liu_interview: { start: "a", nodes: {
      a: { lines: [
        { s: "liu", t: "Sit, please. Before questions — look." },
        { s: "inner", t: "“To our interview Liu has brought… a Lego model of TSMC’s showstopping fin field-effect transistor.”", v: true, r: ["P027_lego"] },
        { s: "liu", t: "“We are doing atomic constructions. I tell my engineers, ‘Think like an atomic-sized person.’”", v: true, r: ["P027_atomic"] }
      ], choices: [
        { t: "\"What kind of person survives that work?\"", go: "qualities" },
        { t: "\"Show me how the printing works.\"", go: "process" }
      ] },
      qualities: { lines: [
        { s: "liu", t: "“Two qualities set the TSMC scientists apart: curiosity and stamina.” And — this surprises visitors — “Every scientist must believe in God.”", v: true, r: ["P026_curiosity"] },
        { s: "liu", t: "“It’s the glory of God to conceal matter. But to search out the matter is the glory of men.” Proverbs. The one they use to ennoble mining.", v: true, r: ["P027_proverbs"] },
        { s: "liu", t: "My doctorate was ions shot into silicon — Berkeley, the seventies. The serendipitous ways they behave. Atoms are what God has secreted away.", r: ["P028_berkeley", "P106_corr"] },
        { s: "liu", t: "“There's no way out. You always feel you are scratching the surface. Until, one day, it’s revealed to you.”", v: true, r: ["P028_reveal"] }
      ], fx: [{ insight: "curiosity" }, { insight: "atomic" }], next: "more" },
      process: { lines: [
        { s: "liu", t: "A wafer. A projector craned above it, its lens covered by an inscribed crystal plate. Extreme ultraviolet light through the plate; chemicals etch the pattern; again, and again, dozens of layers; then the chips are cut free.", r: ["P031_process"] },
        { s: "liu", t: "Printmaking. At the scale of atoms." }
      ], fx: [{ insight: "process" }, { insight: "atomic" }], next: "more" },
      more: { lines: [], choices: [
        { t: "\"Will software ever run the fabs alone?\"", go: "lightsout" },
        { t: "\"People call this place the Sacred Mountain—\"", go: "label" }
      ] },
      lightsout: { lines: [
        { s: "liu", t: "One day, perhaps. But there is no 'lights-out' fab yet — no fab that runs without human eyes. Twenty thousand technicians monitor the cycle; a third of everyone here.", r: ["P033_lightsout", "P033_tech"] },
        { s: "liu", t: "“Spotting nano-defects on a chip is like spotting a half-dollar on the moon from your backyard.”", v: true, r: ["P033_moon"] }
      ], fx: [{ insight: "humans_needed" }], next: "labelQ" },
      labelQ: { lines: [], choices: [{ t: "\"People call this place the Sacred Mountain—\"", go: "label" }] },
      label: { lines: [
        { s: "liu", t: "“We represent a collaboration of the globalization era. That label makes us a sore thumb.”", v: true, r: ["P019_liu"] },
        { s: "you", t: "Tooze says your industry is humanity up against the face of God." },
        { s: "liu", t: "“God means nature. We are describing the face of nature at TSMC.”", v: true, r: ["P041_nature"] },
        { s: "inner", t: "Guileless. Expansive. Not one shady molecule. Gladness and singleness of heart — the liturgy phrase surfaces on its own." }
      ], endFx: [{ flag: "liu_done" }, { flag: "liu_met" }] }
    } },
    liu_again: { start: "a", nodes: { a: { lines: [
      { s: "liu", t: "Professor Lin is through the east corridor. Ask him about water. And curiosity. And stamina." }
    ] } } },
    lin_interview: { start: "a", nodes: {
      a: { lines: [
        { s: "inner", t: "“His face is lively and expressive, and he looks and moves like a young Gene Kelly, though he’s 80.”", v: true, r: ["P083_gene"] },
        { s: "lin", t: "So. You want the story of the water. Everyone wants the story of the water. First — the panic." },
        { s: "lin", t: "“It was still possible using the tried system. But I foresaw that at the next node, which was 45 nanometers, we were going to have trouble.”", v: true, r: ["P080_45nm"] },
        { s: "lin", t: "Moore's promise was stalling. Around 2000, everyone had to bet. Pretend it's your money — where does it go?" }
      ], choices: [
        { t: "The calcium-fluoride lens — grow the perfect crystal.", go: "lens" },
        { t: "Wait for extreme ultraviolet to mature.", go: "euv" },
        { t: "…Water? Something about water?", go: "water" }
      ] },
      lens: { lines: [
        { s: "lin", t: "So bet the industry. “Researchers built hundreds of furnaces in which to grow the right crystal, but no method did the trick. Close to a billion dollars went up in smoke.”", v: true, r: ["P081_lens"] },
        { s: "lin", t: "A reported dead end — not a simulation. Try again." }
      ], next: "retry" },
      euv: { lines: [
        { s: "lin", t: "The future, certainly. But the machines could hold ten reliable watts, and production needed two hundred and fifty. Years away — and Moore's clock does not pause.", r: ["P081_euv"] },
        { s: "lin", t: "Try again." }
      ], next: "retry" },
      retry: { lines: [], choices: [
        { t: "The lens.", go: "lens2", if: { notFlag: "___x" } },
        { t: "…Water?", go: "water" }
      ] },
      lens2: { lines: [{ s: "lin", t: "The furnaces are already smoking, pilgrim. Water. Ask me about water." }], next: "retry" },
      water: { lines: [
        { s: "lin", t: "I asked a smaller question: what refracts predictably, behaves, and is already here?" },
        { s: "lin", t: "“He invented a system for keeping water perfectly homogenous, and then he shot the light through it onto the wafer. Bingo… as small as 28 nanometers, eventually with zero defects.”", v: true, r: ["P082_water"] },
        { s: "lin", t: "“Water is a miracle. Not only for TSMC. It's a miracle for the whole of mankind. God is kind to the fish. And also to us.”", v: true, r: ["P082_fish"] },
        { s: "lin", t: "“I see God in any scale. Look at a dog or a tiger—and then look at the food that we eat. It's marvelous. Why? Why is that?”", v: true, r: ["P083_scale"] }
      ], next: "parting" },
      parting: { lines: [
        { s: "you", t: "How do you stay undaunted by problems like these?" },
        { s: "lin", t: "(laughs) “Well, we just have to solve them. That is the TSMC spirit.”", v: true, r: ["P088_spirit"] },
        { s: "lin", t: "The night the next light finally worked, I had a successor. Anthony Yen — he runs research at ASML now. Call him. Ask what ninety watts feels like.", r: ["P084_yen"] },
        { s: "inner", t: "He said 'us' the whole hour. He retired years ago. Still 'us'.", r: ["P089_us"] }
      ], endFx: [{ flag: "lin_done" }, { insight: "water" }, { insight: "moores" }, { quest: { id: "excited", s: "active" } }] }
    } },
    lin_after: { start: "a", nodes: { a: { lines: [
      { s: "lin", t: "“God is very kind to mankind.” Go and see the kindness up close, pilgrim. And call Anthony.", r: ["P087_kind"] }
    ] } } },

    /* ===== HOTEL ===== */
    phone_router: { start: "a", nodes: {
      a: { redirect: [
        { if: { flag: "lin_done", notFlag: "yen_done" }, go: "yen" },
        { if: { flag: "met_kramer", notFlag: "krach2_done" }, go: "krach" }
      ], redirectElse: "idle" },
      idle: { lines: [{ s: "inner", t: "The hotel phone. Beige, patient, slightly sticky. Nobody to call right now." }] },
      yen: { lines: [
        { s: "yen", t: "Anthony Yen. Professor Lin warned me a pilgrim might call. You want October fourteenth." },
        { s: "you", t: "2014. The night extreme ultraviolet worked." },
        { s: "yen", t: "“We always worked late at TSMC.” That evening the ASML team came with new power-source conditions. Reliable at ten watts; we hoped for two-fifty.", v: true, r: ["P085_late", "P085_eureka"] },
        { s: "yen", t: "Close your eyes. I'll talk you through it. You can hold the dial." }
      ], endFx: [{ flag: "yen_prologue" }, { goto: { s: "fb_dial", x: 2, y: 4, f: "right" } }, { mood: "fabnight" }] },
      krach: { lines: [
        { s: "krach", t: "There she is. Seen the mountain yet, or still circling it?" },
        { s: "you", t: "Circling. Tell me the trust story — the one you promised in New York." },
        { s: "krach", t: "“Trust in technology is everything.” I learned that turning DocuSign from a startup into the place people send their most sensitive signatures.", v: true, r: ["P046_trust"] },
        { s: "krach", t: "Height of the pandemic: a small, masked delegation, more than thirty countries — Spain, the Dominican Republic, Cyprus, the UAE — persuading ministers not to bed their networks down with Huawei.", r: ["P048_5g"] },
        { s: "krach", t: "“Huawei was successfully routed.” Though hear the whole score: about 15 percent of chips still originate in China, and their new chip czar commands a trillion-dollar budget.", v: true, r: ["P049_routed", "P049_china"] },
        { s: "you", t: "And the list? Your trust test?" },
        { s: "krach", t: "“Integrity, accountability, transparency, reciprocity, respect for rule of law, respect for the environment, respect for property of all kinds, respect for human rights, respect for sovereign nations, respect for the press. These are things that we have in the free world.”", v: true, r: ["P051_trustlist"] },
        { s: "krach", t: "“Xi is absolutely obsessed with the semiconductor business.” The CHIPS Act — the $280 billion — grew out of our $12 billion deal to bring TSMC to Arizona. States either race Taiwan or ally with it. We chose.", v: true, r: ["P044_xi", "P044_deal", "P043_race"] },
        { s: "krach", t: "One more thing, for your notebook. The man who built all this — Morris Chang? I call him the oracle.", r: ["P071_oracle"] }
      ], endFx: [{ flag: "krach2_done" }, { insight: "cleannet" }, { insight: "oracle" }, { quest: { id: "porcupine", s: "done" } }] }
    } },
    bed_router: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "tourGranted", notFlag: "tour_day" }, go: "night" }], redirectElse: "nap" },
      nap: { lines: [{ s: "inner", t: "Tempting. But the notebook is hungrier than I am tired." }] },
      night: { lines: [
        { s: "inner", t: "“The night before my tour of the fabs, I take a Covid test and lay out respectable work clothes alongside two new black N-95s… I hallucinate two red lines from across the room, but no, no Covid.”", v: true, r: ["P076_covid"] }
      ], choices: [
        { t: "Stare at the test anyway.", go: "stare" },
        { t: "〜 Chabuduo. One line is one line.", chab: true, go: "chab", if: { flag: "learned_chabuduo" } }
      ] },
      stare: { lines: [{ s: "inner", t: "One line. One. Sleep now, pilgrim." }], next: "knock" },
      chab: { lines: [{ s: "inner", t: "Close enough to healthy. The word works even at 1 a.m." }], next: "knock" },
      knock: { lines: [
        { s: "inner", t: "A knock. The porter, beaming, wheeling in —" },
        { s: "inner", t: "“Then, suddenly, my tour of Fab 12A… is on the calendar. My luggage even arrives.”", v: true, r: ["P057_giga"] },
        { s: "inner", t: "The Samsonite. The books. The night before the mountain, the war gives my library back." }
      ], endFx: [{ flag: "luggage_back" }, { item: "samsonite" }, { item: "n95" }, { quest: { id: "luggage", s: "done" } }, { cutscene: "morning" }] }
    } },
    desk_notes: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "The notebook, spread open. Three pillars: the island, the litho, the stakes. (Press N — every entry carries its ¶ receipt.)" }
    ] } } },
    case_back: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "The Samsonite, home from its war. Chip War, slightly humidified. Hirschman, intact. The passions and the interests, reunited." }
    ] } } },

    /* ===== 2014 FLASHBACK ===== */
    fb_dial_yen: { start: "a", nodes: { a: { lines: [
      { s: "yen", t: "(voice on the line) — That's me by the machine, ten years younger. ASML's people across the aisle. Ten reliable watts on the source. We hoped for two hundred and fifty." },
      { s: "yen", t: "Take the dial. Bring it up. Steady — steadier than that." }
    ], endFx: { minigame: "dial" } } } },
    fb_dial_after: { start: "a", nodes: { a: { lines: [
      { s: "yen", t: "Ninety watts. NINETY. “This was the eureka moment.” If it holds nine times over, the tripling is inevitable —", v: true, r: ["P085_eureka"] },
      { s: "yen", t: "“I was euphoric. I was on drugs. For the believer, it is quite a religious experience.”", v: true, r: ["P086_drugs"] },
      { s: "inner", t: "He couldn't stay to watch it reach 250. He ran out of the fab flinging off his bunny suit. Today the transistors are just over two nanometres — the smallest in the world — in production since 2025.", r: ["P086_2nm"] },
      { s: "yen", t: "(present-day, on the phone, quieter) — Fifty-six thousand patents in that house. Curiosity and stamina, like the chairman says. Sleep well, pilgrim.", r: ["P075_patents"] }
    ], endFx: [{ flag: "yen_done" }, { insight: "eureka" }, { quest: { id: "excited", s: "done" } }, { quest: { id: "water", s: "done" } }, { goto: { s: "hotel", x: 7, y: 5, f: "down" } }, { mood: "dim" }] } } },

    /* ===== ACT 3 — ANTECHAMBER & FAB ===== */
    kramer_ante: { start: "a", nodes: { a: { lines: [
      { s: "kramer", t: "(laughing) Look at you. Neo. Or the everyman in Pilgrim's Progress.", r: ["P090_neo"] },
      { s: "kramer", t: "Turnstile, then the hand-wash — it does all three steps itself, wash, rinse, dry. Then the orderlies gown you. I'll be right behind." },
      { s: "kramer", t: "And pilgrim — try not to sneeze in there. Glittering electrons everywhere, like— actually, read your own notebook later.", r: ["P056_sneeze"] }
    ] } } },
    turnstile: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "“I swish through a turnstile entrance that brings to mind The Phantom Tollbooth… and I’m deposited before a kind of human car wash for dramatic personal ablutions.”", v: true, r: ["P092_tollbooth"] }
    ], fx: [{ flag: "turnstiled" }] } } },
    wash_intro: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "One machine. Three rites. Hands in." }
    ], endFx: { minigame: "wash" } } } },
    wash_after: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "Washed, rinsed, dried by a single benevolent appliance. Even the hand-washing room's air is extraterrestrially clean.", r: ["P094_dust"] }
    ] } } },
    gowning_wait: { start: "a", nodes: { a: { lines: [
      { s: "orderly", t: "Turnstile and wash first, please. The suit comes last. Order is the whole point of this room." }
    ] } } },
    gowning: { start: "a", nodes: { a: { lines: [
      { s: "orderly", t: "Your size, as measured. Arms up. Hood. Booties last — hold still." },
      { s: "inner", t: "“To have a white-clad figure at my feet carefully adjusting the booties feels tender, somehow… Our bodies are not quite here.”", v: true, r: ["P093_tender"] },
      { s: "orderly", t: "Mask sealed. Glasses. There. Go and see it." }
    ], endFx: [{ outfit: "bunny" }, { item: "bunny" }, { flag: "gowned" }] } } },
    ante_not_ready: { start: "a", nodes: { a: { lines: [
      { s: "orderly", t: "Not in street clothes. The rites, in order: turnstile, wash, gown." }
    ] } } },
    fab_enterlight: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "“Ordinary air can have up to 1 million particles of dust per cubic meter. The fabs and cleaning rooms have no more than 100. As I step into the fab at last, I can tell at once it’s the cleanest air I have ever inhaled.”", v: true, r: ["P094_dust"] },
      { s: "inner", t: "“The vast room is bright and clear… near death and clinical-heavenly.”", v: true, r: ["P095_light"] }
    ], fx: [{ quest: { id: "face", s: "active" } }] } } },
    fab_guide: { start: "a", nodes: { a: { lines: [
      { s: "orderly", t: "Walk slowly. Touch nothing. Time behaves differently in here — you'll see." }
    ] } } },
    fab_machines: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "“The white humming machines are featureless, and thick hermetic glass stands between me and the fathomless nano-processes that I couldn’t have perceived with my crude pupils anyway.”", v: true, r: ["P099_hum"] },
      { s: "inner", t: "“What a wonderfully human folly, to try to create immaculateness.”", v: true, r: ["P096_folly"] }
    ] } } },
    fab_litho: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "The lithography machine. The light that prints the world, shot once through Lin's miracle water, now held at power Yen ran from in joy." },
      { s: "inner", t: "“At the sight of the lithography machine, my eyes mist. Oil, salt, water—human emotions are shameful contaminants. But I can’t help it.”", v: true, r: ["P097_mist"] }
    ] } } },
    fab_incubators: { start: "a", nodes: { a: { lines: [
      { s: "inner", t: "“It dawns on me at once that the machines resemble incubators in a neonatal intensive care unit.”", v: true, r: ["P100_incu"] },
      { s: "inner", t: "“…They are utterly dependent on adults who cherish them for their extraordinary smallness and cosmic potential. What’s present here is preciousness. To see the fabs is to feel a full-body urge to keep the tiny marvelous creations—newborns—and then humanity as a whole—alive.”", v: true, r: ["P101_souls"] },
      { s: "inner", t: "Blake, from nowhere and everywhere: To see a World in a Grain of Sand. That's what we're here for.", r: ["P087_blake"] }
    ], fx: [{ flag: "saw_incubators" }] } } },
    fab_exit_router: { start: "a", nodes: {
      a: { redirect: [{ if: { flag: "saw_incubators" }, go: "out" }], redirectElse: "stay" },
      stay: { lines: [{ s: "inner", t: "Not yet. The far machines — the ones like cradles. See them first." }] },
      out: { lines: [{ s: "inner", t: "An orderly taps her wrist, apologetically. Outside is still there, apparently. It can wait one more minute." }],
        endFx: { cutscene: "ending" } }
    } },
    liu_farewell: { start: "a", nodes: { a: { lines: [
      { s: "liu", t: "So. You beheld it. And now you will write about us, and the label will follow — the Mountain, the shield. Remember what I told you: a collaboration of the globalization era.", r: ["P019_liu"] },
      { s: "you", t: "What do you hope for? Honestly." },
      { s: "liu", t: "“I hope the bad guys will get their penalty. And I hope the righteous… human collaboration will continue.”", v: true, r: ["P103_liu"] },
      { s: "liu", t: "“God made silicon for us.” Second most abundant element in the crust. The universe was generous with the raw material. The rest was curiosity. And stamina.", v: true, r: ["P104_silicon"] }
    ] } } },
    kramer_farewell: { start: "a", nodes: { a: { lines: [
      { s: "kramer", t: "Well, pilgrim? Worth three refusals?" },
      { s: "you", t: "Worth thirty." },
      { s: "kramer", t: "(grins) Go write it, then. And when your editors ask what TSMC is like — tell them about the Burger King discount. Keeps us humble." },
      { s: "inner", t: "A good hang, Kramer. The article will say exactly that.", r: ["P036_hang"] }
    ] } } },

    /* misc */
    hq_poster_dup: { start: "a", nodes: { a: { lines: [] } } }
  };

  /* ---------------- cutscenes ---------------- */
  const cutscenes = {
    opening: [
      { card: "NEW YORK — the night before the flight" },
      { dialog: "ny_open" }
    ],
    flight: [
      { fadeOut: true },
      { card: "“…just under 18 hallucinatory hours at the back of a packed 777.”" },
      { card: "TAOYUAN INTERNATIONAL — Taipei" },
      { goto: { s: "airport", x: 4, y: 7, f: "right" } },
      { fadeIn: true },
      { dialog: "air_open" }
    ],
    granted: [
      { fadeOut: true },
      { card: "That evening, at the hotel —" },
      { goto: { s: "hotel", x: 5, y: 5, f: "down" } },
      { fadeIn: true },
      { fx: { flag: "granted_evening" } }
    ],
    morning: [
      { fadeOut: true },
      { card: "MORNING — TOUR DAY" },
      { card: "“The moment has come. I’m Neo now, or the everyman in Pilgrim’s Progress, stepping into my destiny.”" },
      { fx: [{ flag: "tour_day" }] },
      { goto: { s: "park", x: 6, y: 8, f: "right" } },
      { fadeIn: true }
    ],
    ending: [
      { fadeOut: true },
      { card: "“A saying at TSMC is that time flies in the fabs. It’s true. We’re inside for an hour, but it feels like 20 minutes.”" },
      { goto: { s: "hq", x: 10, y: 4, f: "down" } },
      { fadeIn: true },
      { dialog: "liu_farewell" },
      { dialog: "kramer_farewell" },
      { fadeOut: true },
      { card: "Dusk. The street again. The island hums beneath its umbrella of light." },
      { card: "“…we have also created a universe inside our universe… enlightened with ultraviolet and built on sand.”" },
      { fx: [{ quest: { id: "face", s: "done" } }, { quest: { id: "main", s: "done" } }, { epilogue: true }] }
    ]
  };

  const minigameFx = {
    dial: { dialog: "fb_dial_after" },
    wash: [{ flag: "washed" }, { dialog: "wash_after" }]
  };

  /* ---------------- about & stats ---------------- */
  const aboutWhat = "CHOKEPOINT is a research demonstrator by Kita — demonstrator №1 of PressPlay, an engine that turns journalism into playable experiences. This narrative RPG was generated from a single article through a documented pipeline (analysis → format selection → constrained generation → provenance), with a human editor in the loop. The 2D-RPG format was an editorial override after playtesting a strategy-game format of the same story model — both formats ship, as evidence the engine's templates are interchangeable.";
  const aboutRules = [
    ["Receipts (¶)", "Lines marked ¶ are verbatim from the article; tap the chip to read the exact sentence with attribution. Notebook entries carry receipts too."],
    ["Real people", "Characters are dramatised from the article's own reporting and descriptions. Unmarked lines are connective tissue asserting only what the article attributes to that person — no invented positions."],
    ["The protagonist", "You retrace the journey the author reports. Your inner voice quotes her narration — marked ¶ wherever verbatim."],
    ["The unnamed threat", "Like the article, the game never names the threat in narration; it appears only as the article's own euphemism and quoted deterrence logic. No conflict is simulated."],
    ["Corrections", "The article's published correction (the chairman's doctorate: UC Berkeley) is honoured in the notebook."]
  ];
  const aboutWhatWasReal = "Every ¶-marked line is a verbatim quote; every notebook entry cites paragraph-level receipts; the people, places, refusals, lost luggage, water, watts, umbrellas and Burger King discount are all from the reporting. Unmarked dialogue is dramatised connective tissue under the rules above — see About, or the full pipeline dossier.";
  const engineLine = "PressPlay demonstrator №1 — an engine that turns journalism into playable experiences · Kita";

  const startScene = { s: "ny", x: 5, y: 5, f: "down" };

  /* stats: count verbatim lines */
  let verbatim = 0;
  Object.values(dialogs).forEach((d) => Object.values(d.nodes).forEach((n) => (n.lines || []).forEach((l) => { if (l.v) verbatim++; })));
  const stats = { verbatim };

  return { article, cast, receipts, insights, pillarGoals, quests, items, dialogs, cutscenes, minigameFx, aboutWhat, aboutRules, aboutWhatWasReal, engineLine, startScene, stats };
})();
