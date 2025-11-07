import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
