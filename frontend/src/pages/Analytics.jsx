import waterBodies from "../data/waterBodies";
import "./Analytics.css";

const QUALITY_ORDER = ["Good", "Moderate", "Poor"];

function average(values) {
  const sum = values.reduce((a, b) => a + b, 0);
  return (sum / values.length).toFixed(1);
}

function Analytics() {
  const total = waterBodies.length;

  const qualityCounts = QUALITY_ORDER.map((quality) => ({
    quality,
    count: waterBodies.filter((wb) => wb.quality === quality).length,
  }));

  const typeCounts = ["River", "Lake"].map((type) => ({
    type,
    count: waterBodies.filter((wb) => wb.type === type).length,
  }));

  const avgPH = average(waterBodies.map((wb) => wb.pH));
  const avgDO = average(waterBodies.map((wb) => wb.dissolvedOxygen));
  const avgTurbidity = average(waterBodies.map((wb) => wb.turbidity));
  const avgTDS = average(waterBodies.map((wb) => wb.tds));

  const stateCounts = Object.values(
    waterBodies.reduce((acc, wb) => {
      acc[wb.state] = acc[wb.state] || { state: wb.state, count: 0 };
      acc[wb.state].count += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.count - a.count);

  return (
    <main className="analytics-page">
      <div className="analytics-header">
        <p className="section-label">DATA OVERVIEW</p>
        <h1>Water Quality Analytics</h1>
        <p>
          A snapshot of monitored water bodies, quality distribution and
          average readings across India.
        </p>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>Water bodies tracked</span>
          <strong>{total}</strong>
        </div>
        <div className="metric-card">
          <span>Average pH</span>
          <strong>{avgPH}</strong>
        </div>
        <div className="metric-card">
          <span>Avg. dissolved oxygen</span>
          <strong>{avgDO} mg/L</strong>
        </div>
        <div className="metric-card">
          <span>Avg. turbidity</span>
          <strong>{avgTurbidity} NTU</strong>
        </div>
      </div>

      <div className="analytics-grid">
        <section className="chart-card">
          <h2>Quality distribution</h2>
          <div className="bar-list">
            {qualityCounts.map(({ quality, count }) => (
              <div className="bar-row" key={quality}>
                <span
                  className={`quality-pill quality-${quality.toLowerCase()}`}
                >
                  {quality}
                </span>
                <div className="bar-track">
                  <div
                    className={`bar-fill quality-fill-${quality.toLowerCase()}`}
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
                <span className="bar-value">{count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-card">
          <h2>By water body type</h2>
          <div className="bar-list">
            {typeCounts.map(({ type, count }) => (
              <div className="bar-row" key={type}>
                <span className="bar-label">{type}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill-primary"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
                <span className="bar-value">{count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-card">
          <h2>Average TDS</h2>
          <div className="gauge">
            <strong>{avgTDS}</strong>
            <span>mg/L across all tracked water bodies</span>
          </div>
        </section>

        <section className="chart-card">
          <h2>Water bodies by state</h2>
          <div className="bar-list">
            {stateCounts.map(({ state, count }) => (
              <div className="bar-row" key={state}>
                <span className="bar-label">{state}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill-accent"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
                <span className="bar-value">{count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Analytics;
