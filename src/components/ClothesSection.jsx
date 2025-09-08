import ItemCard from "./ItemCard.jsx";

export default function ClothesSection({ onClick, handleCardClick, clothes }) {
  return (
    <section className="profile__content">
      <div className="profile__items-hdr">
        <span className="profile__span">Your Items</span>
        <button className="profile__button" type="button" onClick={onClick}>
          + Add new
        </button>
      </div>
      <div className="profile__items">
        {clothes.map((item) => {
          return (
            <ItemCard
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
