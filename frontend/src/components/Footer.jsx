import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="sf">
      <div className="sf-grid">
        <div className="sf-box">
          <h4>💧 SWMS</h4>
          <p>Monitor water quality, report pollution and protect India's rivers and lakes.</p>
        </div>

        <div className="sf-box">
          <h4>Useful Links</h4>
          <a href="https://cpcb.nic.in" target="_blank" rel="noreferrer">CPCB India</a>
          <a href="https://nmcg.nic.in" target="_blank" rel="noreferrer">Namami Gange</a>
          <a href="https://jalshakti-dowr.gov.in" target="_blank" rel="noreferrer">Jal Shakti Ministry</a>
        </div>

        <div className="sf-box">
          <h4>Contact</h4>
          <p>📧 swms.support@example.com</p>
          <p>📍 Uttar Pradesh, India</p>
        </div>
      </div>

      <div className="sf-bottom">
        © {new Date().getFullYear()} SWMS · Protect water, protect our future
      </div>
    </footer>
  );
}

export default Footer;