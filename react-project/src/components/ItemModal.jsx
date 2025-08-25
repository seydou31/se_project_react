import closeBtn from '../assets/close-button.svg'

export default function ItemModal({onClick, isOpen,  card}) {
  return (
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-btn" onClick={onClick}>
        <img
          src={closeBtn}
          alt="closebutton"
          className="modal__close-btn-image"
        />
      </button>
      <img src={card.link} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">weather: {card.weather}</p>
      </div>
      </div>
    </div>
  );
}
