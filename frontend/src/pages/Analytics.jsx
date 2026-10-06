import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import useWaterBodies from "../services/useWaterBodies";
import { PageLoader } from "../components/Skeleton";
import "./Analytics.css";

const QUALITY_COLORS = {
  Good: "#12a06b",
  Moderate: "#c98a14",
  Poor: "#d2503a",
};

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #cfe6f0",
  boxShadow: "0 8px 20px rgba(7, 93, 134, 0.15)",
};

function average(values) {
  const sum = values.reduce((a, b) => a + b, 0);
  return (sum / values.length).toFixed(1);
}

function Analytics() {
  const { waterBodies, loading, error } = useWaterBodies();

  if (loading)
    return (
      <main className="analytics-page">
        <PageLoader text="Loading analytics..." />
      </main>
    );

  if (error || waterBodies.length === 0)
    return (
      <main className="analytics-page">
        <p>{error || "No data available."}</p>
      </main>
    );

  const total = waterBodies.length;

  const avgPH = average(waterBodies.map((wb) => wb.pH));
  const avgDO = average(waterBodies.map((wb) => wb.dissolvedOxygen));
  const avgTurbidity = average(waterBodies.map((wb) => wb.turbidity));

  // Chart data
  const qualityData = Object.keys(QUALITY_COLORS)
    .map((quality) => ({
      name: quality,
      value: waterBodies.filter((wb) => wb.quality === quality).length,
    }))
    .filter((item) => item.value > 0);

  const stateData = Object.values(
    waterBodies.reduce((acc, wb) => {
      acc[wb.state] = acc[wb.state] || { name: wb.state, count: 0 };
      acc[wb.state].count += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.count - a.count);

  const tdsData = waterBodies.map((wb) => ({
    name: wb.name,
    tds: wb.tds,
    quality: wb.quality,
  }));

  const oxygenData = waterBodies.map((wb) => ({
    name: wb.name,
    oxygen: wb.dissolvedOxygen,
    quality: wb.quality,
  }));

  return (
    <main className="analytics-page">
      <div className="analytics-header">
        <p className="section-label">DATA OVERVIEW</p>
        <h1>Water Quality Analytics</h1>
        <p>
          A snapshot of monitored water bodies, quality distribution and
          readings across India.
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
        {/* 1. Quality distribution */}
        <section className="chart-card">
          <h2>Quality distribution</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {qualityData.map((item) => (
                    <Cell key={item.name} fill={QUALITY_COLORS[item.name]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 2. By state */}
        <section className="chart-card">
          <h2>Water bodies by state</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stateData}
                layout="vertical"
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f9" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={110} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" name="Water bodies" fill="#0a7fb5" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 3. TDS per water body */}
        <section className="chart-card">
          <h2>TDS by water body (mg/L)</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tdsData} margin={{ top: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f9" />
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="tds" name="TDS" radius={[8, 8, 0, 0]}>
                  {tdsData.map((item) => (
                    <Cell key={item.name} fill={QUALITY_COLORS[item.quality]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 4. Dissolved oxygen per water body */}
        <section className="chart-card">
          <h2>Dissolved oxygen by water body (mg/L)</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oxygenData} margin={{ top: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f9" />
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="oxygen" name="Dissolved oxygen" radius={[8, 8, 0, 0]}>
                  {oxygenData.map((item) => (
                    <Cell key={item.name} fill={QUALITY_COLORS[item.quality]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Analytics;