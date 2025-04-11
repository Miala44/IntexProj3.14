import { NavLink } from 'react-router-dom';
import './NavBar.css';
const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/movie" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/recommendations" className="nav-link">
        Recommendations
      </NavLink>
      <NavLink to="/adminmovies" className="nav-link">
        Admin
      </NavLink>
      <NavLink to="/privacyPage" className="nav-link">
        Privacy
      </NavLink>
    </nav>
  );
};
export default NavBar;
