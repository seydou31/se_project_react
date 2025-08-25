import '../blocks/itemcard.css'

export default function ItemCard({item, onCardClick}){

    const handleCardClick = () => {
            onCardClick(item)
        }

    return (
       <li className="itemcard__item">
        <p className="itemcard__description">{item.name}</p>
        <img onClick = {handleCardClick} className="itemcard__image" src={item.link} alt={item.name} />
       </li>
    )
}