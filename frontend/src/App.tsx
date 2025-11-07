import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path="/users" element={<UsersPage />} />
          <Route path="/map" element={<MapPage />} />
          {/* TODO: remove it after integrating the form properly */}
          <Route
            path="/report"
            element={<ReportForm lat={45.0703} lng={7.6869} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
