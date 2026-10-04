import { useParams } from "react-router-dom";
// import waterBodies from "../data/waterBodies";
import useWaterBodies from "../services/useWaterBodies";
import "./WaterBodyDetails.css";
import MapView from "../components/MapView";

function qualityClass(quality) {
  return `quality-pill quality-${quality.toLowerCase()}`;
}

function WaterBodyDetails() {
  const { id } = useParams();
     const { waterBodies, loading, error } = useWaterBodies();

   if (loading) return <main className="details-page"><p>Loading...</p></main>;
   if (error) return <main className="details-page"><p>{error}</p></main>;

  const waterBody = waterBodies.find(
    (item) => item.id === Number(id)
  );

  if (!waterBody) {
    return (
      <main className="details-page">
        <div className="not-found">
          <h2>Water body not found</h2>
          <p>The water body you're looking for doesn't exist or was removed.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">

      <p className="details-type">
        {waterBody.type.toUpperCase()}
      </p>

      <h1>{waterBody.name}</h1>

      <p className="details-location">
        {waterBody.state}, India
      </p>

      <div className="quality-box">
        <span>Water Quality</span>
        <span className={qualityClass(waterBody.quality)}>
          {waterBody.quality}
        </span>
      </div>

      <div className="water-info-grid">

  <div className="info-card">
    <span>pH</span>
    <strong>{waterBody.pH}</strong>
  </div>

  <div className="info-card">
    <span>Temperature</span>
    <strong>{waterBody.temperature}°C</strong>
  </div>

  <div className="info-card">
    <span>Turbidity</span>
    <strong>{waterBody.turbidity} NTU</strong>
  </div>

  <div className="info-card">
    <span>Dissolved Oxygen</span>
    <strong>{waterBody.dissolvedOxygen} mg/L</strong>
  </div>

  <div className="info-card">
    <span>TDS</span>
    <strong>{waterBody.tds} mg/L</strong>
  </div>

</div>
<div className="details-map">
  <h2>Location</h2>
 <MapView selectedWaterBody={waterBody} />
</div>

    </main>
  );
}

export default WaterBodyDetails;