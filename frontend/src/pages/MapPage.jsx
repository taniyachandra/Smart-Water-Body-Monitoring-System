import { useState } from "react";
import useWaterBodies from "../services/useWaterBodies";
import MapView from "../components/MapView";
import "./MapPage.css";

function qualityClass(quality) {
  return `quality-pill quality-${quality.toLowerCase()}`;
}

function MapPage() {
  const [selected, setSelected] = useState(null);
  const { waterBodies } = useWaterBodies();

  return (
    <main className="map-page">
      <div className="map-page-header">
        <p className="section-label">EXPLORE INDIA</p>
        <h1>Water Bodies Map</h1>
        <p>
          Browse rivers, lakes and reservoirs across India. Select one from
          the list to zoom in on the map.
        </p>
      </div>

      <div className="map-page-layout">
        <aside className="map-sidebar">
          <button
            className={`map-list-item ${!selected ? "active" : ""}`}
            onClick={() => setSelected(null)}
          >
            <div>
              <strong>All water bodies</strong>
              <span>{waterBodies.length} locations</span>
            </div>
          </button>

          {waterBodies.map((wb) => (
            <button
              key={wb.id}
              className={`map-list-item ${
                selected?.id === wb.id ? "active" : ""
              }`}
              onClick={() => setSelected(wb)}
            >
              <div>
                <strong>{wb.name}</strong>
                <span>{wb.state}</span>
              </div>
              <span className={qualityClass(wb.quality)}>{wb.quality}</span>
            </button>
          ))}
        </aside>

        <div className="map-page-view">
          <MapView selectedWaterBody={selected} />
        </div>
      </div>
    </main>
  );
}

export default MapPage;