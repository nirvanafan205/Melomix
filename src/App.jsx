import React, { useEffect } from "react";
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./loginPage";
import Registration from "./registrationPage";
import Dashboard from "./components/Dashboard";
import Settings from "./Settings";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import StarryNight from "./components/starryNight";

import MyFooter from "./components/footer/footer"

function App() {
  const location = useLocation();

  useEffect(() => {
    // Add a class to the body based on the active link
    document.body.className = location.pathname.replace("/", "") || "home";
  }, [location.pathname]);

  return (
    <>
      <div id="exclusive-container" className="container-fluid">
        <div id="nav-row" className="row">
          <div className="col-4"></div>
          <div className="col">
            <Link to={"/"} className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}>
              Home
            </Link>
          </div>
          <div className="col">
            <Link to={"/dashboard"} className={`nav-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`}>
              Dashboard
            </Link>
          </div>
          <div className="col">
            <Link to={"/login"} className={`nav-link ${location.pathname === '/login' ? 'active-link' : ''}`}>
              Login
            </Link>
          </div>
          <div className="col">
            <Link to={"/settings"} className={`nav-link ${location.pathname === '/settings' ? 'active-link' : ''}`}>
              Settings
            </Link>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
    </>
  );
}
//<MyFooter></MyFooter>
export default App;
