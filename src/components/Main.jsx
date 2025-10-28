import React from "react";
import ItemCard from "./ItemCard.jsx";
import WeatherCard from "./WeatherCard.jsx";
import '../blocks/cards.css'
import '../blocks/main.css'
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

export default function Main({weatherData, handleCardClick, clothes, isLiked, onCardLike, isLoggedIn}) {

  const currentTemperatureUnit = React.useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData}/>
      <section className="cards">
        <h3 className="cards__text">Today is {weatherData.temp[currentTemperatureUnit.currentTemperatureUnit]}&deg; {currentTemperatureUnit.currentTemperatureUnit}/you may want to wear:</h3>
        <ul className="cards__list">
            {clothes.filter((item) => {
                return item.weather === weatherData.type
            }).map((item) => {
                return <ItemCard isLoggedIn={isLoggedIn} onCardLike={onCardLike} isLiked={isLiked} key={item._id} item={item} onCardClick={handleCardClick} />
            })}
        </ul>
      </section>
    </main>
  );
}
