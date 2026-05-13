import { HomeBar } from "./TopicPages";
import { SiteCreditFooter } from "./SiteCredit";
import { gmoTopTenCrops } from "./gmoTopCrops";
import {
  gmoFunFacts,
  gmoHowHelpsPlants,
  gmoKidNotes,
  gmoNamedPlantExamples,
  gmoShowcaseTips,
  gmoWhatIs,
} from "./gmoTopicContent";
import "./TopicPages.css";

type Props = { onHome: () => void };

/** Split `**bold**` into text + strong for kid-friendly emphasis. */
function KidBoldParts({ text }: { text: string }) {
  const parts = text.split(/\*\*/);
  return (
    <>
      {parts.map((chunk, i) =>
        i % 2 === 1 ? (
          <strong key={`${text}-b-${i}`}>{chunk}</strong>
        ) : (
          <span key={`${text}-t-${i}`}>{chunk}</span>
        ),
      )}
    </>
  );
}

function RichLine({ text }: { text: string }) {
  return (
    <p className="gmo-para">
      <KidBoldParts text={text} />
    </p>
  );
}

export function GmoTopicPage({ onHome }: Props) {
  return (
    <div className="topic-page">
      <HomeBar onHome={onHome} />
      <header className="topic-header topic-header--gmo">
        <span className="topic-icon topic-icon--gmo" aria-hidden="true">
          🧬
        </span>
        <div>
          <h2 className="topic-title">GMO and plant genes</h2>
          <p className="topic-lead">
            Simple words for class: what <strong>GMO</strong> means, how changed genes can help some farm plants, and
            how that connects to older plant-breeding tricks.
          </p>
        </div>
      </header>

      <section className="gmo-section" aria-labelledby="gmo-what-heading">
        <h3 id="gmo-what-heading" className="gmo-section-title">
          What is a GMO?
        </h3>
        {gmoWhatIs.map((line) => (
          <RichLine key={line} text={line} />
        ))}
      </section>

      <section className="gmo-section" aria-labelledby="gmo-help-heading">
        <h3 id="gmo-help-heading" className="gmo-section-title">
          How can GMO ideas help plants?
        </h3>
        {gmoHowHelpsPlants.map((line) => (
          <RichLine key={line} text={line} />
        ))}
      </section>

      <section className="gmo-section gmo-section--gallery" aria-labelledby="gmo-top10-heading">
        <h3 id="gmo-top10-heading" className="gmo-section-title">
          Ten farm crops where GMO helped (with pictures)
        </h3>
        <p className="gmo-para gmo-para--lead">
          These are big-world crops grown for food, oil, sugar, or fiber—not the little fern on your desk. Each card
          says one way scientists and farmers used gene tools to solve a real problem.
        </p>
        <ul className="gmo-crop-grid">
          {gmoTopTenCrops.map((crop) => (
            <li key={crop.name} className="gmo-crop-card">
              <figure className="gmo-crop-figure">
                <img
                  className="gmo-crop-img"
                  src={crop.imageUrl}
                  alt={`${crop.name} — example photo`}
                  width={330}
                  height={220}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="gmo-crop-cap">
                  Photo from{" "}
                  <a href={crop.wikiArticle} target="_blank" rel="noreferrer noopener">
                    Wikipedia
                  </a>
                </figcaption>
              </figure>
              <h4 className="gmo-crop-name">{crop.name}</h4>
              <p className="gmo-crop-helped">{crop.howGmoHelped}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="gmo-section" aria-labelledby="gmo-examples-heading">
        <h3 id="gmo-examples-heading" className="gmo-section-title">
          Mango, watermelon, and sunflower
        </h3>
        <p className="gmo-para gmo-para--lead">
          Here are three familiar plants people talk about when they mean &quot;better&quot; fruit, seeds, or field
          survival—sometimes with lab genes, sometimes with older breeding tricks.
        </p>
        {gmoNamedPlantExamples.map((line) => (
          <RichLine key={line} text={line} />
        ))}
      </section>

      <section className="gmo-section" aria-labelledby="gmo-real-heading">
        <h3 id="gmo-real-heading" className="gmo-section-title">
          What about plants at home or at the store?
        </h3>
        {gmoKidNotes.map((line) => (
          <RichLine key={line} text={line} />
        ))}
      </section>

      <section className="gmo-section" aria-labelledby="gmo-fun-heading">
        <h3 id="gmo-fun-heading" className="gmo-section-title">
          Fun facts
        </h3>
        <ul className="gmo-bullet-list">
          {gmoFunFacts.map((f) => (
            <li key={f}>
              <KidBoldParts text={f} />
            </li>
          ))}
        </ul>
      </section>

      <section className="gmo-section gmo-section--genetics" aria-labelledby="gmo-genetics-heading">
        <h3 id="gmo-genetics-heading" className="gmo-section-title">
          Plant genetics in one breath
        </h3>
        <p className="gmo-para">
          <strong>Genetics</strong> is the study of traits passed through families—like tall corn parents often making
          tall corn kids. <strong>Genes</strong> are the units inside DNA that hold one instruction each. When people
          breed plants, they mix gene sets from two parents. GMO work can move <strong>one clear instruction</strong>{" "}
          without waiting many seasons—still tested a lot before big farms use it.
        </p>
        <p className="gmo-para">
          <strong>Why care?</strong> When you know plants have instruction books, you can ask smarter questions: Which
          trait helps people, bugs, soil, or climate? Who tested it? That is how curiosity grows into real science
          literacy.
        </p>
      </section>

      <section className="gmo-section gmo-section--showcase" aria-labelledby="gmo-show-heading">
        <h3 id="gmo-show-heading" className="gmo-section-title">
          Ideas for your demo or poster
        </h3>
        <ul className="gmo-bullet-list">
          {gmoShowcaseTips.map((tip) => (
            <li key={tip}>
              <KidBoldParts text={tip} />
            </li>
          ))}
        </ul>
      </section>

      <SiteCreditFooter />
    </div>
  );
}
