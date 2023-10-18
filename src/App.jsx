import { useState } from "react";
import { BsSearch } from "react-icons/bs";
export default function App() {
  const [searchCity, setSearchCity] = useState("Delhi");
  function handleChange(e) {
    setSearchCity(e.target.value);
  }

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
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-r-full py-3 px-5  focus:shadow-md"
            >
              <BsSearch className="h-4 w-5 " />
            </button>
            {/* {searchCity} */}
          </div>
        </div>

        {/* {Body} */}

        <div>
          <div>City name and weather</div>
          <div>Other details</div>
        </div>
      </div>
    </>
  );
}
