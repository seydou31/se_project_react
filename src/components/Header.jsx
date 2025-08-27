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
        <img className="header__logo" alt="header-logo" src={headerlogo} />
        <p className="header__time">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <button onClick={onClick} className="header__button" type="button">
          + Add clothes
        </button>
        <p className="header__user">Seydou Badiaka</p>
        <img className="header__avatar" alt="user-avatar" src={avatar} />
      </div>
    </header>
  );
}
