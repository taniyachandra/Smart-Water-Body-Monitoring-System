import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
   import toast from "react-hot-toast";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

     const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

      const result = await login(formData);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success("Welcome back!");

    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-label">Welcome back</p>
        <h1>Log in to SWMS</h1>
        <p className="auth-sub">
          Track water bodies, view quality data and manage your pollution
          reports.
        </p>

        {location.state?.from && (
          <div className="auth-notice">
            Log in to continue — you'll return right where you left off.
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
