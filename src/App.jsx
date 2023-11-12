// Importing necessary modules and components
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import SpotifyAPI from "./Login";
import DashBoard from "./DashBoard";
import LandingPage from "./LandingPage";

// Extracting the Spotify authorization code from the URL query parameters
const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return (
    /*
      Using BrowserRouter as the root of application
      Defining routes using the Routes component
      routes are specified:
      The default route ("/") renders the LandingPage component
      The "/search" route renders either the DashBoard or SpotifyAPI component based on the presence of the Spotify authorization code (code)
    */

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/search"
          element={code ? <DashBoard code={code} /> : <SpotifyAPI />}
        />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

/*
    App.jsx file sets up the main structure of React application
    handles client-side routing with React Router
    conditionally renders different components based on the presence of a Spotify authorization code.
    serves as the entry point for React application.
*/