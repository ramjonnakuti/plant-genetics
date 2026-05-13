import { HomeBar } from "./TopicPages";
import { SiteCreditFooter } from "./SiteCredit";
import {
  gmoFunFacts,
  gmoHowHelpsPlants,
  gmoKidNotes,
  gmoWhatIs,
} from "./gmoTopicContent";
import "./TopicPages.css";

type Props = { onHome: () => void };

/** Bold **word** in a line for kid-friendly emphasis. */
function RichLine({ text }: { text: string }) {
  const parts = text.split(/\*\*/);
  return (
    <p className="gmo-para">
      {parts.map((chunk, i) =>
        i % 2 === 1 ? (
          <strong key={`${text}-${i}`}>{chunk}</strong>
        ) : (
          <span key={`${text}-${i}`}>{chunk}</span>
        ),
      )}
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
            Simple words for class: what <strong>GMO</strong> means, how it can help plants, and how it fits next to
            older ways of breeding plants.
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
            <li key={f}>{f}</li>
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
      </section>

      <SiteCreditFooter />
    </div>
  );
}
