export type PlantProfile = {
  id: string;
  /** Lowercase names and nicknames for matching. */
  names: string[];
  displayName: string;
  /** Used to group example chips (e.g. house plants, trees). */
  variety: string;
  emoji: string;
  /** One short hook line. */
  tagline: string;
  coolFacts: string[];
  /** Why this species stands out—clear for tweens through adults. */
  whatMakesItSpecial: string;
  /** Care, safety, or ID tip—practical for any age. */
  careNote?: string;
};
