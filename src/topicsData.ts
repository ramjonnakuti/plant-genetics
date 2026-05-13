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
  whatTheyDo: string;
};

export const plantJobs: PlantJob[] = [
  {
    title: "Farmer",
    emoji: "🚜",
    whatTheyDo: "Grows food plants.",
  },
  {
    title: "Gardener",
    emoji: "🌷",
    whatTheyDo: "Plants and trims flowers and grass.",
  },
  {
    title: "Florist",
    emoji: "💐",
    whatTheyDo: "Makes flower sets for shops and events.",
  },
  {
    title: "Plant scientist",
    emoji: "🔬",
    whatTheyDo: "Studies how plants grow.",
  },
  {
    title: "Forest worker",
    emoji: "🌲",
    whatTheyDo: "Helps keep forests safe.",
  },
  {
    title: "Plant grower",
    emoji: "🪴",
    whatTheyDo: "Grows many young plants to sell.",
  },
  {
    title: "Seed maker",
    emoji: "🧬",
    whatTheyDo: "Makes new plant kinds.",
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
