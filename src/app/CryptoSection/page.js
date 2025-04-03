// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCrypto, updateCryptoPrice } from "@/redux/cryptoSlice";
// import { useRouter } from "next/navigation";
// // import { FaBitcoin, FaEthereum, FaCoins, FaArrowLeft } from "react-icons/fa";

// export default function CryptoSection() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data, loading, error } = useSelector((state) => state.crypto);

//   useEffect(() => {
//     dispatch(fetchCrypto());

//     // WebSocket for real-time updates
//     const socket = new WebSocket(
//       "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
//     );

//     socket.onmessage = (event) => {
//       const updatedPrices = JSON.parse(event.data);
//       Object.keys(updatedPrices).forEach((id) => {
//         dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
//       });
//     };

//     return () => socket.close();
//   }, [dispatch]);

//   return (
//     <div className=" mx-auto p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-lg rounded-lg min-h-screen ">

//       <button
//         onClick={() => router.back()}
//         className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 flex items-center"
//       >
//         ← Back
//       </button>

//       {/* Title */}
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-yellow-400">
//         💰 Live Crypto Market
//       </h1>
//       <p className="text-center text-lg text-gray-300">
//         Stay updated with real-time cryptocurrency prices.
//       </p>

//       {/* Loading & Error Handling */}
//       {loading && (
//         <p className="text-gray-400 text-center mt-4">Fetching crypto data...</p>
//       )}
//       {error && <p className="text-red-400 text-center">Error: {error}</p>}

//       {/* Crypto Data Display */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data.map((coin) => (
//           <div
//             key={coin.id}
//             className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
//           >

//             <div className="text-4xl mb-3">
//               {coin.id === "bitcoin"}
//               {coin.id === "ethereum" }
//               {coin.id === "cardano"}
//             </div>

//             <h2 className="text-2xl font-bold text-white">
//               {coin.name} ({coin.symbol.toUpperCase()})
//             </h2>

//             <p className="text-lg mt-2">
//               <strong>Price:</strong> $
//               {typeof coin.current_price === "number"
//                 ? coin.current_price.toFixed(2)
//                 : "0"}
//             </p>

//             <p
//               className={`text-lg ${
//                 coin.price_change_percentage_24h >= 0
//                   ? "text-green-400"
//                   : "text-red-400"
//               }`}
//             >
//               <strong>24h Change:</strong>{" "}
//               {typeof coin.price_change_percentage_24h === "number"
//                 ? coin.price_change_percentage_24h.toFixed(2)
//                 : "0"}

//             </p>

//             <p className="text-gray-300">
//               <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCrypto, updateCryptoPrice } from "@/redux/cryptoSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CryptoSection() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data, loading, error } = useSelector((state) => state.crypto);

//   // useEffect(() => {
//   //   dispatch(fetchCrypto());

//   //   // 🔹 WebSocket for real-time updates
//   //   const socket = new WebSocket(
//   //     "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
//   //   );

//   //   socket.onmessage = (event) => {
//   //     const updatedPrices = JSON.parse(event.data);
//   //     console.log("WebSocket Prices:", updatedPrices);

//   //     Object.keys(updatedPrices).forEach((id) => {
//   //       dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));

//   //       // 🎉 Show Toast Notification for Price Updates
//   //       toast.info(`${id.toUpperCase()} price updated: $${updatedPrices[id]}`, {
//   //         position: "top-right",
//   //         autoClose: 3000,
//   //       });
//   //     });
//   //   };

//   //   return () => socket.close();
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchCrypto());

//     // Debug API response
//     fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano")
//       .then(res => res.json())
//       .then(data => console.log("Fetched API Data:", data));

//     const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano");

//     socket.onmessage = (event) => {
//       const updatedPrices = JSON.parse(event.data);
//       console.log("WebSocket Data:", updatedPrices); // Debug WebSocket

//       Object.keys(updatedPrices).forEach((id) => {
//         dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
//       });
//     };

//     return () => socket.close();
//   }, [dispatch]);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-900 to-black text-white shadow-lg rounded-lg">
//       {/* 🔙 Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition"
//       >
//         ← Back
//       </button>

//       {/* 🏆 Title */}
//       <h1 className="text-3xl font-bold text-center mb-4">💰 Crypto Market</h1>
//       <p className="text-center text-lg text-gray-300">
//         Live cryptocurrency prices with real-time updates.
//       </p>

//       {/* ⏳ Loading & Error Handling */}
//       {loading && <p className="text-gray-400 text-center mt-4">Fetching crypto data...</p>}
//       {error && <p className="text-red-400 text-center">Error: {error}</p>}

//       {/* 📊 Crypto Data Display */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data.length > 0 ? (
//           data.map((coin) => (
//             <div
//               key={coin.id}
//               className="bg-white text-black p-4 rounded-lg shadow-md"
//             >
//               <h2 className="text-2xl font-semibold text-center">
//                 {coin.name} ({coin.symbol.toUpperCase()})
//               </h2>
//               <img
//                 src={coin.image}
//                 alt={coin.name}
//                 className="w-16 h-16 mx-auto mt-2"
//               />
//               <p className="text-lg mt-2">
//                 <strong>Price:</strong> $
//                 {typeof coin.current_price === "number"
//                   ? coin.current_price.toFixed(2)
//                   : "Fetching..."}
//               </p>
//               <p>
//                 <strong>24h Change:</strong>{" "}
//                 {typeof coin.price_change_percentage_24h === "number"
//                   ? coin.price_change_percentage_24h.toFixed(2)
//                   : "N/A"}
//                 %
//               </p>
//               <p>
//                 <strong>Market Cap:</strong> $
//                 {coin.market_cap ? coin.market_cap.toLocaleString() : "N/A"}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400 col-span-3">No data available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// import {
//   fetchCrypto,
//   updateCryptoPrice,
//   toggleFavoriteCrypto,
// } from "@/redux/cryptoSlice";

// export default function CryptoSection() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { data, loading, favorites, error } = useSelector(
//     (state) => state.crypto
//   );

//   // Local state to store real-time WebSocket updates
//   const [cryptoPrices, setCryptoPrices] = useState({});

//   // useEffect(() => {
//   //   dispatch(fetchCrypto());

//   //   const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano");

//   //   socket.onmessage = (event) => {
//   //     const updatedPrices = JSON.parse(event.data);
//   //     console.log("WebSocket Data:", updatedPrices);

//   //     // Update local state for real-time price updates
//   //     setCryptoPrices((prevPrices) => ({
//   //       ...prevPrices,
//   //       ...updatedPrices,
//   //     }));

//   //     // Update Redux state for persistence
//   //     Object.keys(updatedPrices).forEach((id) => {
//   //       dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
//   //     });
//   //   };

//   //   return () => socket.close();
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchCrypto()); // Fetch initial crypto data from API

//     let socket = new WebSocket(
//       "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
//     );

//     socket.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     socket.onmessage = (event) => {
//       try {
//         const updatedPrices = JSON.parse(event.data);
//         console.log("WebSocket Data:", updatedPrices);

//         // setCryptoPrices((prevPrices) => ({
//         //   ...prevPrices,
//         //   ...updatedPrices,
//         // }));
//         setCryptoPrices((prevPrices) => ({
//           ...prevPrices,
//           ...Object.fromEntries(
//             Object.entries(updatedPrices).map(([id, price]) => [
//               id,
//               typeof price === "number" ? price : prevPrices[id] || 0, // Ensure numbers
//             ])
//           ),
//         }));

//         Object.keys(updatedPrices).forEach((id) => {
//           dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
//         });
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = (event) => {
//       console.warn("WebSocket closed. Reconnecting in 5 seconds...", event);
//       setTimeout(() => {
//         socket = new WebSocket(
//           "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
//         );
//       }, 5000);
//     };

//     return () => {
//       socket.close();
//     };
//   }, [dispatch]);

//   return (
//     <div className=" mx-auto p-6 bg-gradient-to-r from-gray-900 to-black text-white shadow-lg rounded-lg border">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition"
//       >
//         ← Back
//       </button>
//       <h1 className="text-3xl font-bold text-center mb-4">💰 Crypto Market</h1>
//       <p className="text-center text-lg text-gray-300">
//         Live cryptocurrency prices with real-time updates.
//       </p>

//       {loading && (
//         <p className="text-gray-400 text-center mt-4">
//           Fetching crypto data...
//         </p>
//       )}
//       {error && <p className="text-red-400 text-center">Error: {error}</p>}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-2">⭐ Favorite Cryptos</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {favorites.length > 0 ? (
//             favorites.map((id) => {
//               const coin = data.find((c) => c.id === id);
//               return coin ? (
//                 <div
//                   key={coin.id}
//                   className="p-4 bg-white text-black rounded-lg shadow-md"
//                 >
//                   {/* <p>{coin.name} (${coin.current_price?.toFixed(2)})</p> */}
//                   <p>
//                     {coin.name} ($
//                     {typeof coin.current_price === "number"
//                       ? coin.current_price.toFixed(2)
//                       : "N/A"}
//                     )
//                   </p>
//                 </div>
//               ) : null;
//             })
//           ) : (
//             <p>No favorites added.</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data.map((coin) => (
//           <div
//             key={coin.id}
//             className="bg-white text-black p-4 rounded-lg shadow-md"
//           >
//             <h2 className="text-xl font-semibold mb-2">⭐ </h2>

//             <h2 className="text-2xl font-semibold text-center">
//               {coin.name} ({coin.symbol.toUpperCase()})
//             </h2>
//             <img
//               src={coin.image}
//               alt={coin.name}
//               className="w-16 h-16 mx-auto mt-2"
//             />
//             <p className="text-lg mt-2 text-center">
//               <strong>Price:</strong> $
//               {cryptoPrices[coin.id] !== undefined &&
//               !isNaN(cryptoPrices[coin.id])
//                 ? Number(cryptoPrices[coin.id]).toFixed(2) // WebSocket price
//                 : coin.current_price !== undefined && !isNaN(coin.current_price)
//                 ? Number(coin.current_price).toFixed(2) // API price fallback
//                 : "Fetching..."}
//             </p>
//             <p className="text-lg mt-2 text-center">
//               <strong>24h Change:</strong>{" "}
//               {typeof coin.price_change_percentage_24h === "number"
//                 ? coin.price_change_percentage_24h.toFixed(2)
//                 : "N/A"}
//               %
//             </p>
//             <p className="text-lg mt-2 text-center">
//               <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
//             </p>
//             <button
//               onClick={() => dispatch(toggleFavoriteCrypto(coin.id))}
//               className={`px-3 py-1 rounded-full ${
//                 favorites.includes(coin.id) ? "bg-yellow-400" : "bg-gray-300"
//               }`}
//             >
//               ⭐
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import {
//   fetchCrypto,
//   updateCryptoPrice,
//   toggleFavoriteCrypto,
// } from "@/redux/cryptoSlice";

// export default function CryptoSection() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data, loading, favorites, error } = useSelector(
//     (state) => state.crypto
//   );

//   // Local state to store real-time WebSocket updates
//   const [cryptoPrices, setCryptoPrices] = useState({});
//   const [ws, setWs] = useState(null); // Store WebSocket instance
//   const [reconnectAttempts, setReconnectAttempts] = useState(0);

//   // useEffect(() => {
//   //   dispatch(fetchCrypto()); // Fetch initial data from API

//   //   const connectWebSocket = () => {
//   //     let socket = new WebSocket(
//   //       "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
//   //     );

//   //     socket.onopen = () => {
//   //       console.log("✅ WebSocket connected");
//   //       setReconnectAttempts(0); // Reset reconnect attempts on success
//   //     };

//   //     // socket.onmessage = (event) => {
//   //     //   try {
//   //     //     const updatedPrices = JSON.parse(event.data);
//   //     //     console.log("🔄 WebSocket Data:", updatedPrices);

//   //     //     // Preserve last known price if update is invalid
//   //     //     setCryptoPrices((prevPrices) => ({
//   //     //       ...prevPrices,
//   //     //       ...Object.fromEntries(
//   //     //         Object.entries(updatedPrices).map(([id, price]) => [
//   //     //           id,
//   //     //           price !== undefined && !isNaN(price)
//   //     //             ? price
//   //     //             : prevPrices[id] || 0,
//   //     //         ])
//   //     //       ),
//   //     //     }));

//   //     //     // Update Redux state
//   //     //     Object.keys(updatedPrices).forEach((id) => {
//   //     //       if (updatedPrices[id] !== undefined && !isNaN(updatedPrices[id])) {
//   //     //         dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
//   //     //       }
//   //     //     });
//   //     //   } catch (error) {
//   //     //     console.error("❌ Error parsing WebSocket message:", error);
//   //     //   }
//   //     // };

//   //     socket.onmessage = (event) => {
//   //       try {
//   //         const updatedPrices = JSON.parse(event.data);
//   //         console.log("WebSocket Data:", updatedPrices);

//   //         Object.keys(updatedPrices).forEach((id) => {
//   //           const newPrice = updatedPrices[id];

//   //           if (typeof newPrice === "number" && !isNaN(newPrice)) {
//   //             dispatch(updateCryptoPrice({ id, price: newPrice }));
//   //             setCryptoPrices((prevPrices) => ({
//   //               ...prevPrices,
//   //               [id]: newPrice,
//   //             }));
//   //           } else {
//   //             console.warn(`⚠ Invalid price received for ${id}:`, newPrice);
//   //           }
//   //         });
//   //       } catch (error) {
//   //         console.error("❌ WebSocket Error:", error);
//   //       }
//   //     };

//   //     socket.onerror = (error) => {
//   //       console.error("⚠️ WebSocket error:", error);
//   //     };

//   //     socket.onclose = (event) => {
//   //       console.warn("❌ WebSocket closed. Attempting to reconnect...", event);
//   //       let delay = Math.min(5000 * 2 ** reconnectAttempts, 30000); // Exponential backoff (max 30s)
//   //       setTimeout(() => {
//   //         setReconnectAttempts((prev) => prev + 1);
//   //         connectWebSocket(); // Reconnect
//   //       }, delay);
//   //     };

//   //     setWs(socket); // Store WebSocket instance
//   //   };

//   //   connectWebSocket();

//   //   return () => {
//   //     if (ws) ws.close();
//   //   };
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchCrypto()); // Fetch initial crypto data from API

//     let socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano");

//     socket.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     socket.onmessage = (event) => {
//       try {
//         const updatedPrices = JSON.parse(event.data);
//         console.log("WebSocket Data:", updatedPrices);

//         setCryptoPrices((prevPrices) => ({
//           ...prevPrices,
//           ...updatedPrices,
//         }));

//         Object.keys(updatedPrices).forEach((id) => {
//           dispatch(updateCryptoPrice({ id, price: updatedPrices[id] }));
//         });
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = (event) => {
//       console.warn("WebSocket closed. Reconnecting in 5 seconds...", event);
//       setTimeout(() => {
//         socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano");
//       }, 5000);
//     };

//     return () => {
//       socket.close();
//     };
//   }, [dispatch]);

//   return (
//     <div className="mx-auto p-6 bg-gradient-to-r from-gray-900 to-black text-white shadow-lg rounded-lg border">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition"
//       >
//         ← Back
//       </button>
//       <h1 className="text-3xl font-bold text-center mb-4">💰 Crypto Market</h1>
//       <p className="text-center text-lg text-gray-300">
//         Live cryptocurrency prices with real-time updates.
//       </p>

//       {loading && (
//         <p className="text-gray-400 text-center mt-4">
//           Fetching crypto data...
//         </p>
//       )}
//       {error && <p className="text-red-400 text-center">Error: {error}</p>}

//       {/* Favorite Cryptos Section */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-2">⭐ Favorite Cryptos</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {favorites.length > 0 ? (
//             favorites.map((id) => {
//               const coin = data.find((c) => c.id === id);
//               return coin ? (
//                 <div
//                   key={coin.id}
//                   className="p-4 bg-white text-black rounded-lg shadow-md"
//                 >
//                   <p>
//                     {coin.name} ($
//                     {typeof coin.current_price === "number" &&
//                     !isNaN(coin.current_price)
//                       ? coin.current_price.toFixed(2)
//                       : "N/A"}
//                     )
//                   </p>
//                 </div>
//               ) : null;
//             })
//           ) : (
//             <p>No favorites added.</p>
//           )}
//         </div>
//       </div>

//       {/* Crypto Cards */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data.map((coin) => (
//           <div
//             key={coin.id}
//             className="bg-white text-black p-4 rounded-lg shadow-md"
//           >
//             <h2 className="text-2xl font-semibold text-center">
//               {coin.name} ({coin.symbol.toUpperCase()})
//             </h2>
//             <img
//               src={coin.image}
//               alt={coin.name}
//               className="w-16 h-16 mx-auto mt-2"
//             />
//             <p className="text-lg mt-2 text-center">
//   <strong>Price:</strong> $
//   {(() => {
//     // Ensure WebSocket price is a valid number
//     const livePrice = parseFloat(cryptoPrices[coin.id]);
//     if (!isNaN(livePrice)) return livePrice.toFixed(2);

//     // Ensure API price is a valid number
//     const apiPrice = parseFloat(coin.current_price);
//     if (!isNaN(apiPrice)) return apiPrice.toFixed(2);

//     return "N/A"; // Fallback if neither is valid
//   })()}
// </p>

//             <p className="text-lg mt-2 text-center">
//               <strong>24h Change:</strong>{" "}
//               {typeof coin.price_change_percentage_24h === "number"
//                 ? coin.price_change_percentage_24h.toFixed(2)
//                 : "N/A"}
//               %
//             </p>
//             <p className="text-lg mt-2 text-center">
//               <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
//             </p>
//             <button
//               onClick={() => dispatch(toggleFavoriteCrypto(coin.id))}
//               className={`px-3 py-1 rounded-full ${
//                 favorites.includes(coin.id) ? "bg-yellow-400" : "bg-gray-300"
//               }`}
//             >
//               ⭐
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCrypto } from "@/redux/cryptoSlice";

// export default function CryptoPage() {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((state) => state.crypto);

//   useEffect(() => {
//     dispatch(fetchCrypto());
//   }, [dispatch]);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center mb-4">💰 Cryptocurrency List</h1>

//       {loading && <p className="text-gray-400 text-center">Fetching crypto data...</p>}
//       {error && <p className="text-red-400 text-center">Error: {error}</p>}

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data.map((coin) => (
//           <Link href={`/CryptoSection/${coin.id}`} key={coin.id}>
//             <div className="bg-white text-black p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition">
//               <h2 className="text-2xl font-semibold text-center">{coin.name} ({coin.symbol.toUpperCase()})</h2>
//               <p className="text-lg text-center mt-2">
//                 <strong>Price:</strong> ${coin.current_price.toFixed(2)}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "@/redux/cryptoSlice";
import { useRouter } from "next/navigation"; // Import useRouter
import { updateCryptoPrice } from "@/redux/cryptoSlice";  // ✅ Add this line

import Link from "next/link";

export default function CryptoSection() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.crypto);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [favorites, setFavorites] = useState([]);
  const router = useRouter(); // ✅ Fix: Use router correctly

  // Load favorites from localStorage
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

      // socket.onmessage = (event) => {
      //   const updatedPrices = JSON.parse(event.data);
      //   setCryptoPrices((prevPrices) => ({ ...prevPrices, ...updatedPrices }));
      // };

      socket.onmessage = (event) => {
        const updatedPrices = JSON.parse(event.data);
        console.log("🔄 WebSocket Data:", updatedPrices);

        // Ensure all coins have updated prices
        setCryptoPrices((prevPrices) => {
          const newPrices = { ...prevPrices, ...updatedPrices };

          // Debug: Log if a coin's price is missing
          data.forEach((coin) => {
            if (!newPrices[coin.id]) {
              console.warn(`⚠ Missing WebSocket price for ${coin.name}`);
            }
          });

          return newPrices;
        });

        // Update Redux
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

  // Toggle favorite function
  const toggleFavorite = (coinId) => {
    const updatedFavorites = favorites.includes(coinId)
      ? favorites.filter((id) => id !== coinId) // Remove from favorites
      : [...favorites, coinId]; // Add to favorites

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
              coin // Display only the first 5 coins
            ) => (
              <div
                key={coin.id}
                className="bg-white text-black p-4 rounded-lg shadow-md relative"
              >
                {/* Favorite Button */}
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
