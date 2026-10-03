import { useState } from "react";
import { useNavigate } from "react-router-dom";
import waterBodies from "../data/waterBodies";

import "./WaterBodies.css";

function qualityClass(quality) {
  return `quality-pill quality-${quality.toLowerCase()}`;
}

function WaterBodies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const filteredWaterBodies = waterBodies.filter((waterBody) => {
    const matchesSearch =
      waterBody.name.toLowerCase().includes(search.toLowerCase()) ||
      waterBody.state.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      type === "All" || waterBody.type === type;

    return matchesSearch && matchesType;
  });

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
          <p>No water bodies match "{search}". Try a different name or state.</p>
        </div>
      )}

    </main>
  );
}

export default WaterBodies;