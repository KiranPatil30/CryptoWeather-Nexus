🌐 Crypto Weather Nexus

A fully functional, modern dashboard that displays **live cryptocurrency prices**, **weather updates**, and **news** using Next.js 13+, Redux Toolkit, and Tailwind CSS.

## 🚀 Live Demo

🔗 https://crypto-weather-nexus-tau.vercel.app/

---

## 🛠️ Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **API Integration:**
  - OpenWeatherMap API (Weather)
  - CoinGecko API (Cryptocurrency)
  - NewsAPI (News Headlines)
- **Deployment:** Vercel

---

## 📦 Features

- 📉 Live cryptocurrency prices with details on click
- 🌦️ Live weather data for multiple cities
- 📰 Latest crypto news updates
- ⭐ Add/remove favorite cities
- Responsive & mobile-friendly UI

---

## 📁 Project Structure
/src ├── app 
│     │ ├── CryptoSection 
│     │ │ ├── [id] 
│     │   │ └── page.js 
│     │   └── page.js 
│     │ ├── NewsSection 
│     │ └── WeatherSection 
│     ├── components 
├── redux 
│ └── store.js 
│ └── cryptoSlice.js 
│ └── weatherSlice.js 
    


---

## 🔧 Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/crypto-weather-nexus.git
cd crypto-weather-nexus

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env.local

# 4. Run the development server
npm run dev
```

🌍 Deployment
This project is deployed via Vercel. You can deploy it using:
npx vercel


🎨 Design Decisions
Redux Toolkit was chosen to manage app-wide state and improve code scalability.
App Router (Next.js 13) to take advantage of React Server Components and better route organization.
Tailwind CSS provides a utility-first approach for responsive, maintainable styles.
Hydration issues were mitigated using proper client-only rendering where necessary ("use client" directive).


📫 Contact
📧 kiranspatil686@gmail.com
👨‍💻 Developer: Kiran Patil
