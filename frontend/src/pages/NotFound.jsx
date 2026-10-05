import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="nf-page">
      <div className="nf-card">
        <div className="nf-code">
          4<span>💧</span>4
        </div>

        <h1>Page not found</h1>

        <p>
          Looks like this page dried up. The link may be broken, or the page
          has moved.
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-primary">
            Go to Home
          </Link>
          <Link to="/water-bodies" className="nf-btn nf-secondary">
            Browse Water Bodies
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;