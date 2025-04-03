// // "use client";

// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchWeather } from "@/redux/weatherSlice";
// // import { useRouter } from "next/navigation"; // Import useRouter

// // // import { FaTemperatureHigh, FaTint, FaCloud } from "react-icons/fa";

// // export default function WeatherSection() {
// //   const dispatch = useDispatch();
// //   const { data, loading, error } = useSelector((state) => state.weather);

// //   useEffect(() => {
// //     dispatch(fetchWeather());
// //   }, [dispatch]);

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg m-20">
// //       {/* Title */}
// //       <button
// //         onClick={() => router.back()} // Go back to the previous page
// //         className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition"
// //       >
// //         ← Back
// //       </button>
// //       <h1 className="text-3xl font-bold text-center mb-4">🌍 Weather Updates</h1>
// //       <p className="text-center text-lg">
// //         Get real-time weather data for major cities.
// //       </p>

// //       {/* Loading & Error Messages */}
// //       {loading && <p className="text-gray-200 text-center mt-4">Fetching weather data...</p>}
// //       {error && <p className="text-red-400 text-center">Error: {error}</p>}

// //       {/* Weather Data Display */}
// //       {data && (
// //         <div className="mt-6 bg-white text-black p-4 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-semibold text-center">
// //             📍 {data.name}, {data.sys.country}
// //           </h2>
// //           <div className="mt-4 flex flex-col space-y-3">
// //             <p className="flex items-center">
// //               {/* <FaTemperatureHigh className="mr-2 text-red-500" /> */}
// //               <strong>Temperature:</strong> {data.main.temp}°C
// //             </p>
// //             <p className="flex items-center">
// //               {/* <FaTint className="mr-2 text-blue-500" /> */}
// //               <strong>Humidity:</strong> {data.main.humidity}%
// //             </p>
// //             <p className="flex items-center">
// //               {/* <FaCloud className="mr-2 text-gray-500" /> */}
// //               <strong>Condition:</strong> {data.weather[0].description}
// //             </p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, toggleFavoriteCity } from "@/redux/weatherSlice";
import { useRouter } from "next/navigation"; // Import useRouter
// import { FaTemperatureHigh, FaTint, FaCloud, FaArrowLeft } from "react-icons/fa";

export default function WeatherSection() {
  const router = useRouter(); // ✅ Fix: Use router correctly
  const dispatch = useDispatch();
  const { data, favorites, loading, error } = useSelector(
    (state) => state.weather
  );
  const [cities] = useState(["New York", "London", "Tokyo"]); // ✅ Multiple cities

  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeather(city))); // Fetch weather for all cities
  }, [dispatch]);

  return (
    <div className=" mx-auto p-6 bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-xl rounded-lg mt-10">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center transition"
      >
        Back
      </button>

      {/* 🏙 Title */}
      <h1 className="text-4xl font-bold text-center mb-6">
        🌍 Weather Updates
      </h1>
      <p className="text-center text-lg">Live weather data for major cities.</p>

      {/* 🔄 Loading & Error Handling */}
      {loading && (
        <p className="text-gray-300 text-center mt-4">
          Fetching weather data...
        </p>
      )}
      {error && <p className="text-red-400 text-center">Error: {error}</p>}
      {/* Favorites Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">⭐ Favorite Cities</h2>
        <div>
          {favorites.length > 0 ? (
            favorites.map((city) => <p key={city}>{city}</p>)
          ) : (
            <p>No favorites added.</p>
          )}
        </div>
      </div>
      {/* 🌤 Weather Cards for Each City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {cities.map((city) => (
          <div
            key={city}
            className="bg-white text-black p-6 rounded-lg shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold text-center mb-2">
              📍 {city}
            </h2>

            {data && data[city] ? (
              <div className="mt-4 space-y-3">
                <p className="flex items-center text-lg">
                  {/* <FaTemperatureHigh className="mr-2 text-red-500" /> */}
                  <strong>Temperature:</strong> {data[city].main.temp}°C
                </p>
                <p className="flex items-center text-lg">
                  {/* <FaTint className="mr-2 text-blue-500" /> */}
                  <strong>Humidity:</strong> {data[city].main.humidity}%
                </p>
                <p className="flex items-center text-lg">
                  {/* <FaCloud className="mr-2 text-gray-500" /> */}
                  <strong>Condition:</strong>{" "}
                  {data[city].weather[0].description}
                </p>
                <button onClick={() => dispatch(toggleFavoriteCity(city))}>⭐</button>

              </div>
            ) : (
              <p className="text-center text-gray-500">Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
