"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "@/redux/cryptoSlice";
import { useRouter } from "next/navigation"; 
import { updateCryptoPrice } from "@/redux/cryptoSlice"; 

import Link from "next/link";

export default function CryptoSection() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.crypto);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [favorites, setFavorites] = useState([]);
  const router = useRouter(); 

  
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("cryptoFavorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    dispatch(fetchCrypto());

    let socket;
    const connectWebSocket = () => {
      const socket = new WebSocket(
        "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,tether,xrp,bnb,usdc"
      );

      socket.onopen = () => console.log("✅ WebSocket connected");

      
      //   const updatedPrices = JSON.parse(event.data);
      //   setCryptoPrices((prevPrices) => ({ ...prevPrices, ...updatedPrices }));
      // };

      socket.onmessage = (event) => {
        const updatedPrices = JSON.parse(event.data);
        console.log("🔄 WebSocket Data:", updatedPrices);

      
        setCryptoPrices((prevPrices) => {
          const newPrices = { ...prevPrices, ...updatedPrices };

          data.forEach((coin) => {
            if (!newPrices[coin.id]) {
              console.warn(`⚠ Missing WebSocket price for ${coin.name}`);
            }
          });

          return newPrices;
        });

        Object.keys(updatedPrices).forEach((id) => {
          dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
        });
      };

      socket.onerror = (error) => console.error("❌ WebSocket error:", error);

      socket.onclose = () => {
        console.warn("⚠ WebSocket disconnected. Reconnecting in 5s...");
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();
    return () => socket?.close();
  }, [dispatch]);

  const toggleFavorite = (coinId) => {
    const updatedFavorites = favorites.includes(coinId)
      ? favorites.filter((id) => id !== coinId) 
      : [...favorites, coinId]; 

    setFavorites(updatedFavorites);
    localStorage.setItem("cryptoFavorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-900 to-black text-white shadow-lg rounded-lg">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center transition"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-center mb-4">💰 Crypto Market</h1>
      <p className="text-center text-lg text-gray-300">
        Live cryptocurrency prices with real-time updates.
      </p>

      {loading && (
        <p className="text-gray-400 text-center mt-4">
          Fetching crypto data...
        </p>
      )}
      {error && <p className="text-red-400 text-center">⚠ Error: {error}</p>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">
            No cryptocurrency data available.
          </p>
        ) : (
          data.slice(0, 6).map(
            (
              coin 
            ) => (
              <div
                key={coin.id}
                className="bg-white text-black p-4 rounded-lg shadow-md relative"
              >
                
                <button
                  className="absolute top-2 right-2 text-2xl"
                  onClick={() => toggleFavorite(coin.id)}
                >
                  {favorites.includes(coin.id) ? "⭐" : "☆"}
                </button>

                <Link href={`/CryptoSection/${coin.id}`}>
                  <div className="cursor-pointer hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-center">
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </h2>
                    <p className="text-lg mt-2 text-center">
                      <strong>Price:</strong> $
                      {cryptoPrices[coin.id] !== undefined
                        ? parseFloat(cryptoPrices[coin.id]).toFixed(2)
                        : coin.current_price
                        ? coin.current_price.toFixed(2)
                        : "N/A"}
                    </p>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
