import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
   import { api, fileUrl } from "../services/api";

import "./MyReports.css";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status) {
  return status.toLowerCase().includes("resolved")
    ? "mr-status mr-resolved"
    : "mr-status";
}

function MyReports() {
  const { user, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api("/reports/mine", { token })
      .then(setReports)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <main className="mr-page">
      <div className="mr-header">
        <p className="section-label">YOUR ACTIVITY</p>
        <h1>My Reports</h1>
        <p>Track the pollution reports you have submitted.</p>
      </div>

      {!user && (
        <div className="mr-empty">
          <h2>Log in to see your reports</h2>
          <Link
            to="/login"
            state={{ from: "/my-reports" }}
            className="btn-primary"
          >
            Log in
          </Link>
        </div>
      )}

      {user && loading && <p>Loading your reports...</p>}

      {user && error && <p className="mr-error">{error}</p>}

      {user && !loading && !error && reports.length === 0 && (
        <div className="mr-empty">
          <h2>No reports yet</h2>
          <p>When you report pollution, it will show up here.</p>
          <Link to="/report" className="btn-primary">
            Report Pollution
          </Link>
        </div>
      )}

      {user && reports.length > 0 && (
        <div className="mr-list">
          {reports.map((report) => (
            <article className="mr-card" key={report._id}>
                 {report.photo && (
     <img
       className="mr-photo"
       src={fileUrl(report.photo)}
       alt="Pollution evidence"
     />
   )}
              <div className="mr-card-top">
                <div>
                  <h3>{report.waterBody}</h3>
                  <span className="mr-type">{report.pollutionType}</span>
                </div>
                <span className={statusClass(report.status)}>
                  {report.status}
                </span>
              </div>

              <p className="mr-desc">{report.description}</p>

              <div className="mr-meta">
                <span>📍 {report.location}</span>
                <span>🗓 {formatDate(report.createdAt)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyReports;