import React, { useEffect, useContext } from "react";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./loginPage";
import Registration from "./registrationPage";
import Dashboard from "./components/Dashboard";
import Settings from "./Settings";
import { UserContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import MyFooter from "./components/footer/footer"

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Add a class to the body based on the active link
    document.body.className = location.pathname.replace("/", "") || "home";
  }, [location.pathname]);

  const showNavBar = !["/login", "/registration", "/settings"].includes(
    location.pathname
  );

  const handleLogout = () => {
    setUser(null); // Clears the user context
    navigate("/"); // Redirects to the login page
  };

  return (
    <>
      {showNavBar && (
        <div id="exclusive-container" className="container-fluid">
          <div id="nav-row" className="row justify-content-center">
            <div className="col-auto">
              <Link
                to={"/"}
                className={`nav-link ${
                  location.pathname === "/" ? "active-link" : ""
                }`}
              >
                Home
              </Link>
            </div>
            {user && (
              <>
                <div className="col-auto">
                  <Link
                    to={"/dashboard"}
                    className={`nav-link ${
                      location.pathname === "/dashboard" ? "active-link" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="col-auto">
                  <span className="nav-link">{user.username}</span>
                </div>
                <div className="col-auto">
                  <button onClick={handleLogout} className="logout-button btn">
                    Logout
                  </button>
                </div>
                <div className="col-auto">
                  <Link
                    to={"/settings"}
                    className={`nav-link ${
                      location.pathname === "/settings" ? "active-link" : ""
                    }`}
                  >
                    Settings
                  </Link>
                </div>
              </>
            )}
            {!user && (
              <div className="col-auto">
                <Link
                  to={"/login"}
                  className={`nav-link ${
                    location.pathname === "/login" ? "active-link" : ""
                  }`}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Only render the Settings route if the user is logged in */}
        {user && <Route path="/settings" element={<Settings />} />}
      </Routes>
      
    </>
  );
}
//<MyFooter></MyFooter>
export default App;
