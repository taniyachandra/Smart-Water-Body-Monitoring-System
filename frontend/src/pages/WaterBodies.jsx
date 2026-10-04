import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWaterBodies from "../services/useWaterBodies";

import "./WaterBodies.css";

const QUALITY_RANK = { Good: 0, Moderate: 1, Poor: 2 };

function qualityClass(quality) {
  return `quality-pill quality-${quality.toLowerCase()}`;
}

function WaterBodies() {
  const navigate = useNavigate();
  const { waterBodies, loading, error } = useWaterBodies();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [quality, setQuality] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  if (loading) return <main className="water-page"><p>Loading water bodies...</p></main>;
  if (error) return <main className="water-page"><p>{error}</p></main>;

  const filteredWaterBodies = waterBodies
    .filter((waterBody) => {
      const query = search.toLowerCase();

      const matchesSearch =
        waterBody.name.toLowerCase().includes(query) ||
        waterBody.state.toLowerCase().includes(query);

      const matchesType = type === "All" || waterBody.type === type;
      const matchesQuality = quality === "All" || waterBody.quality === quality;

      return matchesSearch && matchesType && matchesQuality;
    })
    .sort((a, b) => {
      if (sortBy === "quality") return QUALITY_RANK[a.quality] - QUALITY_RANK[b.quality];
      if (sortBy === "ph") return b.pH - a.pH;
      if (sortBy === "tds") return a.tds - b.tds;
      return a.name.localeCompare(b.name);
    });

  const hasFilters = search || type !== "All" || quality !== "All";

  const clearFilters = () => {
    setSearch("");
    setType("All");
    setQuality("All");
    setSortBy("name");
  };

  return (
    <main className="water-page">

      <div className="water-page-header">
        <p>EXPLORE INDIA</p>

        <h1>Water Bodies</h1>

        <p>
          Explore rivers, lakes and other water bodies across India.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="water-filters">

        <input
          type="text"
          placeholder="Search water body or state..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="River">River</option>
          <option value="Lake">Lake</option>
        </select>

        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="All">All Quality</option>
          <option value="Good">Good</option>
          <option value="Moderate">Moderate</option>
          <option value="Poor">Poor</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort: Name (A–Z)</option>
          <option value="quality">Sort: Best quality first</option>
          <option value="ph">Sort: pH (high to low)</option>
          <option value="tds">Sort: TDS (low to high)</option>
        </select>

      </div>

      <div className="wf-bar">
        <span className="wf-count">
          Showing {filteredWaterBodies.length} of {waterBodies.length} water bodies
        </span>

        {hasFilters && (
          <button className="wf-clear" onClick={clearFilters}>
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* Water Body Cards */}
      <div className="water-grid">

        {filteredWaterBodies.map((waterBody) => (
          <div
            className="water-body-card"
            key={waterBody.id}
          >

            <span className="water-type">
              {waterBody.type.toUpperCase()}
            </span>

            <h2>{waterBody.name}</h2>

            <p>{waterBody.state}, India</p>

            <div className="quality">
              <span>Water Quality</span>
              <span className={qualityClass(waterBody.quality)}>
                {waterBody.quality}
              </span>
            </div>

            <button
              className="details-btn"
              onClick={() => navigate(`/water-bodies/${waterBody.id}`)}
            >
              View Details
            </button>

          </div>
        ))}

      </div>

      {filteredWaterBodies.length === 0 && (
        <div className="empty-state">
          <p>No water bodies match your filters. Try changing the search or filters.</p>
          <button className="wf-clear" onClick={clearFilters}>
            ✕ Clear filters
          </button>
        </div>
      )}

    </main>
  );
}

export default WaterBodies;