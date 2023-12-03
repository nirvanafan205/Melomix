// importing React and ReactDOM libraryies
// BrowserRouter, Routes, and Route is used for client-side routing
import React from "react";
import { Route, Routes } from 'react-router';
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./loginPage";
import Registration from "./registrationPage";
import Dashboard from "./components/Dashboard";
import Settings from "./Settings";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// serves as the root component of the application
function App(){
  return(
    <>
    <div id="exclusive-container" class="container-fluid">
      <div id="nav-row" class="row">
        <div class="col-4">
        </div>
        <div class="col">
          <Link to={"/"} className="nav-link">Home</Link>
        </div>
        <div class="col">
          <Link to={"/dashboard"} className="nav-link">Dashboard</Link>
        </div>
        <div class="col">
          <Link to={"/login"} className="nav-link">Login</Link>
        </div>
        <div class="col">
          <Link to={"/settings"} className="nav-link">Settings</Link>
        </div>
        <div class="col-4">
        </div>
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
export default App;