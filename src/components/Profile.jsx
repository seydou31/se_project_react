import avatar from "../assets/avatar.png";
import ItemCard from './ItemCard.jsx';
import '../blocks/profile.css';

export default function Profile({clothes, handleCardClick, onClick}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <img className="profile__avatar" alt="avatar" src={avatar} />
         <p className="profile__user">Seydou Badiaka</p>
      </div>
      <div className="profile__content">
        <div className="profile__items-hdr">
        <span className="profile__span">Your Items</span>
        <button className="profile__button" type="button" onClick={onClick}>+ Add new</button>
        </div>
        <div className="profile__items">{clothes.map((item) => { 
               return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        })}</div>
      </div>
    </div>
  );
}
