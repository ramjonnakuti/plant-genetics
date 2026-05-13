/** Simple prices and steps. */

export type PriceExample = {
  item: string;
  about: string;
  note: string;
};

export const priceExamples: PriceExample[] = [
  {
    item: "Seed pack",
    about: "About $2-6",
    note: "One pack can grow many plants.",
  },
  {
    item: "Small herb plant",
    about: "About $4-9",
    note: "Mint and basil are common.",
  },
  {
    item: "Medium house plant",
    about: "About $15-35",
    note: "Price changes by store.",
  },
  {
    item: "Big plant with pot",
    about: "About $50-150+",
    note: "Big plants and nice pots cost more.",
  },
  {
    item: "Bag of soil",
    about: "About $6-18",
    note: "Big bags are often a better deal.",
  },
  {
    item: "Hand tool",
    about: "About $8-25",
    note: "You can borrow tools to save money.",
  },
];

export type PlantJob = {
  title: string;
  emoji: string;
  /** One short line. */
  whatTheyDo: string;
  /** Extra story for the demo—plain words. */
  moreAboutTheJob: string;
  /** Rounded U.S.-style pay band for class talks (not a promise). */
  salaryBand: string;
  salaryNote: string;
  /** School path in simple words. */
  education: string;
  /** Skills, licenses, or habits that often matter. */
  requirements: string[];
};

export const plantJobs: PlantJob[] = [
  {
    title: "Farmer",
    emoji: "🚜",
    whatTheyDo: "Grows food plants and cares for fields and animals on a farm.",
    moreAboutTheJob:
      "They plan what to plant, watch the weather, fix equipment, sell crops, and keep soil healthy. Days can start very early and include heavy lifting.",
    salaryBand: "About $30,000 to $120,000+ per year in the U.S.",
    salaryNote:
      "Pay swings a lot: a new farm helper is not the same as an experienced farm owner. State and crop type change the numbers.",
    education:
      "Many people learn on the job. Some study agriculture in high school classes, 4-H, FFA, or college. Business classes help if you run your own farm.",
    requirements: [
      "Stamina for long hours outdoors",
      "Driver's license (often)",
      "Basic math for measuring seed, feed, or chemicals",
      "Safety training for tractors, tools, and heat",
    ],
  },
  {
    title: "Gardener",
    emoji: "🌷",
    whatTheyDo: "Plants flowers and shrubs, mows, edges, and keeps yards and parks neat.",
    moreAboutTheJob:
      "They may work for a landscaping company, a city parks crew, or private homes. The job mixes design ideas with shovel-and-rake work in sun or rain.",
    salaryBand: "About $32,000 to $55,000 per year in the U.S.",
    salaryNote: "Cities with high living costs may pay more; entry helpers often start lower.",
    education:
      "High school diploma is common. Short certificates in horticulture or landscaping help. Some gardeners learn everything from a mentor at work.",
    requirements: [
      "Can lift bags of soil or mulch",
      "Knows (or learns) plant names and simple pruning",
      "Teamwork and showing up on time",
      "Sometimes a pesticide applicator license if spraying weeds",
    ],
  },
  {
    title: "Florist",
    emoji: "💐",
    whatTheyDo: "Cuts fresh flowers and builds bouquets, centerpieces, and event decorations.",
    moreAboutTheJob:
      "They order blooms, strip leaves, wire stems, keep coolers cold, and talk kindly with customers about colors and budgets.",
    salaryBand: "About $28,000 to $48,000 per year in the U.S.",
    salaryNote: "Weddings and holidays can mean busy weeks with extra hours or tips.",
    education:
      "On-the-job training is typical. Design classes, workshops, or a floral certificate can speed you up.",
    requirements: [
      "Gentle hands for delicate petals",
      "Counting change and reading order forms",
      "Standing on your feet most of the day",
      "Cold rooms—dress in layers",
    ],
  },
  {
    title: "Plant scientist",
    emoji: "🔬",
    whatTheyDo: "Runs tests and studies to learn how plants grow, fight disease, or make more food.",
    moreAboutTheJob:
      "They may work in a lab, greenhouse, or field trial. They record data, write reports, and sometimes teach others what they learned.",
    salaryBand: "About $48,000 to $95,000+ per year in the U.S.",
    salaryNote: "Higher degrees and years of experience usually raise pay. Government, seed companies, and universities differ.",
    education:
      "Usually a four-year college degree in biology, plant science, genetics, or agriculture. Many roles want a master's or Ph.D.",
    requirements: [
      "Careful notebook habits and curiosity",
      "Comfort with microscopes, pipettes, or field plots",
      "Team projects and clear writing",
      "Lab safety rules (goggles, gloves, labels)",
    ],
  },
  {
    title: "Forest worker",
    emoji: "🌲",
    whatTheyDo: "Plants seedlings, marks timber, fights wildfire risk, and keeps public forests healthy.",
    moreAboutTheJob:
      "They hike rough ground, use chainsaws or hand tools with training, and follow maps so the right trees are protected or harvested.",
    salaryBand: "About $38,000 to $62,000 per year in the U.S.",
    salaryNote: "Wildfire season or overtime can change yearly income. Federal, state, or private employers pay differently.",
    education:
      "High school plus agency training is common. Degrees in forestry, ecology, or wildland fire science open more doors.",
    requirements: [
      "Physical fitness and love of the outdoors",
      "Wilderness first aid or fire certifications for some crews",
      "GPS and map reading",
      "Strict safety culture around fire and saws",
    ],
  },
  {
    title: "Plant grower",
    emoji: "🪴",
    whatTheyDo: "Raises thousands of baby plants in greenhouses or nurseries until stores can sell them.",
    moreAboutTheJob:
      "They mix soil, water on a schedule, scout for bugs, transplant pots, and load trucks. Timing matters so shelves look full in spring.",
    salaryBand: "About $30,000 to $46,000 per year in the U.S.",
    salaryNote: "Greenhouse managers with years of experience can earn more.",
    education:
      "Hands-on training is huge. Classes in greenhouse management, pest ID, or irrigation systems are a plus.",
    requirements: [
      "Attention to watering schedules",
      "Heat tolerance inside humid houses",
      "Forklift or delivery help at some sites",
      "Teamwork during big shipping weeks",
    ],
  },
  {
    title: "Seed maker",
    emoji: "🧬",
    whatTheyDo: "Breeds or tests new plant varieties so crops resist pests, use water well, or taste great.",
    moreAboutTheJob:
      "They cross plants, track traits across seasons, keep careful records, and follow laws about field trials and safety.",
    salaryBand: "About $55,000 to $100,000+ per year in the U.S.",
    salaryNote: "Big seed companies and universities pay different mixes of salary and research funding.",
    education:
      "Usually a bachelor's degree in plant breeding, genetics, or agronomy; many breeders also have graduate school.",
    requirements: [
      "Patience for seasons-long experiments",
      "Statistics or data sheets",
      "Understanding regulations around trials",
      "Clear communication with farmers and labs",
    ],
  },
];

export type SeedStep = {
  step: number;
  emoji: string;
  title: string;
  text: string;
};

export const seedToPlantSteps: SeedStep[] = [
  {
    step: 1,
    emoji: "🫘",
    title: "Start as a seed",
    text: "A seed has a baby plant and food inside.",
  },
  {
    step: 2,
    emoji: "💧",
    title: "Water goes in",
    text: "Water wakes the seed and makes it swell.",
  },
  {
    step: 3,
    emoji: "🌱",
    title: "Root comes out",
    text: "The first root goes down into soil.",
  },
  {
    step: 4,
    emoji: "⬆️",
    title: "Stem goes up",
    text: "The stem goes up to find light.",
  },
  {
    step: 5,
    emoji: "☘️",
    title: "First leaves open",
    text: "Small leaves open and help growth.",
  },
  {
    step: 6,
    emoji: "☀️",
    title: "Plant makes food",
    text: "Leaves use sun, water, and air to make food.",
  },
  {
    step: 7,
    emoji: "🌳",
    title: "Full plant",
    text: "The plant gets big and can make new seeds.",
  },
];
