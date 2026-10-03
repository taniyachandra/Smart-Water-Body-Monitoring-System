import { useNavigate } from "react-router-dom";
import "./Home.css";
import MapView from "../components/MapView";
// ----------------------------------HERO SECTION-----------------------------------
function Home() {
    const navigate = useNavigate();

    return (
        <main>
            <section className="hero">
                <div className="hero-content">
                    <p className="tagline">SMART WATER MONITORING SYSTEM</p>

                    <h1>
                        Monitor India's
                        <br />
                        <span>Water Bodies</span>
                    </h1>

                    <p className="hero-text">
                        Explore water bodies across India, monitor water quality,
                        and report pollution to help protect our water resources.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="primary-btn btn-primary"
                            onClick={() => navigate("/water-bodies")}
                        >
                            Explore Water Bodies
                        </button>

                        <button
                            className="secondary-btn btn-secondary"
                            onClick={() => navigate("/report")}
                        >
                            Report Pollution
                        </button>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="hero-card-top">
                        <span className="water-icon">💧</span>
                        <span className="quality-pill quality-good">Live monitoring</span>
                    </div>
                    <h2>India's Water</h2>
                    <p>Monitor · Analyze · Protect</p>
                    <div className="hero-card-stat">
                        <strong>120+</strong>
                        <span>water bodies tracked</span>
                    </div>
                </div>
                {[[8,18,9],[22,10,14],[38,24,11],[55,14,16],[70,20,10],[86,12,13]].map(([l,sz,d],i)=>(
                    <span key={i} className="bubble" style={{left:`${l}%`,width:sz,height:sz,animationDuration:`${d}s`,animationDelay:`${i*1.3}s`}} />
                ))}
                <div className="hero-waves" aria-hidden="true">
                    {[["wave-1","#7fd0e6"],["wave-2","#bfe8f6"],["wave-3","#eef8fc"]].map(([c,f])=>(
                        <svg key={c} className={c} viewBox="0 0 1440 120" preserveAspectRatio="none">
                            <path fill={f} d="M0 60 C 180 110, 360 10, 540 60 S 900 110, 1080 60 S 1260 20, 1440 60 V120 H0 Z" />
                        </svg>
                    ))}
                </div>
            </section>

            <section className="intro">
                <p className="section-label">OUR MISSION</p>

                <h2>Protect Water. Protect Our Future.</h2>

                <p>
                    SWMS brings water body information, quality monitoring,
                    pollution reporting and analytics together on one platform.
                </p>
            </section>
            {/* -----------------------------MONITORING STATISTICS----------------- */}
            <section className="stats">
                <div className="stats-heading">
                    <p className="section-label">WATER MONITORING</p>
                    <h2>India's Water Bodies at a Glance</h2>
                    <p>
                        Explore water body information and monitoring data
                        from different regions across India.
                    </p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>120+</h3>
                        <p>Water Bodies</p>
                    </div>

                    <div className="stat-card">
                        <h3>25+</h3>
                        <p>States Covered</p>
                    </div>

                    <div className="stat-card">
                        <h3>500+</h3>
                        <p>Quality Records</p>
                    </div>

                    <div className="stat-card">
                        <h3>50+</h3>
                        <p>Pollution Reports</p>
                    </div>
                </div>
            </section>
            {/* ---------------------------FEATURED WATER BODIES-------------- */}
            <section className="water-section">
                <div className="water-heading">
                    <div>
                        <p className="section-label">EXPLORE</p>
                        <h2>Featured Water Bodies</h2>
                    </div>

                    <button
                        className="view-all-btn"
                        onClick={() => navigate("/water-bodies")}
                    >
                        View All
                    </button>
                </div>

                <div className="water-grid">
                    <div
                        className="water-card"
                        onClick={() => navigate("/water-bodies/1")}
                    >
                        <div className="water-image">🌊</div>

                        <div className="water-info">
                            <p className="water-type">RIVER</p>
                            <h3>Ganga River</h3>
                            <p>Uttar Pradesh, India</p>

                            <div className="quality">
                                <span>Water Quality</span>
                                <span className="quality-pill quality-good">Good</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="water-card"
                        onClick={() => navigate("/water-bodies/2")}
                    >
                        <div className="water-image">🏞️</div>

                        <div className="water-info">
                            <p className="water-type">LAKE</p>
                            <h3>Dal Lake</h3>
                            <p>Jammu & Kashmir, India</p>

                            <div className="quality">
                                <span>Water Quality</span>
                                <span className="quality-pill quality-moderate">Moderate</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="water-card"
                        onClick={() => navigate("/water-bodies/3")}
                    >
                        <div className="water-image">💧</div>

                        <div className="water-info">
                            <p className="water-type">LAKE</p>
                            <h3>Loktak Lake</h3>
                            <p>Manipur, India</p>

                            <div className="quality">
                                <span>Water Quality</span>
                                <span className="quality-pill quality-good">Good</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ----------India Map Section--------------------------------- */}
            <section className="map-section">
                <div className="map-content">
                    <p className="section-label">EXPLORE INDIA</p>

                    <h2>Monitor Water Bodies Across India</h2>

                    <p>
                        Discover rivers, lakes, reservoirs and other water bodies
                        across different regions of India.
                    </p>

                    <button
                        className="map-btn btn-primary"
                        onClick={() => navigate("/map")}
                    >
                        Explore Interactive Map
                    </button>
                </div>

              <div className="map-preview">
  <MapView />
</div>
            </section>
        </main>
    );
}

export default Home;