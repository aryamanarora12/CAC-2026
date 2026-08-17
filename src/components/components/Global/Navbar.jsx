import { NavLink } from "react-router-dom";
import "./Global.css"; // We will create this styling file next
import { User } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>CAC 2026</span>
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
          <User size={22} strokeWidth={2} />
        </NavLink>
      </div>
    </nav>
  );
}

