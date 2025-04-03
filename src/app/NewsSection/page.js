"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_779173c98e52c288f16694032f52cd7349ae8&q=cryptocurrency&language=en`
        );
        const data = await response.json();
        console.log("Top news ",data);
        setNews(data.results.slice(0, 5)); // Show top 5 news articles
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 flex items-center"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-yellow-400 text-center">Latest Crypto News</h1>
      <p className="text-gray-400 text-center mb-6">Stay updated with the latest cryptocurrency trends.</p>

      {loading && <p className="text-gray-300 text-center">Loading news...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
           
            {article.image_url ? (
              <img
                src={article.image_url}
                alt="News"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-4">
                No Image
              </div>
            )}

         
            <h2 className="text-lg font-semibold text-white hover:text-yellow-400 transition duration-200">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>

           
            <p className="text-gray-400 text-sm mt-2">
              {article.source_id} • {new Date(article.pubDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
