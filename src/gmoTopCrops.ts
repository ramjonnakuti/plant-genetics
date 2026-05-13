/**
 * Ten widely known genetically engineered farm crops (global examples).
 * Images: Wikipedia REST `thumbnail` URLs (Commons). For class demos only—not crop advice.
 */
export type GmoTopCrop = {
  name: string;
  howGmoHelped: string;
  imageUrl: string;
  wikiArticle: string;
};

export const gmoTopTenCrops: GmoTopCrop[] = [
  {
    name: "Soybean",
    howGmoHelped:
      "Many farm soybeans were changed so farmers can control tough weeds with spray without killing the bean plants—less plowing in some places.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Soybean.USDA.jpg/330px-Soybean.USDA.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Soybean",
  },
  {
    name: "Corn (maize)",
    howGmoHelped:
      "Some corn makes a natural worm-fighting protein so earworms do less damage. That can mean fewer bug sprays on those fields.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg/330px-Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Maize",
  },
  {
    name: "Cotton",
    howGmoHelped:
      "Cotton bolls used to get wrecked by caterpillars. Bt cotton helps the plant fight those pests so farmers can grow fiber with less spray on some farms.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CottonPlant.JPG/330px-CottonPlant.JPG",
    wikiArticle: "https://en.wikipedia.org/wiki/Cotton",
  },
  {
    name: "Canola (oilseed rape)",
    howGmoHelped:
      "Engineered canola often tolerates a weed spray so farmers can clear weeds around the crop and still harvest lots of tiny oil-rich seeds.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Brassica_napus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-169.jpg/330px-Brassica_napus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-169.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Brassica_napus",
  },
  {
    name: "Sugar beet",
    howGmoHelped:
      "Sugar beets were changed to survive weed spray too, so sugar factories get more steady piles of beets from big fields.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/276_Beta_vulgaris_L.jpg/330px-276_Beta_vulgaris_L.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Sugar_beet",
  },
  {
    name: "Papaya",
    howGmoHelped:
      "A virus almost wiped out Hawaiian papaya. A rainbow papaya with a tiny virus-coat gene helped trees recover—that is a famous save-the-crop story.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-029.jpg/330px-Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-029.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Papaya",
  },
  {
    name: "Alfalfa",
    howGmoHelped:
      "Some hay-field alfalfa tolerates a weed spray so farmers can knock down weeds and still grow protein-rich feed for cows and horses.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/75_Medicago_sativa_L.jpg/330px-75_Medicago_sativa_L.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Alfalfa",
  },
  {
    name: "Potato",
    howGmoHelped:
      "Some potatoes were engineered to bruise less or fight late blight disease so more tubers stay good from field to french-fry factory.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Auspflanzung_Schweden_2.jpg/330px-Auspflanzung_Schweden_2.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Genetically_modified_potato",
  },
  {
    name: "Apple",
    howGmoHelped:
      "Arctic® apples were made to brown slower after you slice them—handy for fruit cups. Most apples in the store are still regular breeding, not this kind.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Golden_Delicious_apples.jpg/330px-Golden_Delicious_apples.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Arctic_Apple",
  },
  {
    name: "Summer squash",
    howGmoHelped:
      "Some yellow crookneck squash was changed to resist viruses that used to yellow and kill whole vines—picture shows zucchini, a close cousin in the squash family.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/CSA-Striped-Zucchini.jpg/330px-CSA-Striped-Zucchini.jpg",
    wikiArticle: "https://en.wikipedia.org/wiki/Genetically_modified_food",
  },
];
