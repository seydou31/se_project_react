import '../blocks/itemcard.css'
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function ItemCard({item, onCardClick, onCardLike, isLoggedIn}){
   const {currentUser} = useContext(CurrentUserContext)

  const isLiked = item.likes.some(id => id === currentUser._id);


    const handleCardClick = () => {
            onCardClick(item)
        }

        const  handleLike = () => {
            onCardLike({
                id: item._id,
                isLiked
            })
        }

    return (
       <li className="itemcard__item">
        <p className="itemcard__description">{item.name}</p>
       {isLoggedIn &&  <button onClick={handleLike} className={`itemcard__like-btn ${isLiked? "itemcard__like-btn_type_black" : ""}`}></button>}
        <img onClick = {handleCardClick} className="itemcard__image" src={item.imageUrl} alt={item.name} />
       </li>
    )
}