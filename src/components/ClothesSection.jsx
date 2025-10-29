import ItemCard from "./ItemCard.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function ClothesSection({ onClick, handleCardClick, clothes, isLoggedIn }) {

const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="profile__content">
      <div className="profile__items-hdr">
        <span className="profile__span">Your Items</span>
        <button className="profile__button" type="button" onClick={onClick}>
          + Add new
        </button>
      </div>
      <div className="profile__items">
        {clothes
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
              isLoggedIn={isLoggedIn}
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </div>
    </section>
  );
}
