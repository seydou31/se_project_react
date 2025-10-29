import ToggleSwitch from "../components/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import headerlogo from "../assets/Logo.svg";
import avatar from "../assets/avatar.png";
import "../blocks/header.css";

export default function Header({
  onClick,
  weatherData,
  handleRegistrationModal,
  handleLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const userFirstLetter = currentUser?.name?.charAt(0).toUpperCase();
  return (
    <header className="header">
      <div className="header__left">
        <Link className="header__link" to="/">
          <img className="header__logo" alt="header-logo" src={headerlogo} />
        </Link>
        <p className="header__time">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <div className="header__btn-user">
          <ToggleSwitch />
         {isLoggedIn && <button onClick={onClick} className="header__button" type="button">
            + Add clothes
          </button>}
          {isLoggedIn ? (
            currentUser.avatar ? (
              <Link className="header__link" to="/profile">
                <p className="header__user">{currentUser.name}</p>
                <img
                  className="header__avatar"
                  alt="user-avatar"
                  src={currentUser.avatar}
                />
              </Link>
            ) : (
              <Link className="header__link" to="/profile">
              <div className="header-placeholder">
                {userFirstLetter}
              </div>
              </Link>
            )
          ) : (
            <>
              <button
                className="header__signin"
                onClick={handleRegistrationModal}
              >
                Sign Up
              </button>
              <button className="header__signup" onClick={handleLoginModal}>
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
