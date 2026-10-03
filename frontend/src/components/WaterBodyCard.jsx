import { Link } from "react-router-dom";
import { qualityClass } from "../utils/quality";
import WaterScene from "./WaterScene";
import { IconPin, IconWaves } from "./Icons";
import "./WaterBodyCard.css";

function WaterBodyCard({ waterBody }) {
  return (
    <Link to={`/water-bodies/${waterBody.id}`} className="wb-card">
      <div className="wb-card-art">
        <WaterScene waterBody={waterBody} />
        <span className={qualityClass(waterBody.quality)}>{waterBody.quality}</span>
      </div>

      <div className="wb-card-body">
        <p className="wb-card-type">
          <IconWaves size={15} />
          {waterBody.type}
        </p>
        <h3>{waterBody.name}</h3>
        <p className="wb-card-loc">
          <IconPin size={15} />
          {waterBody.state}
        </p>

        <dl className="wb-card-stats">
          <div>
            <dt>pH</dt>
            <dd>{waterBody.pH}</dd>
          </div>
          <div>
            <dt>Oxygen</dt>
            <dd>
              {waterBody.dissolvedOxygen}
              <small> mg/L</small>
            </dd>
          </div>
          <div>
            <dt>Turbidity</dt>
            <dd>
              {waterBody.turbidity}
              <small> NTU</small>
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

export default WaterBodyCard;
