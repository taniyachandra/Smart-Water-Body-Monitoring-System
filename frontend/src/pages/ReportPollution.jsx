import { useState } from "react";
import { Link } from "react-router-dom";

import waterBodies from "../data/waterBodies";
import { useAuth } from "../context/AuthContext";

import "./ReportPollution.css";

function ReportPollution() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    waterBody: "",
    pollutionType: "",
    description: "",
    location: "",
  });

  const [submittedReport, setSubmittedReport] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedReport(formData);

    console.log("Pollution Report:", formData);

    alert("Pollution report submitted successfully!");

    setFormData({
      waterBody: "",
      pollutionType: "",
      description: "",
      location: "",
    });
  };

  return (
    <main className="report-page">

      <div className="report-header">
        <p>HELP PROTECT WATER</p>

        <h1>Report Pollution</h1>

        <p>
          Report pollution or unusual activity observed
          near a water body.
        </p>
      </div>

      {!user && (
        <div className="report-login-gate">
          <h2>Log in to submit a report</h2>
          <p>
            We ask reporters to sign in so we can follow up if we need more
            details about what you observed.
          </p>
          <Link to="/login" state={{ from: "/report" }} className="btn-primary auth-gate-btn">
            Log in to continue
          </Link>
        </div>
      )}

      {user && (
      <form
        className="report-form"
        onSubmit={handleSubmit}
      >

        <label>Water Body</label>

        <select
          name="waterBody"
          value={formData.waterBody}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Water Body
          </option>

          {waterBodies.map((waterBody) => (
            <option
              key={waterBody.id}
              value={waterBody.name}
            >
              {waterBody.name}
            </option>
          ))}
        </select>

        <label>Pollution Type</label>

        <select
          name="pollutionType"
          value={formData.pollutionType}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Pollution Type
          </option>

          <option value="Plastic Waste">
            Plastic Waste
          </option>

          <option value="Chemical Pollution">
            Chemical Pollution
          </option>

          <option value="Sewage">
            Sewage
          </option>

          <option value="Oil Spill">
            Oil Spill
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <label>Location</label>

        <input
          type="text"
          name="location"
          placeholder="Enter location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Description</label>

        <textarea
          name="description"
          placeholder="Describe the pollution..."
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Upload Photo</label>

        <input
          type="file"
          accept="image/*"
        />

        <button
          type="submit"
          className="submit-report-btn"
        >
          Submit Report
        </button>

      </form>
      )}

      {submittedReport && (
        <div className="submitted-report">

          <div className="submitted-report-header">
            <h2>Report submitted</h2>
            <span className="status-pill">Pending review</span>
          </div>

          <dl>
            <div>
              <dt>Water Body</dt>
              <dd>{submittedReport.waterBody}</dd>
            </div>

            <div>
              <dt>Pollution Type</dt>
              <dd>{submittedReport.pollutionType}</dd>
            </div>

            <div>
              <dt>Location</dt>
              <dd>{submittedReport.location}</dd>
            </div>

            <div>
              <dt>Description</dt>
              <dd>{submittedReport.description}</dd>
            </div>
          </dl>

        </div>
      )}

    </main>
  );
}

export default ReportPollution;