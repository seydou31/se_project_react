import closeBtn from "../assets/close-button.svg";

export default function DeleteModal({handleCloseModal, isOpen, handleDeleteCard, card, clothes}){
    
       

    return (
         <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
              <div className="modal__content modal__content_type_delete">
                 <button className="modal__close-btn" onClick={handleCloseModal}>
                          <img
                            src={closeBtn}
                            alt="close preview modal"
                            className="modal__x-btn"
                          />
                        </button>
                        <p className="modal__del-top">Are you sure you want to delete this item<span className="modal__del-span">This action is irreversible</span></p>
                        <button onClick={() => handleDeleteCard(card)} type="button" className="modal__del-mdl">Yes, delete item</button>
                        <button type="button" onClick={handleCloseModal} className="modal__del-btm">cancel</button>
              </div>
            </div>
    )
}