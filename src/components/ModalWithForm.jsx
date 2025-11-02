import closeBtn from "../assets/close-button.svg";
import "../blocks/modalwithform.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClick,
  onSubmit,
  isFormValid,
  handleOverlayClick,
  alternate,
  handleSideModal
}) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}  onClick={handleOverlayClick}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" onClick={onClick}>
          <img
            src={closeBtn}
            alt="close modal button"
            className="modal__close-btn-image"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
          <button className="modal__submit-btn" type="submit" disabled={!isFormValid}>
            {buttonText}
          </button> 
          <button type="button" onClick={handleSideModal} className="modal__alternate">{alternate}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
