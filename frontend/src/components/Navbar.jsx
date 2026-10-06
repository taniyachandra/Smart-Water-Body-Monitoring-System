import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const navItem = ({ isActive }) => (isActive ? "active" : "");

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const firstName = user?.name?.split(" ")[0];

  // Bahar click ya Esc dabane par dropdown band
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setOpen(false);
    navigate("/");
  };

  const closeAll = () => setOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>💧</span>
        SWMS
      </Link>

      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" className={navItem} onClick={closeAll}>Home</NavLink>
        <NavLink to="/water-bodies" className={navItem} onClick={closeAll}>Water Bodies</NavLink>
        <NavLink to="/map" className={navItem} onClick={closeAll}>Map</NavLink>
        <NavLink to="/analytics" className={navItem} onClick={closeAll}>Analytics</NavLink>
        <NavLink to="/report" className={navItem} onClick={closeAll}>Report Pollution</NavLink>

        {user ? (
          <div className="nb-user" ref={menuRef}>

            <button
              className="nb-user-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
            >
              <span className="nb-avatar">{initials}</span>
              <span className="nb-name">{firstName}</span>
              <span className={`nb-chevron ${menuOpen ? "up" : ""}`}>▾</span>
            </button>

            {menuOpen && (
              <div className="nb-dropdown">
                <div className="nb-dropdown-head">
                  <span className="nb-avatar big">{initials}</span>
                  <div>
                    <p className="nb-dd-name">
  {user.name}
  {user.role === "admin" && <span className="nb-role">Admin</span>}
</p>
                    <p className="nb-dd-email">{user.email}</p>
                  </div>
                </div>
                {user.role === "admin" && (
  <Link
    to="/admin"
    className="nb-dd-link"
    onClick={() => {
      setMenuOpen(false);
      setOpen(false);
    }}
  >
    🛠 Admin Panel
  </Link>
)}
                <Link to="/my-reports"className="nb-dd-link"onClick={() => { setMenuOpen(false);setOpen(false);}}> 📄 My Reports</Link>
                <button className="nb-logout" onClick={handleLogout}>
                  ⎋ Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nb-auth">
            <NavLink to="/login" className="nb-login" onClick={closeAll}>
              Login
            </NavLink>
            <NavLink to="/signup" className="nb-signup" onClick={closeAll}>
              Sign up
            </NavLink>
            
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;