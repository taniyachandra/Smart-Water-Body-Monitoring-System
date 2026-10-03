// Safe ranges follow common Indian drinking / bathing water guidance.
// `ideal` is the range considered safe. `null` means there is no fixed range.
export const PARAMETERS = [
  {
    key: "pH",
    label: "pH",
    short: "pH",
    unit: "",
    min: 0,
    max: 14,
    ideal: [6.5, 8.5],
    icon: "flask",
    hint: "Measures acidity. Between 6.5 and 8.5 is safe for most aquatic life.",
  },
  {
    key: "dissolvedOxygen",
    label: "Dissolved oxygen",
    short: "Oxygen",
    unit: "mg/L",
    min: 0,
    max: 10,
    ideal: [5, 10],
    icon: "bubbles",
    hint: "Fish and other aquatic life need at least 5 mg/L to breathe.",
  },
  {
    key: "turbidity",
    label: "Turbidity",
    short: "Turbidity",
    unit: "NTU",
    min: 0,
    max: 15,
    ideal: [0, 5],
    icon: "cloud",
    hint: "How cloudy the water is. Under 5 NTU is considered clear.",
  },
  {
    key: "tds",
    label: "Dissolved solids (TDS)",
    short: "TDS",
    unit: "mg/L",
    min: 0,
    max: 800,
    ideal: [0, 500],
    icon: "grains",
    hint: "Dissolved salts and minerals. Under 500 mg/L is acceptable.",
  },
  {
    key: "temperature",
    label: "Temperature",
    short: "Temp",
    unit: "°C",
    min: 0,
    max: 40,
    ideal: null,
    icon: "thermo",
    hint: "Warmer water holds less oxygen. There is no fixed safe range.",
  },
];

export const PARAM = Object.fromEntries(PARAMETERS.map((p) => [p.key, p]));

export const STATUS_TEXT = {
  good: "Within safe range",
  moderate: "Slightly outside safe range",
  poor: "Outside safe range",
  neutral: "No fixed safe range",
};

export function getParamStatus(param, value) {
  if (!param.ideal) return "neutral";
  const [lo, hi] = param.ideal;
  if (value >= lo && value <= hi) return "good";
  const gap = value < lo ? lo - value : value - hi;
  return gap / (param.max - param.min) <= 0.15 ? "moderate" : "poor";
}
