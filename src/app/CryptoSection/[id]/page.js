

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"; 


export default function CryptoDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 


  useEffect(() => {
    if (!id) return;

    async function fetchCoin() {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!res.ok) throw new Error("Failed to fetch coin data");
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        console.error(" Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!coin) return <p className="text-center text-red-500">Coin not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center transition"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-center">{coin.name} ({coin.symbol.toUpperCase()})</h1>
      <p className="text-center text-lg mt-2"><strong>Current Price:</strong> ${coin.market_data.current_price.usd}</p>
      <p className="text-center"><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
      <p className="text-center mt-4">{coin.description.en.split(".")[0]}.</p>
    </div>
  );
}
