import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Nav.css";

export function Nav() {
  const { user, logout } = useAuth();

  return (
    <header className="nav">
      <div className="nav__inner">
        <span className="nav__brand">🌶️ Thali</span>
        <nav className="nav__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>
            Recipes
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Favorites
          </NavLink>
        </nav>
        <div className="nav__user">
          <span>{user?.name}</span>
          <button type="button" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
