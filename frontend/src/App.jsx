import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import WaterBodies from "./pages/WaterBodies";
import WaterBodyDetails from "./pages/WaterBodyDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QualityAlert from "./components/QualityAlert";
import ReportPollution from "./pages/ReportPollution";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MapPage from "./pages/MapPage";
import Analytics from "./pages/Analytics";
import MyReports from "./pages/MyReports";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        containerStyle={{ top: 84 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#062a40",
            border: "1px solid #cfe6f0",
            borderRadius: "14px",
            padding: "12px 16px",
            fontWeight: 600,
            boxShadow: "0 12px 30px rgba(7, 93, 134, 0.18)",
          },
          success: { iconTheme: { primary: "#12a06b", secondary: "#ffffff" } },
          error: { iconTheme: { primary: "#d2503a", secondary: "#ffffff" } },
        }}
      />

      <Navbar />
      <QualityAlert />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/water-bodies" element={<WaterBodies />} />

        <Route path="/water-bodies/:id" element={<WaterBodyDetails />} />

        <Route path="/report" element={<ReportPollution />} />

        <Route path="/map" element={<MapPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;