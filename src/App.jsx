import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
export default function App() {
  const [searchCity, setSearchCity] = useState("");

  const apiKey = "0233c7695f99f4daa61475a720a71307";
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=${apiKey}`;
  async function searchPressed() {
    const data = await fetch(baseUrl);
    const weather = await data.json();
    console.log(weather);
  }
  function handleEnterKey(e) {
    if (e.key == "Enter") {
      searchPressed();
    }
  }

  useEffect(() => {
    searchPressed();
  }, []);

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
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-r-full py-3 px-5  focus:shadow-md"
            >
              <BsSearch className="h-4 w-5 " onClick={searchPressed} />
            </button>
            {/* {searchCity} */}
          </div>
        </div>

        {/* {Body} */}

        <div>
          <div>City name </div>
          <div>Other details</div>
        </div>
      </div>
    </>
  );
}
