import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./loginPage";
import Registration from "./registrationPage";
import ReactDOM from "react-dom"; // Correct the import statement
import Dashboard from "./components/Dashboard";
import "./style.css";
import "./styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Dashboard />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
