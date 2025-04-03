// // import WeatherSection from '@/app/WeatherSection/page';
// // import CryptoSection from '@/app/CryptoSection';
// // import NewsSection from '@/app/NewsSection';


// // export default function Home() {
// //   return (
// //     <div className="min-h-screen p-8 bg-gray-100">
// //       <h1 className="text-4xl text-center font-bold mb-8">CryptoWeather Nexus</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //         <div className="bg-white p-4 rounded-lg shadow-md">
// //           <WeatherSection/>
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow-md">
// //           <CryptoSection />
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow-md">
// //           <NewsSection />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// export default function Page() {
//   return (
//     <div>
//       <h1>Welcome to CryptoWeather Nexus</h1>
//       <p>Dashboard combining weather, crypto, and news!</p>
//     </div>
//   );
// }


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="text-center py-10 bg-blue-600">
        <h1 className="text-4xl font-bold">Welcome to CryptoWeather Nexus</h1>
        <p className="text-lg mt-2">Your dashboard for Weather, Cryptocurrency, and News</p>
      </header>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Weather Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-yellow-400">🌤 Weather</h2>
          <p className="mt-2">Get live weather updates for multiple cities.</p>
          <a href="/WeatherSection" className="inline-block mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700">
            View Weather
          </a>
        </div>

        {/* Crypto Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-green-400">💰 Crypto</h2>
          <p className="mt-2">Live prices, trends, and market insights.</p>
          <a href="/CryptoSection" className="inline-block mt-4 px-4 py-2 bg-green-500 rounded-md hover:bg-green-700">
            View Crypto
          </a>
        </div>

        {/* News Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-red-400">📰 News</h2>
          <p className="mt-2">Stay updated with the latest crypto news.</p>
          <a href="/NewsSection" className="inline-block mt-4 px-4 py-2 bg-red-500 rounded-md hover:bg-red-700">
            View News
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800 mt-10">
        <p>© 2024 CryptoWeather Nexus. All rights reserved.</p>
      </footer>
    </div>
  );
}
