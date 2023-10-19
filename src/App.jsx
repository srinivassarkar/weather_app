import { useEffect, useState } from "react";
import {
  BsSearch,
  BsFillCloudsFill,
  BsFillCloudHazeFill,
  BsFillCloudRainFill,
  BsFillSunFill,
  BsFillCloudSnowFill,
  BsFillCloudLightningRainFill,
  BsWind,
} from "react-icons/bs";
import { LuLoader, LuWaves } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { CiTempHigh } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const apiKey = "0233c7695f99f4daa61475a720a71307";

  async function fetchWeatherData(city) {
    setLoading(true);
    if (!city) {
      // Display an error toast if the city is empty
      toast.error("Please enter a city name.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false); // Set loading to false
      return; // Exit the function
    }

    try {
      const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
      const data = await fetch(baseUrl);
      if (data.ok) {
        const result = await data.json();
        setTimeout(() => {
          setWeather(result);
        }, 1000 / 100);
      } else {
        toast.error("Enter correct name", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      fetchWeatherData(searchCity);
    }
  }

  useEffect(() => {
    let handleEnterKey = null;

    if (searchCity) {
      handleEnterKey = (e) => {
        if (e.key === "Enter") {
          fetchWeatherData(searchCity);
        }
      };

      document.addEventListener("keydown", handleEnterKey);
    }

    return () => {
      if (handleEnterKey) {
        document.removeEventListener("keydown", handleEnterKey);
      }
    };
  }, [searchCity]);

  const handleSearch = () => {
    fetchWeatherData(searchCity);
  };

  let icon = null;

  if (weather && weather.weather && weather.weather.length > 0) {
    switch (weather.weather[0].main) {
      case "Clouds":
        icon = <BsFillCloudsFill />;
        break;
      case "Haze":
        icon = <BsFillCloudHazeFill />;
        break;
      case "Rain":
        icon = <BsFillCloudRainFill />;
        break;
      case "Clear":
        icon = <BsFillSunFill />;
        break;
      case "Drizzle":
        icon = <BsFillCloudRainFill />;
        break;
      case "Snow":
        icon = <BsFillCloudSnowFill />;
        break;
      case "Thunderstorm":
        icon = <BsFillCloudLightningRainFill />;
        break;
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-950 flex items-center justify-center">
        {/* Button */}
        <div className="w-full py-3 max-w-md bg-gray-800 mx-auto rounded-lg p-4">
          <div className="text-white flex items-center justify-center text-4xl sm:text-4xl font-bold">
            Weather Wizardry 🧙‍♂️
          </div>

          <div className="container mx-auto px-11 flex items-center mt-3">
            <input
              type="text"
              className="bg-white rounded-l-full px-5 py-2 w-full sm:w-64 focus:outline-none focus:shadow-md"
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
              onClick={handleSearch}
            >
              <BsSearch className="h-4 w-5" />
            </button>
          </div>

          {loading ? (
            <div className="text-white flex items-center justify-center">
              <LuLoader className="text-5xl animate-spin text-white" />
            </div>
          ) : (
            <div className="text-white">
              {/* head */}
              <div className="mt-6 flex flex-col items-center justify-center sm:flex-row">
                <div className="text-6xl mb-4 sm:mb-0">{icon}</div>
                <div className="text-2xl mx-4 font-semibold text-center sm:text-left">
                  {weather.weather ? (
                    <div className="text-2xl">
                      {weather.name}
                      {weather.sys && `, ${weather.sys.country}`}
                    </div>
                  ) : null}
                  {weather.weather ? (
                    <div className="text-sm">
                      {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                      {date.getUTCFullYear()}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col mt-8 items-center text-center sm:text-left sm:mx-14">
                {weather.main && (
                  <div className="text-5xl sm:text-[85px] leading-none">
                    {parseInt(weather.main.temp)}°C
                  </div>
                )}
                <div className="text-lg sm:text-xl">
                  {weather.weather && weather.weather[0].main}
                </div>
              </div>
              {/* body */}
              <div className="flex flex-col mt-12 sm:flex-row justify-between">
                <div className="flex flex-col">
                  {weather.main && (
                    <div className="flex items-center mb-2">
                      <CiTempHigh className="mr-2 " />
                      Feels Like {parseInt(weather.main.feels_like)} °C
                    </div>
                  )}
                  {weather.main && (
                    <div className="flex items-center">
                      <AiOutlineEye className="mr-2 " />
                      Visibility {weather.visibility / 1000} km
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {weather.main && (
                    <div className="flex items-center mb-2">
                      <LuWaves className="mr-2" />
                      Humidity {weather.main.humidity} %
                    </div>
                  )}
                  {weather.wind && (
                    <div className="flex items-center">
                      <BsWind className="mr-2" />
                      Wind {weather.wind.speed} m/s
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
