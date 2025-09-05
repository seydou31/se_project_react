import ToggleSwitch from "../components/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import headerlogo from "../assets/Logo.svg";
import avatar from "../assets/avatar.png";
import "../blocks/header.css";

export default function Header({ onClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link  className="header__link" to="/se_project_react"><img className="header__logo" alt="header-logo" src={headerlogo} /></Link>
        <p className="header__time">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <div className="header__btn-user">
          <ToggleSwitch />
          <button onClick={onClick} className="header__button" type="button">
            + Add clothes
          </button>
          <Link className="header__link" to="/se_project_react/profile"><p className="header__user">Seydou Badiaka</p></Link>
        </div>
        <img className="header__avatar" alt="user-avatar" src={avatar} />
      </div>
    </header>
  );
}
