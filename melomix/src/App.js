import { Route, Routes } from 'react-router';
import Home from './pages/home'
import Profile from "./pages/profile";
import Playlists from "./pages/playlists";
import './styles/App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
    {/* Fluid lets it cover the whole width of the page */}
    <div class="container-fluid">
      <div class="row">
        
          <h2><Link to={"/"} className="nav-link">Home</Link></h2>
          <h2><Link to={"/playlists"} className="nav-link"> Playlists</Link></h2>
          <h2><Link to={"/profile"} className="nav-link">Profile</Link></h2>
        
      </div>
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/playlists" element={<Playlists />} />
    </Routes>
    </>
  );
}

export default App;
