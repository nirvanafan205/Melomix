// importing React and ReactDOM libraryies
// BrowserRouter, Routes, and Route is used for client-side routing
import ReactDOM from "react-dom"; // Correct the import statement
import "./style.css";
import ArtistCarousel from "./components/carousel-stuff/ArtistCarousel"
import LandingPage from './pages/landing-page/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';


// serves as the root component of the application
const App = () => {
  return (
    <LandingPage />
  );
};

// Render the app component using ReactDOM.render
ReactDOM.render(<App />, document.getElementById("root"));