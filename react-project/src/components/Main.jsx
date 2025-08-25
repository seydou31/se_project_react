import ItemCard from "./ItemCard.jsx";
import WeatherCard from "./WeatherCard.jsx";
import  { defaultClothingItems } from '../utils/constants.js'
import '../blocks/cards.css'

export default function Main({weatherData, handleCardClick}) {

  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <h3 className="cards__text">Today is {weatherData.temp.F}&deg; F/you may want to wear:</h3>
        <ul className="cards__list">
            {defaultClothingItems.filter((item) => {
                return item.weather === weatherData.type
            }).map((item) => {
                return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
            })}
        </ul>
      </section>
    </main>
  );
}
