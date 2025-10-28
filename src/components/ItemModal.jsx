import closeBtn from "../assets/close-button.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function ItemModal({
  onClick,
  isOpen,
  card,
  handleDeleteModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!currentUser) {
    return null;
  }
  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-btn" onClick={onClick}>
          <img
            src={closeBtn}
            alt="close preview modal"
            className="modal__close-btn-image"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={handleDeleteModal}
              type="button"
              className="modal__del-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
