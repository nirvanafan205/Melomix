// importing React and ReactDOM libraryies
// BrowserRouter, Routes, and Route is used for client-side routing
import ReactDOM from "react-dom"; // Correct the import statement
import "./style.css";
import ArtistCarousel from "./components/carousel-stuff/ArtistCarousel"
import 'bootstrap/dist/css/bootstrap.min.css';

// serves as the root component of the application
const App = () => {

  const artists = [
    { id: 1, name: "Artist One", portraitUrl: "https://picsum.photos/200/300?random=1" },
    { id: 2, name: "Artist Two", portraitUrl: "https://picsum.photos/200/300?random=2" },
    { id: 3, name: "Artist Three", portraitUrl: "https://picsum.photos/200/300?random=3" },
    { id: 4, name: "Artist Four", portraitUrl: "https://picsum.photos/200/300?random=4" },
    { id: 5, name: "Artist Five", portraitUrl: "https://picsum.photos/200/300?random=5" },
    { id: 6, name: "Artist Six", portraitUrl: "https://picsum.photos/200/300?random=6" },
    { id: 7, name: "Artist Seven", portraitUrl: "https://picsum.photos/200/300?random=7" },
    { id: 8, name: "Artist Eight", portraitUrl: "https://picsum.photos/200/300?random=8" },
];


  return (
    <div>
      <h1>Hello World</h1>
      <ArtistCarousel artists={artists} acessToken={1234}/>
    </div>
  );
};

// Render the app component using ReactDOM.render
ReactDOM.render(<App />, document.getElementById("root"));