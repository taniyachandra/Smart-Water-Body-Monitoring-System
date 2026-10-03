import { useId } from "react";

/*
  A top-down illustration of a river or lake. The water colour follows the
  quality (clear blue, algae green, silty brown) and the number of floating
  particles follows the turbidity reading, so the picture tells the story.
*/
const TONES = {
  Good: { a: "#2bbbdd", b: "#0a6a9a", line: "#c4f0fa", land: "#e1efe6", tree: "#b7d8c0" },
  Moderate: { a: "#6fb6a2", b: "#38796c", line: "#cfeee0", land: "#e5eedb", tree: "#bcd6b0" },
  Poor: { a: "#b89a6c", b: "#765c3c", line: "#e8d7b6", land: "#ece6d9", tree: "#cfcaa8" },
};

const RIVER =
  "M-10 118 C 70 62, 150 168, 225 118 S 350 66, 410 104 L 410 168 C 350 128, 290 196, 220 172 S 70 120, -10 170 Z";
const LAKE =
  "M200 36 C 290 28, 366 78, 352 122 C 338 176, 262 204, 188 192 C 106 180, 44 150, 58 104 C 72 58, 124 44, 200 36 Z";

const TREES = [
  [24, 28, 8],
  [50, 17, 5],
  [378, 24, 6],
  [372, 202, 8],
  [348, 210, 5],
  [28, 198, 6],
  [200, 12, 4],
];

function seeded(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function WaterScene({ waterBody }) {
  const uid = useId();
  const tone = TONES[waterBody.quality] || TONES.Good;
  const isRiver = waterBody.type === "River";
  const shape = isRiver ? RIVER : LAKE;

  const rand = seeded(waterBody.id + 3);
  const particleCount = Math.round(waterBody.turbidity * 2.4);
  const particles = Array.from({ length: particleCount }, () => ({
    x: 30 + rand() * 340,
    y: 40 + rand() * 150,
    r: 1 + rand() * 2.2,
    o: 0.25 + rand() * 0.4,
  }));

  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      className="water-scene"
      role="img"
      aria-label={`${waterBody.name}, ${waterBody.type.toLowerCase()}, water quality ${waterBody.quality.toLowerCase()}`}
    >
      <defs>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone.a} />
          <stop offset="1" stopColor={tone.b} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <path d={shape} />
        </clipPath>
      </defs>

      <rect width="400" height="220" fill={tone.land} />
      {TREES.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={tone.tree} />
      ))}

      <path d={shape} fill={`url(#${uid}-water)`} />

      <g clipPath={`url(#${uid}-clip)`}>
        {isRiver ? (
          <>
            <path
              d="M-10 138 C 70 84, 150 186, 225 138 S 350 88, 410 124"
              fill="none"
              stroke={tone.line}
              strokeOpacity="0.4"
              strokeWidth="1.6"
            />
            <path
              d="M-10 150 C 70 98, 150 198, 225 150 S 350 100, 410 136"
              fill="none"
              stroke={tone.line}
              strokeOpacity="0.25"
              strokeWidth="1.2"
            />
          </>
        ) : (
          <>
            <ellipse cx="205" cy="115" rx="118" ry="64" fill="none" stroke={tone.line} strokeOpacity="0.28" />
            <ellipse cx="205" cy="115" rx="84" ry="44" fill="none" stroke={tone.line} strokeOpacity="0.32" />
            <ellipse cx="205" cy="115" rx="50" ry="25" fill="none" stroke={tone.line} strokeOpacity="0.38" />
          </>
        )}
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#fff" fillOpacity={p.o} />
        ))}
      </g>
    </svg>
  );
}

export default WaterScene;
