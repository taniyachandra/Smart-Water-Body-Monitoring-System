import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { api, fileUrl } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { PageLoader } from "../components/Skeleton";
import AdminWaterBodies from "./AdminWaterBodies";

import "./Admin.css";

const STATUSES = ["Pending review", "In progress", "Resolved", "Rejected"];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusKey(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function Admin() {
  const { user, token, ready } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [section, setSection] = useState("reports");

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    api("/admin/reports", { token })
      .then(setReports)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isAdmin, token]);

  const updateStatus = async (id, status) => {
    try {
      const updated = await api(`/admin/reports/${id}`, {
        method: "PATCH",
        body: { status },
        token,
      });
      setReports((list) => list.map((r) => (r._id === id ? updated : r)));
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!ready) return <main className="ad-page"><PageLoader /></main>;

  if (!user) {
    return (
      <main className="ad-page">
        <div className="ad-gate">
          <h2>Admin login required</h2>
          <Link to="/login" state={{ from: "/admin" }} className="btn-primary">
            Log in
          </Link>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="ad-page">
        <div className="ad-gate">
          <h2>Admin access only</h2>
          <p>Your account does not have permission to view this page.</p>
          <Link to="/" className="btn-primary">Go to Home</Link>
        </div>
      </main>
    );
  }
    const sectionTabs = (
    <div className="ad-sections">
      <button
        className={section === "reports" ? "active" : ""}
        onClick={() => setSection("reports")}
      >
        📋 Reports
      </button>
      <button
        className={section === "water" ? "active" : ""}
        onClick={() => setSection("water")}
      >
        💧 Water Bodies
      </button>
    </div>
  );

  if (section === "water") {
    return (
      <main className="ad-page">
        <div className="ad-header">
          <p className="section-label">ADMIN PANEL</p>
          <h1>Manage Water Bodies</h1>
          <p>Add new water bodies, edit readings or remove old entries.</p>
        </div>

        {sectionTabs}
        <AdminWaterBodies token={token} />
      </main>
    );
  }

  const count = (status) => reports.filter((r) => r.status === status).length;

  const visible =
    filter === "All" ? reports : reports.filter((r) => r.status === filter);

  return (
    <main className="ad-page">
      <div className="ad-header">
        <p className="section-label">ADMIN PANEL</p>
        <h1>Manage Reports</h1>
        <p>Review pollution reports submitted by users and update their status.</p>
      </div>
            {sectionTabs}

      <div className="ad-stats">
        <div className="ad-stat"><strong>{reports.length}</strong><span>Total reports</span></div>
        <div className="ad-stat"><strong>{count("Pending review")}</strong><span>Pending</span></div>
        <div className="ad-stat"><strong>{count("In progress")}</strong><span>In progress</span></div>
        <div className="ad-stat"><strong>{count("Resolved")}</strong><span>Resolved</span></div>
      </div>

      <div className="ad-tabs">
        {["All", ...STATUSES].map((item) => (
          <button
            key={item}
            className={`ad-tab ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && <PageLoader text="Loading reports..." />}
      {error && <p className="ad-error">{error}</p>}

      {!loading && !error && visible.length === 0 && (
        <div className="ad-gate"><h2>No reports here</h2></div>
      )}

      <div className="ad-list">
        {visible.map((report) => (
          <article className="ad-card" key={report._id}>
            {report.photo && (
              <a href={fileUrl(report.photo)} target="_blank" rel="noreferrer">
                <img className="ad-photo" src={fileUrl(report.photo)} alt="Pollution evidence" />
              </a>
            )}

            <div className="ad-card-body">
              <div className="ad-card-top">
                <div>
                  <h3>{report.waterBody}</h3>
                  <span className="ad-type">{report.pollutionType}</span>
                </div>

                <select
                  className={`ad-status ad-${statusKey(report.status)}`}
                  value={report.status}
                  onChange={(e) => updateStatus(report._id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <p className="ad-desc">{report.description}</p>

              <div className="ad-meta">
                <span>📍 {report.location}</span>
                <span>🗓 {formatDate(report.createdAt)}</span>
                <span>👤 {report.user ? `${report.user.name} (${report.user.email})` : "Deleted user"}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Admin;