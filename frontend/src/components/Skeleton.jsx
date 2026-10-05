import "./Skeleton.css";

// Water Bodies page ke liye placeholder cards
export function CardSkeletons({ count = 6 }) {
  return (
    <div className="water-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="sk-card" key={i}>
          <div className="sk sk-pill" />
          <div className="sk sk-title" />
          <div className="sk sk-line" />
          <div className="sk sk-line sk-short" />
          <div className="sk sk-btn" />
        </div>
      ))}
    </div>
  );
}

// Baaki pages ke liye chhota loader
export function PageLoader({ text = "Loading..." }) {
  return (
    <div className="sk-loader">
      <span className="sk-drop">💧</span>
      <p>{text}</p>
    </div>
  );
}