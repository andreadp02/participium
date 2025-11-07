import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "src/pages/LoginPage";
import { Register } from "src/pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboard/UserDashboardPage";
import { NavBar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";
import ReportForm from "src/components/report/ReportFrom";

import LandingPage from "src/pages/LandingPage";
import UsersPage from "src/pages/UsersPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<MapPage />} />
          {/* TODO: remove it after integrating the form properly */}
          <Route
            path="/report"
            element={<ReportForm lat={45.0703} lng={7.6869} />}
          />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
