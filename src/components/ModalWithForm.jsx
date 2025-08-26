import closeBtn from '../assets/close-button.svg'
import '../blocks/modalwithform.css'

export default function ModalWithForm({children, buttonText, title, isOpen, onClick, dom

}) {
  return (
    <div ref={dom} className={`modal ${isOpen ? 'modal_is-opened' : ''}`}>
        <div className="modal__content">
            <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" onClick={onClick}><img src={closeBtn} alt="closebutton" className="modal__close-btn-image" /></button>
      <form className="modal__form">
       {children}
        <button className="modal__submit-btn" type="submit">{buttonText}</button>
      </form>
      </div>
    </div>
  );
}
