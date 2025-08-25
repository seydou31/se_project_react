import '../blocks/Weathercard.css'
import weatherImage from '../assets/weather-image.png'

export default function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg;</p>
      <img className="weather-card__image" src={weatherImage} alt="weather-image"/>
    </section>
  );
}
