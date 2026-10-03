import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

function NotFound() {
  return (
    <main>
      <PageHero
        title="Page not found"
        text="That page doesn't exist, or it has moved. Let's get you back to the water."
      >
        <Link to="/" className="btn btn-aqua" style={{ marginTop: 26 }}>
          Go to home
        </Link>
      </PageHero>
    </main>
  );
}

export default NotFound;
