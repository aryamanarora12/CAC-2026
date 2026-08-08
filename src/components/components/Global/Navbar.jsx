import { NavLink } from "react-router-dom";
import "./NavBar.css"; // We will create this styling file next

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>CAC Planner</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Home
        </NavLink>
        <NavLink to="/college" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Planning
        </NavLink>
        <NavLink to="/opportunities" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Opportunities
        </NavLink>
        <NavLink to="/academics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Academics
        </NavLink>
        <NavLink to="/forum" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Forum
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          My Profile
        </NavLink>
      </div>
    </nav>
  );
}

