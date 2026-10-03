import "./Waves.css";

const W = 2880;
const H = 120;

// Each layer is two full wavelengths wide so it can drift left forever
// without a visible seam (cycles divide evenly into 1440).
function buildPath({ amp, cycles, phase, base }) {
  let d = `M0 ${H} L0 ${(base + amp * Math.sin(phase)).toFixed(1)}`;
  for (let x = 20; x <= W; x += 20) {
    const y = base + amp * Math.sin((x / 1440) * cycles * 2 * Math.PI + phase);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return `${d} L${W} ${H} Z`;
}

const LAYERS = [
  { amp: 12, cycles: 2, phase: 0, base: 46, opacity: 0.28, dur: 34, reverse: false },
  { amp: 10, cycles: 3, phase: 1.9, base: 62, opacity: 0.5, dur: 26, reverse: true },
  { amp: 8, cycles: 2, phase: 3.8, base: 80, opacity: 1, dur: 20, reverse: false },
].map((layer) => ({ ...layer, d: buildPath(layer) }));

/**
 * Animated water surface. Colour comes from the CSS variable --wave-color,
 * so it can blend into whatever section sits next to it.
 * position="top" flips it to hang from the top edge of a dark section.
 */
function Waves({ position = "bottom", className = "" }) {
  return (
    <div className={`waves waves-${position} ${className}`} aria-hidden="true">
      {LAYERS.map((layer, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{
            animationDuration: `${layer.dur}s`,
            animationDirection: layer.reverse ? "reverse" : "normal",
          }}
        >
          <path d={layer.d} fillOpacity={layer.opacity} />
        </svg>
      ))}
    </div>
  );
}

export default Waves;
