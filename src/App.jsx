import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

// Import your components
import SpotifyAPI from "./Login";
import DashBoard from "./DashBoard";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/search"
          element={code ? <DashBoard code={code} /> : <SpotifyAPI />}
        />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
