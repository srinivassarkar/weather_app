import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import DateTime from "./Components/DateTime";

export default function App() {
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState({});

  const apiKey = "0233c7695f99f4daa61475a720a71307";

  async function fetchWeatherData() {
    if (searchCity) {
      const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&&APPID=${apiKey}`;
      const data = await fetch(baseUrl);
      const result = await data.json();
      setWeather(result);
      console.log(result);
    }
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, [searchCity]); // This will trigger the effect whenever searchCity changes

  return (
    <>
      <div>
        {/* Button */}
        <div className="flex justify-center items-center bg-gray-500">
          <div className="container mx-auto px-4 flex items-center">
            <input
              type="text"
              className="bg-white rounded-l-full px-5 py-2 w-64 focus:outline-none focus:shadow-md"
              placeholder="Enter City..."
              value={searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value);
              }}
              onKeyDown={handleEnterKey}
            />
            <button
              type="submit"
              className="bg-yellow-400 hover-bg-yellow-500 text-gray-900 rounded-r-full py-3 px-5 focus-shadow-md"
              onClick={fetchWeatherData}
            >
              <BsSearch className="h-4 w-5" />
            </button>
          </div>
        </div>

        {/* {Body} */}
        <div>
          <p>name: {weather.name}</p>
          <p>
            <DateTime />
          </p>
          <p>temperature: {weather.main && weather.main.temp}°C</p>
          <p>type: {weather.weather && weather.weather[0].main}</p>
          <p>
            description: {weather.weather && weather.weather[0].description}
          </p>
          <p>feels like : {weather.weather && weather.main.feels_like} °C</p>
          <p>visibility: {weather.weather && weather.visibility / 1000} km</p>
          <p>humidity: {weather.weather && weather.main.humidity}</p>
          <p>wind speed: {weather.weather && weather.wind.speed} m\s</p>
        </div>
      </div>
    </>
  );
}
