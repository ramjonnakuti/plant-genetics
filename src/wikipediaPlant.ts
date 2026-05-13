/** Load plant info from English Wikipedia when we have no local profile. */

export type WikiPlantSummary = {
  title: string;
  displayTitle: string;
  extract: string;
  imageUrl?: string;
  articleUrl: string;
};

type OpenSearchResult = [string, string[], string[], string[]];

async function fetchWithTimeout(
  input: string,
  timeoutMs = 6500,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function openSearchTitles(query: string): Promise<string[]> {
  const params = new URLSearchParams({
    action: "opensearch",
    search: query,
    limit: "8",
    namespace: "0",
    format: "json",
    origin: "*",
  });
  const url = `https://en.wikipedia.org/w/api.php?${params}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error("opensearch failed");
  const data = (await res.json()) as OpenSearchResult;
  const titles = data[1];
  return Array.isArray(titles) ? titles : [];
}

async function fetchSummary(
  title: string,
): Promise<WikiPlantSummary | "disambiguation" | null> {
  const pathTitle = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${pathTitle}`;
  const res = await fetchWithTimeout(url);
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const d = (await res.json()) as {
    type?: string;
    title?: string;
    displaytitle?: string;
    extract?: string;
    thumbnail?: { source?: string };
    content_urls?: { desktop?: { page?: string } };
  };
  if (d.type === "disambiguation") return "disambiguation";
  if (!d.extract || d.extract.length < 40) return null;
  const articleUrl = d.content_urls?.desktop?.page;
  if (!articleUrl) return null;
  return {
    title: d.title ?? title,
    displayTitle: d.displaytitle ?? d.title ?? title,
    extract: d.extract,
    imageUrl: d.thumbnail?.source,
    articleUrl,
  };
}

/**
 * Try Wikipedia: OpenSearch candidates, then REST summary (skip disambiguation pages).
 */
export async function tryLoadPlantFromWikipedia(
  query: string,
): Promise<WikiPlantSummary | null> {
  const q = query.trim();
  if (q.length < 2) return null;

  const candidates = new Set<string>();
  (await openSearchTitles(q)).forEach((t) => candidates.add(t));
  candidates.add(q);
  const cap = q.charAt(0).toUpperCase() + q.slice(1);
  if (cap !== q) candidates.add(cap);

  for (const title of candidates) {
    if (!title?.trim()) continue;
    try {
      const summary = await fetchSummary(title);
      if (summary && summary !== "disambiguation") return summary;
    } catch {
      continue;
    }
  }

  return null;
}
