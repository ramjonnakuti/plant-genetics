import { FormEvent, useEffect, useRef, useState } from "react";
import { findPlantByName } from "./plantProfiles";
import type { PlantProfile } from "./plantProfiles";
import { ExamplesModal } from "./ExamplesModal";
import { PlantProfilePage } from "./PlantProfilePage";
import { JobsPage, PricesPage, SeedJourneyPage } from "./TopicPages";
import { WikiPlantPage } from "./WikiPlantPage";
import { tryLoadPlantFromWikipedia, type WikiPlantSummary } from "./wikipediaPlant";
import { SiteCreditFooter, SiteCreditLine } from "./SiteCredit";
import "./App.css";

type Panel = "home" | "plants" | "prices" | "jobs" | "seed";

type PlantScreen =
  | null
  | { kind: "profile"; plant: PlantProfile }
  | { kind: "wiki"; typed: string; data: WikiPlantSummary }
  | { kind: "loading"; typed: string }
  | { kind: "notFound"; typed: string; message: string };

export default function App() {
  const [panel, setPanel] = useState<Panel>("home");
  const [name, setName] = useState("");
  const [plantScreen, setPlantScreen] = useState<PlantScreen>(null);
  const [examplesOpen, setExamplesOpen] = useState(false);
  const lookupSeq = useRef(0);

  useEffect(() => {
    setExamplesOpen(false);
  }, [panel]);

  function goHome() {
    setPanel("home");
    setPlantScreen(null);
    setName("");
  }

  async function go(typed: string) {
    const t = typed.trim();
    if (!t) {
      setPlantScreen(null);
      return;
    }
    const seq = ++lookupSeq.current;
    const plant = findPlantByName(t);
    if (plant) {
      setPlantScreen({ kind: "profile", plant });
      setName(plant.displayName);
      return;
    }

    setPlantScreen({ kind: "loading", typed: t });
    try {
      const wiki = await tryLoadPlantFromWikipedia(t);
      if (seq !== lookupSeq.current) return;
      if (wiki) {
        setPlantScreen({ kind: "wiki", typed: t, data: wiki });
      } else {
        setPlantScreen({
          kind: "notFound",
          typed: t,
          message:
            "No local profile or matching encyclopedia page was found for that name.",
        });
      }
    } catch {
      if (seq !== lookupSeq.current) return;
      setPlantScreen({
        kind: "notFound",
        typed: t,
        message:
          "Lookup failed due to a network or service issue. Check connection and try again.",
      });
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await go(name);
  }

  async function onHomeSearch(e: FormEvent) {
    e.preventDefault();
    const t = name.trim();
    if (!t) return;
    setPanel("plants");
    await go(t);
  }

  async function pickExample(example: string) {
    setName(example);
    await go(example);
  }

  async function pickHomeExample(example: string) {
    setName(example);
    setPanel("plants");
    await go(example);
  }

  if (panel === "plants" && plantScreen?.kind === "profile") {
    return (
      <div className="app">
        <PlantProfilePage
          plant={plantScreen.plant}
          onBack={() => setPlantScreen(null)}
        />
        <footer className="footer">
          Be safe with tools and sprays.
          <SiteCreditLine />
        </footer>
      </div>
    );
  }

  if (panel === "plants" && plantScreen?.kind === "wiki") {
    return (
      <div className="app">
        <WikiPlantPage
          data={plantScreen.data}
          searchedAs={plantScreen.typed}
          onBack={() => setPlantScreen(null)}
        />
        <SiteCreditFooter />
      </div>
    );
  }

  if (panel === "prices") {
    return (
      <div className="app">
        <PricesPage onHome={goHome} />
      </div>
    );
  }

  if (panel === "jobs") {
    return (
      <div className="app">
        <JobsPage onHome={goHome} />
      </div>
    );
  }

  if (panel === "seed") {
    return (
      <div className="app">
        <SeedJourneyPage onHome={goHome} />
      </div>
    );
  }

  if (panel === "plants") {
    return (
      <div className="app">
        <button type="button" className="topic-home-bar" onClick={goHome}>
          ← Home
        </button>
        <header className="header">
          <h1>
            <span aria-hidden="true">🌱 </span>
            Look up a plant
          </h1>
          <p>Type the plant you want, then tap Go.</p>
        </header>

        <form className="form" onSubmit={onSubmit}>
          <label className="label" htmlFor="plant-name">
            Type the plant you want
          </label>
          <div className="input-row">
            <input
              id="plant-name"
              className="query-input"
              type="search"
              autoComplete="off"
              placeholder="Example: sunflower, fern, tomato"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setPlantScreen(null);
              }}
            />
            <button className="submit-btn" type="submit">
              {plantScreen?.kind === "loading" ? "Loading..." : "Go"}
            </button>
          </div>
        </form>

        {plantScreen?.kind === "loading" && (
          <div className="search-status" role="status" aria-live="polite">
            Looking for <strong>{plantScreen.typed}</strong>...
          </div>
        )}

        {plantScreen?.kind === "notFound" && (
          <div className="not-found" role="status">
            <p className="not-found-title">
              We could not find <strong>{plantScreen.typed}</strong>.
            </p>
            <p className="not-found-note">{plantScreen.message}</p>
            <p className="not-found-note not-found-examples-hint">
              Open{" "}
              <button
                type="button"
                className="examples-inline-open"
                onClick={() => setExamplesOpen(true)}
              >
                Examples
              </button>
              and type the plant you want to see matching names.
            </p>
          </div>
        )}

        <div className="examples-launch-wrap">
          <button
            type="button"
            className="examples-open-btn"
            onClick={() => setExamplesOpen(true)}
            aria-expanded={examplesOpen}
            aria-haspopup="dialog"
          >
            <span className="examples-open-btn-row">
              <span className="examples-open-btn-emoji" aria-hidden="true">
                📋
              </span>
              Examples
            </span>
            <span className="examples-open-btn-hint">type a plant to search</span>
          </button>
        </div>

        <ExamplesModal
          open={examplesOpen}
          onClose={() => setExamplesOpen(false)}
          onPickName={pickExample}
        />
        <SiteCreditFooter />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span aria-hidden="true">🌱 </span>
          Plant facts
        </h1>
        <p>
          Easy plant facts for all ages.
        </p>
      </header>

      <form className="form home-search" onSubmit={onHomeSearch}>
        <label className="label" htmlFor="home-plant-search">
          Type the plant you want
        </label>
        <div className="input-row">
          <input
            id="home-plant-search"
            className="query-input"
            type="search"
            autoComplete="off"
            placeholder="Example: sunflower, mint, oak"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPlantScreen(null);
            }}
          />
          <button className="submit-btn" type="submit">
            Go
          </button>
        </div>
      </form>

      <div className="examples-launch-wrap">
        <button
          type="button"
          className="examples-open-btn"
          onClick={() => setExamplesOpen(true)}
          aria-expanded={examplesOpen}
          aria-haspopup="dialog"
        >
          <span className="examples-open-btn-row">
            <span className="examples-open-btn-emoji" aria-hidden="true">
              📋
            </span>
            Examples
          </span>
          <span className="examples-open-btn-hint">type a plant to search</span>
        </button>
      </div>

      <ExamplesModal
        open={examplesOpen}
        onClose={() => setExamplesOpen(false)}
        onPickName={pickHomeExample}
      />

      <nav className="topic-menu" aria-label="Main topics">
        <button
          type="button"
          className="topic-tile topic-tile--prices"
          onClick={() => setPanel("prices")}
        >
          <span className="topic-tile-emoji" aria-hidden="true">
            💵
          </span>
          <span className="topic-tile-title">Prices</span>
          <span className="topic-tile-desc">How much plant things may cost</span>
        </button>
        <button
          type="button"
          className="topic-tile topic-tile--jobs"
          onClick={() => setPanel("jobs")}
        >
          <span className="topic-tile-emoji" aria-hidden="true">
            👷
          </span>
          <span className="topic-tile-title">Plant jobs</span>
          <span className="topic-tile-desc">Jobs, pay ideas, school paths, and skills</span>
        </button>
        <button
          type="button"
          className="topic-tile topic-tile--seed"
          onClick={() => setPanel("seed")}
        >
          <span className="topic-tile-emoji" aria-hidden="true">
            🌱
          </span>
          <span className="topic-tile-title">Seed → plant</span>
          <span className="topic-tile-desc">How a seed grows</span>
        </button>
      </nav>

      <SiteCreditFooter />
    </div>
  );
}
