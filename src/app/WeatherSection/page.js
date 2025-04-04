"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, toggleFavoriteCity } from "@/redux/weatherSlice";
import { useRouter } from "next/navigation";

export default function WeatherSection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, favorites, loading, error } = useSelector(
    (state) => state.weather
  );

  const [cities] = useState(["New York", "London", "Tokyo"]);
  const [hasMounted, setHasMounted] = useState(false);

  // Prevent mismatch by ensuring client-only rendering
  useEffect(() => {
    setHasMounted(true);
    cities.forEach((city) => dispatch(fetchWeather(city)));
  }, [dispatch]);

  if (!hasMounted) return null; // Wait until client mounted

  return (
    <div className="mx-auto p-6 bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-xl rounded-lg mt-10">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center transition"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold text-center mb-6">🌍 Weather Updates</h1>
      <p className="text-center text-lg">Live weather data for major cities.</p>

      {loading && (
        <p className="text-gray-300 text-center mt-4">Fetching weather data...</p>
      )}
      {error && <p className="text-red-400 text-center">Error: {error}</p>}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {cities.map((city) => (
          <div
            key={city}
            className="bg-white text-black p-6 rounded-lg shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold text-center mb-2">📍 {city}</h2>

            {data && data[city] ? (
              <div className="mt-4 space-y-3">
                <p className="flex items-center text-lg">
                  <strong>Temperature:</strong> {data[city].main.temp}°C
                </p>
                <p className="flex items-center text-lg">
                  <strong>Humidity:</strong> {data[city].main.humidity}%
                </p>
                <p className="flex items-center text-lg">
                  <strong>Condition:</strong>{" "}
                  {data[city].weather[0].description}
                </p>
                <button
                  onClick={() => dispatch(toggleFavoriteCity(city))}
                  className="mt-2 text-yellow-500 hover:text-yellow-400 transition"
                >
                  ⭐ {favorites.includes(city) ? "Remove" : "Add"}
                </button>
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
