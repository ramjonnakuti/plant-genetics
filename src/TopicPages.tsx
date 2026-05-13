import { useState } from "react";
import { plantJobs, priceExamples, seedToPlantSteps } from "./topicsData";
import { SiteCreditFooter } from "./SiteCredit";
import "./TopicPages.css";

type Props = { onHome: () => void };

export function HomeBar({ onHome }: Props) {
  return (
    <button type="button" className="topic-home-bar" onClick={onHome}>
      ← Home
    </button>
  );
}

function JobsAccordionList() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <>
      {plantJobs.map((job) => {
        const open = openTitle === job.title;
        const panelId = `job-panel-${job.title.replace(/\s+/g, "-")}`;
        const btnId = `job-btn-${job.title.replace(/\s+/g, "-")}`;
        return (
          <li key={job.title} className="job-card job-card--accordion">
            <button
              id={btnId}
              type="button"
              className="job-card-toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenTitle(open ? null : job.title)}
            >
              <div className="job-card-toggle-inner">
                <div className="job-card-top">
                  <span className="job-emoji" aria-hidden="true">
                    {job.emoji}
                  </span>
                  <h3 className="job-title">{job.title}</h3>
                </div>
                <span className="job-chevron" aria-hidden="true">
                  {open ? "▲" : "▼"}
                </span>
              </div>
              <p className="job-preview">{job.whatTheyDo}</p>
              <span className="job-tap-hint">{open ? "Tap to close details" : "Tap for pay, school, and more"}</span>
            </button>
            {open ? (
              <div id={panelId} className="job-card-panel" role="region" aria-labelledby={btnId}>
                <p className="job-text job-text--detail">{job.moreAboutTheJob}</p>
                <dl className="job-facts">
                  <div className="job-facts-row">
                    <dt>Pay (about, per year)</dt>
                    <dd>
                      <span className="job-salary">{job.salaryBand}</span>
                      <span className="job-salary-note">{job.salaryNote}</span>
                    </dd>
                  </div>
                  <div className="job-facts-row">
                    <dt>School and training</dt>
                    <dd>{job.education}</dd>
                  </div>
                  <div className="job-facts-row">
                    <dt>Often asked for</dt>
                    <dd>
                      <ul className="job-req-list">
                        {job.requirements.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </li>
        );
      })}
    </>
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
      <SiteCreditFooter />
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
            <strong>Tap a job</strong> to open pay, school paths, and skills. Tap again to close. Numbers are rough
            U.S. examples for learning—real pay changes by city, boss, and experience.
          </p>
        </div>
      </header>

      <ul className="job-list">
        <JobsAccordionList />
      </ul>
      <SiteCreditFooter />
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
      <SiteCreditFooter />
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
      <SiteCreditFooter />
    </div>
  );
}
