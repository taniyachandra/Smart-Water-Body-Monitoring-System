import "./Home.css";

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
    </main>
  );
}

export default Home;