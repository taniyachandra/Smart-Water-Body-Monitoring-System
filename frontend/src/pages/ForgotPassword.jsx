import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api("/auth/forgot-password", { method: "POST", body: { email } });
      setSent(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="fp-page">
      <div className="fp-card">
        <h1>Forgot password?</h1>

        {sent ? (
          <>
            <p>
              If <strong>{email}</strong> is registered, a reset link has been
              sent. It is valid for 1 hour.
            </p>
            <Link to="/login" className="fp-btn">Back to login</Link>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>Enter your email and we will send you a link to reset your password.</p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="fp-btn" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <Link to="/login" className="fp-back">Back to login</Link>
          </form>
        )}
      </div>
    </main>
  );
}

export default ForgotPassword;