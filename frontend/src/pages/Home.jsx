import "./Home.css";
import MapView from "../components/MapView";
// ----------------------------------HERO SECTION-----------------------------------
function Home() {
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
                        <button className="primary-btn">
                            Explore Water Bodies
                        </button>

                        <button className="secondary-btn">
                            Report Pollution
                        </button>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="water-icon">💧</div>
                    <h2>India's Water</h2>
                    <p>Monitor • Analyze • Protect</p>
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

                    <button className="view-all-btn">View All</button>
                </div>

                <div className="water-grid">
                    <div className="water-card">
                        <div className="water-image">🌊</div>

                        <div className="water-info">
                            <p className="water-type">RIVER</p>
                            <h3>Ganga River</h3>
                            <p>Uttar Pradesh, India</p>

                            <div className="quality">
                                <span>Water Quality</span>
                                <strong>Good</strong>
                            </div>
                        </div>
                    </div>

                    <div className="water-card">
                        <div className="water-image">🏞️</div>

                        <div className="water-info">
                            <p className="water-type">LAKE</p>
                            <h3>Dal Lake</h3>
                            <p>Jammu & Kashmir, India</p>

                            <div className="quality">
                                <span>Water Quality</span>
                                <strong>Moderate</strong>
                            </div>
                        </div>
                    </div>

                    <div className="water-card">
                        <div className="water-image">💧</div>

                        <div className="water-info">
                            <p className="water-type">LAKE</p>
                            <h3>Loktak Lake</h3>
                            <p>Manipur, India</p>

                            <div className="quality">
                                <span>Water Quality</span>
                                <strong>Good</strong>
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

                    <button className="map-btn">
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