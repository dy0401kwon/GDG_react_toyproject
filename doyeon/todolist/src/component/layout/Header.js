import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Header.css";

const Header = () => {
  const { profile, themeColor } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <header className="Header">
      <div>
        <h3>오늘은 📅</h3>
        <h1 style={{ color: themeColor }}>{profile.name}'s todolist</h1>
        <p style={{ color: themeColor }}>{profile.intro}</p>
      </div>

      <nav className="nav">
        {["/", "/habit", "/mypage"].map((path, idx) => {
          const label = ["Todo", "Habit", "MyPage"][idx];
          const active = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              style={{
                color: active ? themeColor : "#999",
                borderBottom: active ? `2px solid ${themeColor}` : "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;