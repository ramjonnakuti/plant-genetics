import type { WikiPlantSummary } from "./wikipediaPlant";
import { simplifyWikiTextForKids, stripWikiHtmlToText } from "./wikiPlainAndSimple";
import "./WikiPlantPage.css";

type Props = {
  data: WikiPlantSummary;
  searchedAs: string;
  onBack: () => void;
};

/** Turn one Wikipedia summary blob into short sections (first sentence ≈ what it is). */
function sectionsFromExtract(extract: string): { heading: string; paragraphs: string[] }[] {
  const text = extract
    .split(/\n+/)
    .map((b) => b.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ")
    .trim();
  if (!text) return [];

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return [{ heading: "", paragraphs: [text] }];
  if (sentences.length === 1) {
    return [{ heading: "", paragraphs: sentences }];
  }

  return [
    { heading: "What it is", paragraphs: [sentences[0]!] },
    { heading: "More simple facts", paragraphs: sentences.slice(1) },
  ];
}

export function WikiPlantPage({ data, searchedAs, onBack }: Props) {
  const plainExtract = simplifyWikiTextForKids(data.extract);
  const sections = sectionsFromExtract(plainExtract);
  const displayTitle = stripWikiHtmlToText(data.displayTitle);

  return (
    <div className="wiki-plant-page">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <header className="wiki-hero">
        {data.imageUrl && (
          <figure className="wiki-photo-wrap">
            <img
              className="wiki-photo"
              src={data.imageUrl}
              alt=""
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="wiki-photo-cap">
              Picture from{" "}
              <a href={data.articleUrl} target="_blank" rel="noreferrer noopener">
                Wikipedia
              </a>
              .
            </figcaption>
          </figure>
        )}
        <div className="wiki-hero-text">
          <p className="wiki-searched">
            You searched for: <strong>{searchedAs}</strong>
          </p>
          <h2 className="wiki-title">{displayTitle}</h2>
          <p className="wiki-source">
            The full article is on{" "}
            <a href={data.articleUrl} target="_blank" rel="noreferrer noopener">
              Wikipedia
            </a>
            . Below, we use shorter words when we can.
          </p>
        </div>
      </header>

      <section className="wiki-body" aria-label="Article summary">
        <p className="wiki-kid-lead">
          Take your time. Hard words are changed to easier ones when we can.
        </p>
        {sections.map((section, si) => (
          <div key={si} className="wiki-subsection">
            {section.heading ? (
              <h3 className="wiki-subheading">{section.heading}</h3>
            ) : null}
            {section.paragraphs.map((p, pi) => (
              <p key={`${si}-${pi}`} className="wiki-para">
                {p}
              </p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
