import avatar from "../assets/avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Sidebar({handleEditProfileModal, onClick}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="profile__sidebar">
      <div className="profile__info">
        <img
          className="profile__avatar"
          alt="avatar"
          src={currentUser.avatar}
        />
        <p className="profile__user">{currentUser.name}</p>
      </div>
      <div className="profile__edit-log">
        <button className="profile__edit-btn" onClick={handleEditProfileModal}>Change Profile data</button>
        <button  onClick={onClick} className="profile__logout-btn">Log out</button>
      </div>
    </section>
  );
}
