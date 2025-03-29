import { useState, useEffect } from "react";

const Weather = ({ lat, lon }) => {
  const [weatherOverview, setWeatherOverview] = useState(null);
  const [loadWeather, setLoadWeather] = useState(false);

  console.log("Weather Component - Lat:", lat, "Lon:", lon);

  const apiKey = import.meta.env.VITE_SOME_KEY;

  console.log("API Key:", apiKey);

  useEffect(() => {
    if (!lat || !lon) return; // Don't fetch weather if lat or lon is missing

    const getWeather = async () => {
      setLoadWeather(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      // Extract the weather overview from the API response
      const weatherDescription = data.weather?.[0]?.description || "No weather overview available";
      
      setWeatherOverview(weatherDescription); // Save the weather overview description
      setLoadWeather(false);
    };

    getWeather();
  }, [lat, lon, apiKey]);

  if (loadWeather) {
    return <p>Loading weather...</p>;
  }

  if (!weatherOverview) {
    return <p>No weather overview available.</p>;
  }

  return (
    <div>
      <h3>Weather Overview:</h3>
      <p>{weatherOverview}</p>
    </div>
  );
};

export default Weather;
