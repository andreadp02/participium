import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "src/pages/LoginPage";
import { Register } from "src/pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboard/UserDashboardPage";
import NewReportPage from "./pages/UserDashboard/NewReportPage";
import { NavBar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";

import LandingPage from "src/pages/LandingPage";
import UsersPage from "src/pages/UsersPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Dashboard routes - no navbar/footer */}
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/dashboard/*" element={<UserDashboardPage />} />
          <Route path="/dashboard/new-report" element={<NewReportPage />} />
          
          {/* Public routes - with navbar/footer */}
          <Route path="*" element={
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/users" element={<UsersPage />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
