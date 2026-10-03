import Waves from "./Waves";
import "./PageHero.css";

/**
 * Dark water-coloured header shared by every inner page. The page content
 * below it should use the `.overlap` class to rise over the waves.
 */
function PageHero({ title, text, before = null, children = null }) {
  return (
    <header className="page-hero on-dark">
      <div className="container page-hero-inner">
        {before}
        <h1>{title}</h1>
        {text && <p className="page-hero-text">{text}</p>}
        {children}
      </div>
      <Waves />
    </header>
  );
}

export default PageHero;
