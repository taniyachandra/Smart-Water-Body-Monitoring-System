import { useState } from "react";
import { Link } from "react-router-dom";

import useWaterBodies from "../services/useWaterBodies";
import "./QualityAlert.css";

const KEY = "swms_alert_dismissed";

function QualityAlert() {
  const { waterBodies } = useWaterBodies();

  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  const poor = waterBodies.filter((wb) => wb.quality === "Poor");
  if (hidden || poor.length === 0) return null;

  const names = poor.slice(0, 3).map((wb) => wb.name).join(", ");
  const more = poor.length > 3 ? ` +${poor.length - 3} more` : "";

  const dismiss = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // ignore
    }
    setHidden(true);
  };

  return (
    <div className="qa-banner" role="alert">
      <span>
        ⚠️ <strong>Water quality alert:</strong> {poor.length} water{" "}
        {poor.length === 1 ? "body has" : "bodies have"} Poor quality: {names}
        {more}.
      </span>

      <Link to="/water-bodies" className="qa-link">
        View
      </Link>

      <button className="qa-close" aria-label="Dismiss alert" onClick={dismiss}>
        ✕
      </button>
    </div>
  );
}

export default QualityAlert;