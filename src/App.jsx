// importing React and ReactDOM libraryies
// BrowserRouter, Routes, and Route is used for client-side routing
import React from "react";
import ReactDOM from "react-dom"; // Correct the import statement
import LandingPage from './pages/landing-page/LandingPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./loginPage";
import Registration from "./registrationPage";
import Dashboard from "./components/Dashboard";
import "./styles.css";

// serves as the root component of the application
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="/landing" element ={<LandingPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
