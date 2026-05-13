import { plantJobs, priceExamples, seedToPlantSteps } from "./topicsData";
import "./TopicPages.css";

type Props = { onHome: () => void };

function HomeBar({ onHome }: Props) {
  return (
    <button type="button" className="topic-home-bar" onClick={onHome}>
      ← Home
    </button>
  );
}

export function PricesPage({ onHome }: Props) {
  return (
    <div className="topic-page">
      <HomeBar onHome={onHome} />
      <header className="topic-header">
        <span className="topic-icon" aria-hidden="true">
          💵
        </span>
        <div>
          <h2 className="topic-title">Plant prices</h2>
          <p className="topic-lead">
            These are close price ranges. Prices can change by place and store.
          </p>
        </div>
      </header>

      <ul className="price-list">
        {priceExamples.map((row) => (
          <li key={row.item} className="price-card">
            <div className="price-item">{row.item}</div>
            <div className="price-tag">{row.about}</div>
            <p className="price-note">{row.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JobsPage({ onHome }: Props) {
  return (
    <div className="topic-page">
      <HomeBar onHome={onHome} />
      <header className="topic-header">
        <span className="topic-icon" aria-hidden="true">
          👷
        </span>
        <div>
          <h2 className="topic-title">Plant jobs</h2>
          <p className="topic-lead">
            Here are jobs for people who like plants.
          </p>
        </div>
      </header>

      <ul className="job-list">
        {plantJobs.map((job) => (
          <li key={job.title} className="job-card">
            <span className="job-emoji" aria-hidden="true">
              {job.emoji}
            </span>
            <div>
              <h3 className="job-title">{job.title}</h3>
              <p className="job-text">{job.whatTheyDo}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SeedJourneyPage({ onHome }: Props) {
  return (
    <div className="topic-page">
      <HomeBar onHome={onHome} />
      <header className="topic-header">
        <span className="topic-icon" aria-hidden="true">
          🌱
        </span>
        <div>
          <h2 className="topic-title">Seed to plant</h2>
          <p className="topic-lead">
            This is a simple path from seed to full plant.
          </p>
        </div>
      </header>

      <ol className="seed-steps">
        {seedToPlantSteps.map((s) => (
          <li key={s.step} className="seed-step">
            <div className="seed-step-num">{s.step}</div>
            <div className="seed-step-body">
              <span className="seed-step-emoji" aria-hidden="true">
                {s.emoji}
              </span>
              <h3 className="seed-step-title">{s.title}</h3>
              <p className="seed-step-text">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const FAIR_STEPS = [
  "Pick one clear question (example: Does light color affect basil height?).",
  "Write a hypothesis in 'If... then... because...' form.",
  "Define variables: independent, dependent, and controlled.",
  "Plan at least 3-5 repeated samples per condition.",
  "Collect measurements on a schedule (same time of day if possible).",
  "Graph results, then explain what happened and why.",
  "List limitations and what you would improve next time.",
];

const FAIR_CHECKLIST = [
  "Question and hypothesis are visible on the board.",
  "Variables are clearly labeled.",
  "Procedure is written so someone else could repeat it.",
  "Raw data table and final graph are both included.",
  "Conclusion answers the original question directly.",
  "Sources are cited (book, site, article, interview).",
  "Safety notes and permissions are documented.",
];

export function ScienceFairPage({ onHome }: Props) {
  return (
    <div className="topic-page">
      <HomeBar onHome={onHome} />
      <header className="topic-header">
        <span className="topic-icon" aria-hidden="true">
          🧪
        </span>
        <div>
          <h2 className="topic-title">Science fair guide</h2>
          <p className="topic-lead">
            Use this as a project template you can follow from idea to final
            board. Keep your experiment simple, measurable, and repeatable.
          </p>
        </div>
      </header>

      <section className="fair-section">
        <h3 className="fair-title">Project flow</h3>
        <ol className="fair-list">
          {FAIR_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="fair-section">
        <h3 className="fair-title">Quick data log template</h3>
        <pre className="fair-pre" aria-label="Data table template">
Day | Condition A | Condition B | Condition C | Notes
----|-------------|-------------|-------------|-------------------------
1   |             |             |             |
3   |             |             |             |
5   |             |             |             |
7   |             |             |             |
        </pre>
      </section>

      <section className="fair-section">
        <h3 className="fair-title">Final board checklist</h3>
        <ul className="fair-check">
          {FAIR_CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
