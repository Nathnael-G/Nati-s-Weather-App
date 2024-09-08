import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faTint } from "@fortawesome/free-solid-svg-icons";

const WeatherDisplay = ({ weatherData, error }) => {
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!weatherData) {
    return null; 
  }

  return (
    <section className="relative max-w-[400px] w-full bg-transparent border-2 border-white/50 rounded-2xl backdrop-blur-[55px] p-8 mt-4 second-section">
      <div className="flex justify-between mb-1">
        <h2 className="text-xl text-white">{weatherData.name}</h2>
        <h3 className="text-lg text-white">
          {new Date(weatherData.dt * 1000).toLocaleDateString()}
        </h3>
      </div>
      <hr className="mb-2" />
      <div className="flex items-center justify-between">
        <div id="temperature">
          <span id="temperature-degree" className="text-xl">
            {weatherData.main.temp}°C
          </span>
        </div>
        <div id="description" className="">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className="mx-auto"
          />
          <div id="description-text" className="text-lg text-center">
            {weatherData.weather[0].description}
          </div>
        </div>
        <div id="details">
          <div id="humidity">
            <FontAwesomeIcon icon={faTint} className="mr-2" />
            <span>Humidity: </span>
            <h3 id="humidity-degree" className="text-center">
              {weatherData.main.humidity}%
            </h3>
          </div>
          <div id="feelslike">
            <FontAwesomeIcon icon={faThermometerHalf} className="mr-2" />
            <span>Feels Like: </span>
            <h3 id="feelslike-degree" className="text-center">
              {weatherData.main.feels_like}°C
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

WeatherDisplay.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dt: PropTypes.number.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  error: PropTypes.string,
};

export default WeatherDisplay;