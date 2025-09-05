import closeBtn from "../assets/close-button.svg";
import "../blocks/modalwithform.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClick,
  dom,
  onSubmit,
  isFormValid
}) {
  return (
    <div ref={dom} className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
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
          <button className="modal__submit-btn" type="submit" disabled={!isFormValid}>
            {buttonText}
          </button> 
        </form>
      </div>
    </div>
  );
}
