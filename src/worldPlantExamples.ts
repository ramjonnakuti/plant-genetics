import {
  examplesGroupedByVariety,
  plantProfiles,
  type PlantExampleGroup,
} from "./plantProfiles";

const WIKI = "https://en.wikipedia.org/w/api.php";

/**
 * Hard safety valve: total `categorymembers` API requests across the whole load.
 * Each request returns at most 500 titles; we stop when Wikipedia has no more pages
 * or this budget hits (whichever comes first).
 */
const MAX_CATEGORYMEMBER_REQUESTS_TOTAL = 120_000;

export type LoadProgressInfo = { count: number; phase: string };

export type ApiBudget = { left: number };

function normName(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/['’]/g, "");
}

function decodeWikiTitle(title: string): string {
  let t = title.replace(/_/g, " ").trim();
  t = t
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  return t;
}

/**
 * Walk **every** page in a category until Wikipedia returns no `cmcontinue`, with no
 * title-based exclusions (lists, disambiguation pages, etc. are all included).
 * Only skips non-mainspace titles (`ns !== 0` or a `:` namespace prefix in the title).
 */
async function fetchCategoryMemberTitlesPaged(
  cmtitle: string,
  signal: AbortSignal,
  budget: ApiBudget,
): Promise<string[]> {
  const all: string[] = [];
  let cmcontinue: string | undefined;

  while (true) {
    if (signal.aborted) break;
    if (budget.left <= 0) break;
    budget.left -= 1;

    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      list: "categorymembers",
      cmtitle,
      cmlimit: "500",
      cmtype: "page",
    });
    if (cmcontinue) params.set("cmcontinue", cmcontinue);

    const res = await fetch(`${WIKI}?${params}`, { signal });
    if (!res.ok) break;

    const data = (await res.json()) as {
      continue?: { cmcontinue?: string };
      query?: { categorymembers?: { title: string; ns: number }[] };
    };

    const list = data.query?.categorymembers;
    if (!Array.isArray(list) || list.length === 0) break;

    for (const m of list) {
      if (m.ns !== 0 || !m.title) continue;
      if (m.title.includes(":")) continue;
      const t = decodeWikiTitle(m.title);
      if (t.length < 1) continue;
      all.push(t);
    }

    cmcontinue = data.continue?.cmcontinue;
    if (!cmcontinue) break;
  }

  return all;
}

/**
 * Broad English Wikipedia categories (plant-related). Each is fully paginated until
 * the API ends or the global request budget is exhausted—no early batch cap.
 */
const WIKI_CATEGORY_SOURCES: { cmtitle: string; variety: string }[] = [
  { cmtitle: "Category:Plants", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_genera", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_families", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_tribes", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Flowers", variety: "Flowers" },
  { cmtitle: "Category:Garden_plants", variety: "Garden plants" },
  { cmtitle: "Category:House_plants", variety: "House plants" },
  { cmtitle: "Category:Herbs", variety: "Food and herbs" },
  { cmtitle: "Category:Vegetables", variety: "Food and herbs" },
  { cmtitle: "Category:Fruits", variety: "Food and herbs" },
  { cmtitle: "Category:Berries", variety: "Food and herbs" },
  { cmtitle: "Category:Leaf_vegetables", variety: "Food and herbs" },
  { cmtitle: "Category:Root_vegetables", variety: "Food and herbs" },
  { cmtitle: "Category:Crops", variety: "Food and herbs" },
  { cmtitle: "Category:Spices", variety: "Food and herbs" },
  { cmtitle: "Category:Fiber_plants", variety: "Food and herbs" },
  { cmtitle: "Category:Trees", variety: "Trees" },
  { cmtitle: "Category:Shrubs", variety: "Trees" },
  { cmtitle: "Category:Woody_plants", variety: "Trees" },
  { cmtitle: "Category:Conifers", variety: "Trees" },
  { cmtitle: "Category:Palms", variety: "Trees" },
  { cmtitle: "Category:Vines", variety: "Garden plants" },
  { cmtitle: "Category:Succulent_plants", variety: "Succulents and cacti" },
  { cmtitle: "Category:Cacti", variety: "Succulents and cacti" },
  { cmtitle: "Category:Grasses", variety: "Lawns and meadows" },
  { cmtitle: "Category:Carnivorous_plants", variety: "Unusual plants" },
  { cmtitle: "Category:Annual_plants", variety: "Garden plants" },
  { cmtitle: "Category:Perennial_plants", variety: "Garden plants" },
  { cmtitle: "Category:Medicinal_plants", variety: "Food and herbs" },
  { cmtitle: "Category:Plant_stubs", variety: "Garden plants" },
  { cmtitle: "Category:Ferns", variety: "Ferns and allies" },
  { cmtitle: "Category:Mosses", variety: "Mosses" },
  { cmtitle: "Category:Orchids", variety: "Flowers" },
  { cmtitle: "Category:Plant_morphology", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_physiology", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_habitats", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_reproduction", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_taxonomy", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_diseases", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Plant_pests", variety: "Wikipedia plant pages" },
  { cmtitle: "Category:Weeds", variety: "Lawns and meadows" },
  { cmtitle: "Category:Endangered_plants", variety: "Unusual plants" },
  { cmtitle: "Category:Edible_plants", variety: "Food and herbs" },
  { cmtitle: "Category:Poisonous_plants", variety: "Unusual plants" },
  { cmtitle: "Category:Plant_common_names", variety: "Wikipedia plant pages" },
];

export type ExamplesSearchHit = { name: string; variety: string };

export type ExpandedExamplesPayload = {
  groups: PlantExampleGroup[];
  searchIndex: ExamplesSearchHit[];
};

/**
 * Curated profiles plus every mainspace page title returned from the Wikipedia
 * `categorymembers` walks above—paginated to completion until the API stops, with **no
 * exceptions** for “List of…” or disambiguation titles. A shared API request budget is
 * the only ceiling (to avoid a runaway client if something misbehaves).
 */
export async function loadExpandedExampleGroups(
  signal: AbortSignal,
  onProgress?: (info: LoadProgressInfo) => void,
): Promise<ExpandedExamplesPayload> {
  const base = examplesGroupedByVariety();
  const seen = new Set<string>();
  for (const p of plantProfiles) {
    seen.add(normName(p.displayName));
    for (const n of p.names) seen.add(normName(n));
  }

  const merged = new Map<string, Set<string>>();
  for (const g of base) {
    merged.set(g.variety, new Set(g.names));
  }

  const budget: ApiBudget = { left: MAX_CATEGORYMEMBER_REQUESTS_TOTAL };

  onProgress?.({
    count: seen.size,
    phase: `Starting Wikipedia (up to ${MAX_CATEGORYMEMBER_REQUESTS_TOTAL.toLocaleString()} API pages total, no title skips)…`,
  });

  for (const { cmtitle, variety } of WIKI_CATEGORY_SOURCES) {
    if (signal.aborted) break;
    if (budget.left <= 0) {
      onProgress?.({
        count: seen.size,
        phase: "Stopped: API page budget reached (still huge—scroll and filter).",
      });
      break;
    }

    let titles: string[] = [];
    try {
      titles = await fetchCategoryMemberTitlesPaged(cmtitle, signal, budget);
    } catch {
      continue;
    }
    if (signal.aborted) break;

    let set = merged.get(variety);
    if (!set) {
      set = new Set<string>();
      merged.set(variety, set);
    }

    for (const raw of titles) {
      const n = raw.trim();
      if (!n) continue;
      const key = normName(n);
      if (seen.has(key)) continue;
      seen.add(key);
      set.add(n);
    }

    onProgress?.({
      count: seen.size,
      phase: `${variety} ← ${cmtitle.replace(/^Category:/, "")} (budget ${budget.left.toLocaleString()} pages left)`,
    });
  }

  const varieties = [...merged.keys()].sort((a, b) => a.localeCompare(b));
  const groups: PlantExampleGroup[] = varieties.map((variety) => ({
    variety,
    names: [...merged.get(variety)!].sort((a, b) => a.localeCompare(b)),
  }));

  const searchIndex: ExamplesSearchHit[] = groups.flatMap((g) =>
    g.names.map((name) => ({ name, variety: g.variety })),
  );
  searchIndex.sort((a, b) => a.name.localeCompare(b.name));

  onProgress?.({ count: seen.size, phase: "Done" });

  return { groups, searchIndex };
}
