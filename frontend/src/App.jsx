import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import WaterBodies from "./pages/WaterBodies";
import WaterBodyDetails from "./pages/WaterBodyDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReportPollution from "./pages/ReportPollution";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage";
import Analytics from "./pages/Analytics";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/water-bodies" element={<WaterBodies />} />

        <Route path="/water-bodies/:id" element={<WaterBodyDetails />} />

        <Route path="/report" element={<ReportPollution />} />

        <Route path="/map" element={<MapPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-reports" element={<MyReports />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;