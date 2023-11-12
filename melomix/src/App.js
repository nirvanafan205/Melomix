import { Route, Routes } from 'react-router';
import Home from './pages/home'
import Register from "./pages/register";
import Login from "./pages/login";
import './styles/App.css';
import { Link } from 'react-router-dom';

function App() { 
  return (
    <>
    {/* Fluid lets it cover the whole width of the page */}
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
        </div>
        <div class="col">
          <h3><Link to={"/"} className="nav-link">Home</Link></h3>
        </div>
        <div class="col">
          <h3><Link to={"/login"} className="nav-link">Login</Link></h3>
        </div>
        <div class="col">
          <h3><Link to={"/register"} className="nav-link">Sign-Up</Link></h3>
        </div>
        <div class="col-4">
        </div>
      </div>
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
