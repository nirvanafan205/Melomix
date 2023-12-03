// importing React and ReactDOM libraryies
// BrowserRouter, Routes, and Route is used for client-side routing
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

ReactDOM.render(<App />, document.getElementById("root"));
