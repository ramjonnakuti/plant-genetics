import type { PlantProfile } from "./plantTypes";
import { extraPlantProfiles } from "./extraPlantProfiles";

function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/\s+/g, " ");
}

const corePlantProfiles: PlantProfile[] = [
  {
    id: "monstera",
    names: ["monstera", "swiss cheese plant", "swiss cheese"],
    displayName: "Monstera",
    variety: "House plants",
    emoji: "🌿",
    tagline: "Big green plant with leaf holes.",
    coolFacts: [
      "New leaves are smooth.",
      "Older leaves get cuts and holes.",
      "It can climb in the wild.",
    ],
    whatMakesItSpecial: "Its big leaves look bold and cool in a room.",
    careNote: "Give bright light, but not hot sun. Let soil dry a bit before water.",
  },
  {
    id: "pothos",
    names: ["pothos", "devils ivy", "devil's ivy", "golden pothos"],
    displayName: "Pothos",
    variety: "House plants",
    emoji: "💚",
    tagline: "Easy vine that grows fast.",
    coolFacts: ["It can hang down.", "It can climb up a pole.", "It roots fast in water."],
    whatMakesItSpecial: "It is one of the easiest plants to keep alive.",
    careNote: "Water when top soil is dry.",
  },
  {
    id: "snake-plant",
    names: ["snake plant", "snakeplant", "mother in laws tongue", "mother-in-laws tongue", "sansevieria"],
    displayName: "Snake plant",
    variety: "House plants",
    emoji: "🐍",
    tagline: "Tall stiff leaves that stand up.",
    coolFacts: ["It stores water.", "It grows slow.", "It does well in many rooms."],
    whatMakesItSpecial: "It looks clean and neat, and needs little care.",
    careNote: "Do not water too much.",
  },
  {
    id: "sunflower",
    names: ["sunflower", "sun flower", "sunflowers"],
    displayName: "Sunflower",
    variety: "Flowers",
    emoji: "🌻",
    tagline: "Tall flower with a big face.",
    coolFacts: ["Some young plants turn to the sun.", "The center has many tiny flowers.", "Seeds can be eaten."],
    whatMakesItSpecial: "It is bright, tall, and loved by bees.",
    careNote: "Give full sun and deep water.",
  },
  {
    id: "venus-flytrap",
    names: ["venus flytrap", "venus fly trap", "flytrap", "fly trap"],
    displayName: "Venus flytrap",
    variety: "Unusual plants",
    emoji: "🪤",
    tagline: "Plant that snaps on bugs.",
    coolFacts: ["It closes fast.", "It eats small bugs.", "It grows in wet sunny bogs."],
    whatMakesItSpecial: "It is one of the few plants that moves fast.",
    careNote: "Use rain or clean water. Do not feed it meat.",
  },
  {
    id: "cactus",
    names: ["cactus", "cacti", "cactuses"],
    displayName: "Cactus",
    variety: "Succulents and cacti",
    emoji: "🌵",
    tagline: "Spiky plant made for dry lands.",
    coolFacts: ["Spines help protect it.", "It stores water in the stem.", "Many cacti have big flowers."],
    whatMakesItSpecial: "It can live where rain is rare.",
    careNote: "Use gloves for sharp spines.",
  },
  {
    id: "succulent",
    names: ["succulent", "succulents", "echeveria", "jade plant", "jade"],
    displayName: "Succulent",
    variety: "Succulents and cacti",
    emoji: "🪴",
    tagline: "Small thick-leaf plant.",
    coolFacts: ["Leaves hold water.", "Many make a rose shape.", "Some turn red at leaf tips."],
    whatMakesItSpecial: "It is cute, small, and easy for desks.",
    careNote: "Needs bright light and dry soil between waterings.",
  },
  {
    id: "bamboo",
    names: ["bamboo", "lucky bamboo"],
    displayName: "Bamboo",
    variety: "Trees",
    emoji: "🎋",
    tagline: "Fast grass that can grow very tall.",
    coolFacts: ["Bamboo is grass.", "Some kinds grow very fast.", "People use it to build many things."],
    whatMakesItSpecial: "It is strong and grows fast.",
    careNote: "\"Lucky bamboo\" from shops is often a different plant.",
  },
  {
    id: "oak",
    names: ["oak", "oak tree", "oaks"],
    displayName: "Oak tree",
    variety: "Trees",
    emoji: "🌳",
    tagline: "Big tree that lives a long time.",
    coolFacts: ["It makes acorns.", "Many animals eat acorns.", "Some oaks live for many years."],
    whatMakesItSpecial: "It gives shade and food to many animals.",
    careNote: "Be safe around tall trees and tools.",
  },
  {
    id: "maple",
    names: ["maple", "maple tree", "sugar maple"],
    displayName: "Maple tree",
    variety: "Trees",
    emoji: "🍁",
    tagline: "Tree with bright fall leaves.",
    coolFacts: ["Its seeds spin like little wings.", "Some maples give sap for syrup.", "Leaves have clear points."],
    whatMakesItSpecial: "Its fall colors are very bright.",
    careNote: "Syrup making uses hot tools and pots.",
  },
  {
    id: "pine",
    names: ["pine", "pine tree", "pines", "evergreen"],
    displayName: "Pine tree",
    variety: "Trees",
    emoji: "🌲",
    tagline: "Tree with needles and cones.",
    coolFacts: ["It stays green in winter.", "It makes cones.", "It smells fresh from sticky sap."],
    whatMakesItSpecial: "It stays green when many trees lose leaves.",
    careNote: "Sap is sticky. Keep it off clothes and hair.",
  },
  {
    id: "rose",
    names: ["rose", "roses", "rose bush"],
    displayName: "Rose",
    variety: "Flowers",
    emoji: "🌹",
    tagline: "Flower with soft petals and sharp points.",
    coolFacts: ["Roses come in many colors.", "Some roses smell very sweet.", "After bloom, many make rose hips."],
    whatMakesItSpecial: "It is one of the most famous flowers in the world.",
    careNote: "Wear gloves when you trim.",
  },
  {
    id: "tulip",
    names: ["tulip", "tulips"],
    displayName: "Tulip",
    variety: "Flowers",
    emoji: "🌷",
    tagline: "Spring flower from a bulb.",
    coolFacts: ["It grows from a bulb under soil.", "It blooms in spring.", "It has many bright colors."],
    whatMakesItSpecial: "Large tulip beds look like a sea of color.",
    careNote: "In many places, plant bulbs in fall.",
  },
  {
    id: "orchid",
    names: ["orchid", "orchids", "phalaenopsis", "moth orchid"],
    displayName: "Orchid",
    variety: "Flowers",
    emoji: "🦋",
    tagline: "Flower with many shapes and colors.",
    coolFacts: ["There are many orchid types.", "Vanilla comes from an orchid.", "Some orchids grow on trees."],
    whatMakesItSpecial: "It looks fancy and can bloom for a long time.",
    careNote: "Do not keep roots too wet.",
  },
  {
    id: "fern",
    names: ["fern", "ferns", "boston fern"],
    displayName: "Fern",
    variety: "House plants",
    emoji: "🌿",
    tagline: "Soft green plant with many leaf parts.",
    coolFacts: ["Young leaves uncurl as they grow.", "Ferns are very old plants.", "Many like shade and damp air."],
    whatMakesItSpecial: "It gives a soft forest look indoors or out.",
    careNote: "Keep soil a bit damp, not soaked.",
  },
  {
    id: "strawberry",
    names: ["strawberry", "strawberries"],
    displayName: "Strawberry",
    variety: "Food and herbs",
    emoji: "🍓",
    tagline: "Sweet red fruit plant.",
    coolFacts: ["Seeds are on the outside.", "It sends out runners.", "It likes sun and rich soil."],
    whatMakesItSpecial: "Fresh berries from a plant taste great.",
    careNote: "Wash fruit before eating.",
  },
  {
    id: "tomato",
    names: ["tomato", "tomatoes"],
    displayName: "Tomato",
    variety: "Food and herbs",
    emoji: "🍅",
    tagline: "Garden plant with juicy fruit.",
    coolFacts: ["There are many tomato sizes.", "Some are red, yellow, or purple.", "Plants can grow very tall with support."],
    whatMakesItSpecial: "One plant can give lots of fruit in one season.",
    careNote: "Eat ripe fruit only.",
  },
  {
    id: "banana-plant",
    names: ["banana", "banana plant", "banana tree"],
    displayName: "Banana plant",
    variety: "Food and herbs",
    emoji: "🍌",
    tagline: "Big tropical plant with huge leaves.",
    coolFacts: ["It is not a true tree.", "It likes heat.", "Fruit grows in large bunches."],
    whatMakesItSpecial: "It grows fast and looks bold.",
    careNote: "Needs warm weather or a greenhouse.",
  },
  {
    id: "lavender",
    names: ["lavender"],
    displayName: "Lavender",
    variety: "Flowers",
    emoji: "💜",
    tagline: "Purple plant with a calm smell.",
    coolFacts: ["Bees like it.", "It likes lots of sun.", "It does best in soil that drains fast."],
    whatMakesItSpecial: "It adds both color and scent.",
    careNote: "Do not keep roots wet for long.",
  },
  {
    id: "mint",
    names: ["mint", "peppermint", "spearmint"],
    displayName: "Mint",
    variety: "Food and herbs",
    emoji: "🌱",
    tagline: "Fast herb with cool smell.",
    coolFacts: ["Leaves smell fresh.", "It can spread fast.", "It is used in tea and food."],
    whatMakesItSpecial: "It grows fast and is easy to use in the kitchen.",
    careNote: "Grow in a pot so it does not take over.",
  },
  {
    id: "aloe",
    names: ["aloe", "aloe vera", "alovera"],
    displayName: "Aloe vera",
    variety: "Succulents and cacti",
    emoji: "🧴",
    tagline: "Thick leaf plant with clear gel.",
    coolFacts: ["Leaves hold water.", "It likes bright light.", "It has a spiky star shape."],
    whatMakesItSpecial: "Its gel is known in home care.",
    careNote: "Try a small skin spot first.",
  },
  {
    id: "spider-plant",
    names: ["spider plant", "spiderplant", "chlorophytum"],
    displayName: "Spider plant",
    variety: "House plants",
    emoji: "🕷️",
    tagline: "Plant with long leaves and baby plants.",
    coolFacts: ["It makes baby plants on long stems.", "It grows fast.", "It is easy for beginners."],
    whatMakesItSpecial: "You can share baby plants with friends.",
    careNote: "Trim brown tips if they show up.",
  },
  {
    id: "peace-lily",
    names: ["peace lily", "peacelily", "spathiphyllum"],
    displayName: "Peace lily",
    variety: "House plants",
    emoji: "🤍",
    tagline: "Indoor plant with white blooms.",
    coolFacts: ["It can droop when thirsty.", "It can perk up after water.", "It likes bright shade."],
    whatMakesItSpecial: "It gives clean white blooms indoors.",
    careNote: "Keep away from pets that chew leaves.",
  },
  {
    id: "dandelion",
    names: ["dandelion", "dandy lion", "dandylion"],
    displayName: "Dandelion",
    variety: "Flowers",
    emoji: "🌼",
    tagline: "Yellow flower that turns to a puff ball.",
    coolFacts: ["Seeds blow in wind.", "Bees visit early flowers.", "It grows in many places."],
    whatMakesItSpecial: "It is small but very strong.",
    careNote: "Do not eat from sprayed lawns.",
  },
  {
    id: "corn",
    names: ["corn", "maize", "sweet corn"],
    displayName: "Corn (maize)",
    variety: "Food and herbs",
    emoji: "🌽",
    tagline: "Tall grass with ears of kernels.",
    coolFacts: ["Each silk links to one kernel.", "Wind helps pollinate.", "Popcorn is a corn type."],
    whatMakesItSpecial: "Corn feeds many people and animals.",
    careNote: "Hot oil for popcorn needs care.",
  },
  {
    id: "clover",
    names: ["clover", "clovers", "four leaf clover", "four-leaf clover"],
    displayName: "Clover",
    variety: "Lawns and meadows",
    emoji: "☘️",
    tagline: "Low green plant with small leaves.",
    coolFacts: ["Most leaves have three parts.", "Four-leaf ones are rare.", "Bees like clover flowers."],
    whatMakesItSpecial: "It helps soil and gives bee food.",
    careNote: "Step gently in bee areas.",
  },
];

export const plantProfiles: PlantProfile[] = [...corePlantProfiles, ...extraPlantProfiles];

export type { PlantProfile } from "./plantTypes";

export function findPlantByName(input: string): PlantProfile | null {
  const q = normalize(input);
  if (!q) return null;

  for (const p of plantProfiles) {
    for (const n of p.names) {
      if (q === n) return p;
    }
  }

  let best: PlantProfile | null = null;
  let bestScore = 0;

  for (const p of plantProfiles) {
    for (const n of p.names) {
      if (q.includes(n) || n.includes(q)) {
        const score = Math.min(Math.max(n.length, 2), 40);
        if (score > bestScore) {
          bestScore = score;
          best = p;
        }
      }
    }
  }

  const tokens = q.split(" ").filter((t) => t.length > 1);
  for (const p of plantProfiles) {
    for (const n of p.names) {
      for (const tok of tokens) {
        if (tok.length >= 3 && (n.startsWith(tok) || n.includes(tok))) {
          const score = tok.length + 1;
          if (score > bestScore) {
            bestScore = score;
            best = p;
          }
        }
      }
    }
  }

  return best;
}

export type PlantExampleGroup = {
  variety: string;
  names: string[];
};

/**
 * Short list for the Examples modal: everyday names only (no Latin or Wikipedia titles).
 */
export function simpleExampleGroupsForModal(): PlantExampleGroup[] {
  return [
    {
      variety: "Food plants",
      names: ["Tomato", "Strawberry", "Mint"],
    },
    {
      variety: "House plants",
      names: ["Monstera", "Snake plant", "Pothos"],
    },
    {
      variety: "Flowers and trees",
      names: ["Sunflower", "Rose", "Oak tree"],
    },
  ];
}
