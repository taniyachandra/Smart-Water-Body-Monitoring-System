export const QUALITY_ORDER = ["Good", "Moderate", "Poor"];

export const QUALITY_RANK = { Good: 0, Moderate: 1, Poor: 2 };

export const QUALITY_COLOR = {
  Good: "var(--tone-good)",
  Moderate: "var(--tone-moderate)",
  Poor: "var(--tone-poor)",
};

export function qualityClass(quality) {
  return `quality-pill quality-${quality.toLowerCase()}`;
}
