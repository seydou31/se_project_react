import { weatherOptions, defaultWeatherOptions } from "../utils/constants.js";
import "../blocks/weathercard.css";

export default function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if(filteredOptions.length === 0){
    weatherOption = defaultWeatherOptions[weatherData.isDay? 'day' : 'night']
  } else {
    weatherOption = filteredOptions[0];
  }

  const filteredOption = weatherOption?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;</p>
      <img
        className="weather-card__image"
        src={filteredOption}
        alt={`Card showing : ${weatherOption?.condition} weather`}
      />
    </section>
  );
}
