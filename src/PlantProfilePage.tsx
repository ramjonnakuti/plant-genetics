import type { PlantProfile } from "./plantProfiles";
import "./PlantProfilePage.css";

type Props = {
  plant: PlantProfile;
  onBack: () => void;
};

export function PlantProfilePage({ plant, onBack }: Props) {
  return (
    <div className="plant-page">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <header className="plant-hero">
        <span className="plant-emoji" aria-hidden="true">
          {plant.emoji}
        </span>
        <div className="plant-hero-text">
          <h2 className="plant-name">{plant.displayName}</h2>
          <p className="plant-tagline">{plant.tagline}</p>
        </div>
      </header>

      <section className="plant-section" aria-labelledby="facts-heading">
        <h3 id="facts-heading" className="plant-section-title">
          Facts
        </h3>
        <ul className="plant-facts-list">
          {plant.coolFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section className="plant-section" aria-labelledby="special-heading">
        <h3 id="special-heading" className="plant-section-title">
          Why it is cool
        </h3>
        <p className="plant-special-text">{plant.whatMakesItSpecial}</p>
      </section>

      {plant.careNote && (
        <aside className="plant-tip">
          <strong>Care tip:</strong> {plant.careNote}
        </aside>
      )}
    </div>
  );
}
