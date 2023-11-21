import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./loginPage";
import Registration from "./registrationPage";
import Dashboard from "./components/Dashboard";
import "./styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
