import { useState, useEffect } from "react";
import WeatherDisplay from "./Components/WeatherDisplay";
import SearchSection from "./Components/SearchSection";
import Footer from "./Components/Footer";

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
        if (errorData.message.includes("not found")) {
          throw new Error("Location not found");
        }
        throw new Error(errorData.message); 
      }

      const data = await response.json();
      setWeatherData(data);
      setShowSecondSection(true);
    } catch (err) {
      setError(err.message);
      setWeatherData(null); 
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
          setError(""); 
        } catch (err) {
          setError(err.message);
          setWeatherData(null);
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
        </div>
      </section>
      <Footer />
    </>
  );
}
