import { useState, useEffect } from "react";
import WeatherDisplay from "./Components/WeatherDisplay";
import SearchSection from "./Components/SearchSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function App() {
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!location) return alert("Please enter a location.");

    const trimmedLocation = location.trim();
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedLocation}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        // Customize the error message based on the API response
        if (errorData.message.includes("not found")) {
          throw new Error("Location not found");
        }
        throw new Error(errorData.message); // Fallback for other error messages
      }

      const data = await response.json();
      setWeatherData(data);
      setShowSecondSection(true);
    } catch (err) {
      setError(err.message);
      setWeatherData(null); // Reset weather data on error
      setShowSecondSection(false);
    }
  };

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Weather data not found");
          }

          const data = await response.json();
          setWeatherData(data);
          setShowSecondSection(true);
          setError(""); // Clear error on successful fetch
        } catch (err) {
          setError(err.message);
          setWeatherData(null); // Reset weather data on error
          setShowSecondSection(false);
        }
      },
      (error) => {
        setError("Unable to retrieve your location: " + error.message);
        setShowSecondSection(false);
      }
    );
  };

  useEffect(() => {
    if (showSecondSection) {
      const secondSection = document.querySelector(".second-section");
      if (secondSection) {
        secondSection.classList.add("show");
        secondSection.style.transform = "translateX(0)";
        secondSection.style.opacity = "1";
      }
    }
  }, [showSecondSection]);

  return (
    <>
      <section className="w-full h-full">
        <h1 className="m-auto text-3xl font-bold text-white">Weather App</h1>
        <div className="flex flex-col items-center justify-center w-full h-screen mt-auto">
          <SearchSection
            location={location}
            setLocation={setLocation}
            handleSearch={handleSearch}
            handleCurrentLocation={handleCurrentLocation}
          />
          {showSecondSection && (
            <WeatherDisplay weatherData={weatherData} error={error} />
          )}
          {error && <p className="text-red-600">{error}</p>}{" "}
          {/* Display error message */}
        </div>
      </section>
      <footer className="w-full h-12 bg-transparent backdrop-blur-[5px] flex justify-evenly items-center">
        <p className="text-white">Made with ❤️</p>
        <p className="text-white">
          © 2024 Nati&apos;s Weather App. All rights reserved.
        </p>
        <ul className="flex justify-center items-center gap-2">
          <li>
            <a
              href="https://t.me/Nathnael_G"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTelegram}
                className=" text-white"
                size="2x"
              />
            </a>
          </li>

          <li>
            <a
              href="https://github.com/Nathnael-G/Nati-s-Weather-App"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-white"
                size="2x"
              />
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
