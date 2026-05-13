/**
 * Wikipedia REST sometimes returns HTML in display titles (e.g. mw-page-title-main spans).
 * Strip to plain text for React text nodes.
 */
export function stripWikiHtmlToText(html: string): string {
  const s = html.trim();
  if (!s) return "";
  if (!/<[a-z][\s\S]*>/i.test(s)) {
    return s.replace(/\s+/g, " ").trim();
  }
  try {
    const doc = new DOMParser().parseFromString(`<div>${s}</div>`, "text/html");
    const text = doc.body.textContent ?? "";
    return text.replace(/\s+/g, " ").trim();
  } catch {
    return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
}

/**
 * Swap harder words for easier ones (about 4th-grade reading). Keeps facts;
 * does not rewrite whole sentences.
 */
export function simplifyWikiTextForKids(text: string): string {
  let t = text;
  const pairs: [RegExp, string][] = [
    [/\bapproximately\b/gi, "about"],
    [/\bnative to\b/gi, "grows naturally in"],
    [/\bindigenous to\b/gi, "grows naturally in"],
    [/\bindigenous\b/gi, "local"],
    [/\bcultivated\b/gi, "grown"],
    [/\bcultivation\b/gi, "growing"],
    [/\bdistinctive\b/gi, "special"],
    [/\bdistinctively\b/gi, "clearly"],
    [/\butilized\b/gi, "used"],
    [/\butilize\b/gi, "use"],
    [/\bemployed\b/gi, "used"],
    [/\bcomprises\b/gi, "includes"],
    [/\bcomprise\b/gi, "include"],
    [/\bsubsequently\b/gi, "later"],
    [/\bprimarily\b/gi, "mostly"],
    [/\bextensive\b/gi, "wide"],
    [/\bextensively\b/gi, "widely"],
    [/\bcharacteristic\b/gi, "typical"],
    [/\bcharacteristics\b/gi, "traits"],
    [/\bpropagation\b/gi, "growing new plants"],
    [/\bcommercial\b/gi, "farm or store"],
    [/\bcommercially\b/gi, "for sale"],
    [/\btherapeutic\b/gi, "healing"],
    [/\borginating\b/gi, "starting"],
    [/\bfluctuates\b/gi, "changes"],
    [/\bdemonstrates\b/gi, "shows"],
    [/\bnevertheless\b/gi, "still"],
    [/\bfurthermore\b/gi, "also"],
    [/\bconsequently\b/gi, "so"],
    [/\bvegetation\b/gi, "plants"],
    [/\becosystem\b/gi, "living community"],
    [/\bhabitat\b/gi, "home area"],
    [/\bhabitats\b/gi, "home areas"],
    [/\bgenus\b/gi, "plant group"],
    [/\bgenera\b/gi, "plant groups"],
    [/\bspecies of\b/gi, "kind of"],
    [/\bvarieties\b/gi, "types"],
    [/\bvariety\b/gi, "type"],
    [/\bbotanical\b/gi, "plant"],
    [/\btaxonomic\b/gi, "naming"],
    [/\btaxonomy\b/gi, "naming"],
    [/\bmorphology\b/gi, "shape"],
    [/\bphysiological\b/gi, "body"],
    [/\bphysiology\b/gi, "how the body works"],
    [/\bsynonymous\b/gi, "the same as"],
    [/\bterminology\b/gi, "names"],
    [/\bfrequently\b/gi, "often"],
    [/\boccasionally\b/gi, "sometimes"],
    [/\bconsiderable\b/gi, "large"],
    [/\bsubstantial\b/gi, "large"],
  ];
  for (const [re, rep] of pairs) {
    t = t.replace(re, rep);
  }
  return t.replace(/\s+/g, " ").trim();
}
