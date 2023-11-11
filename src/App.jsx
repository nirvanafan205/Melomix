import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

// key
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
      <h2>hello</h2>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
