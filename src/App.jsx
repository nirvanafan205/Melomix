// importing React and ReactDOM libraryies
// BrowserRouter, Routes, and Route is used for client-side routing
import ReactDOM from "react-dom"; // Correct the import statement
import "./style.css";

// serves as the root component of the application
const App = () => {
  return <h1>Hello World</h1>;
};

// Render the app component using ReactDOM.render
ReactDOM.render(<App />, document.getElementById("root"));