import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>💧</span>
        SWMS
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/water-bodies">Water Bodies</a>
        <a href="/map">Map</a>
        <a href="/analytics">Analytics</a>
        <a href="/report">Report Pollution</a>
      </div>

      <button className="login-btn">Login</button>
    </nav>
  );
}

export default Navbar;