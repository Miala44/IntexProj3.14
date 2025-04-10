import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/movie" className="nav-link">Home</NavLink>
      <NavLink to="/recommendations" className="nav-link">Recommendations</NavLink>
      <NavLink to="/adminmovies" className="nav-link">Admin</NavLink>
      <NavLink to="/logout" className="nav-link">Logout</NavLink>
    </nav>
  );
};

export default NavBar;
