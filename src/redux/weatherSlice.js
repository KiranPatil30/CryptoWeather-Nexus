// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Fetch weather data for a city
// export const fetchWeather = createAsyncThunk(
//   "weather/fetchWeather",
//   async (city) => {
//     const apiKey = "72d349ce44d84ef09c0a94c96f316fc5";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
//     const response = await fetch(url);
//     if (!response.ok) throw new Error("Failed to fetch weather data");
//     return { city, data: await response.json() }; // ✅ Return city name with data
//   }
// );

// const weatherSlice = createSlice({
//   name: "weather",
//   initialState: {
//     data: {}, // ✅ Store multiple cities as an object
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWeather.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWeather.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data[action.payload.city] = action.payload.data; // ✅ Store city data correctly
//       })
//       .addCase(fetchWeather.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default weatherSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Fetch weather data
// export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
//   const apiKey = "72d349ce44d84ef09c0a94c96f316fc5";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
//   const response = await fetch(url);
//   if (!response.ok) throw new Error("Failed to fetch weather data");
//   return { city, data: await response.json() };
// });

// // Real-time weather alerts using WebSocket
// export const startWeatherAlerts = () => (dispatch) => {
//   const socket = new WebSocket("wss://your-weather-alert-mock-api.com"); // Replace with actual WebSocket URL

//   socket.onmessage = (event) => {
//     const alertData = JSON.parse(event.data);
//     dispatch(setWeatherAlert(alertData)); // Store the alert
//   };

//   return () => socket.close();
// };

// const weatherSlice = createSlice({
//   name: "weather",
//   initialState: {
//     data: {},
//     favorites: JSON.parse(localStorage.getItem("weatherFavorites")) || [], // Load favorites
//     loading: false,
//     error: null,
//     alert: null, // 🔔 Store real-time alerts
//   },
//   reducers: {
//     setWeatherAlert: (state, action) => {
//       state.alert = action.payload; // Store weather alert in Redu
//     },
//     toggleFavoriteCity: (state, action) => {
//       const cityName = action.payload;
//       if (state.favorites.includes(cityName)) {
//         state.favorites = state.favorites.filter((name) => name !== cityName);
//       } else {
//         state.favorites.push(cityName);
//       }
//       localStorage.setItem("weatherFavorites", JSON.stringify(state.favorites));
//     },
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWeather.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWeather.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data[action.payload.city] = action.payload.data;
//       })
//       .addCase(fetchWeather.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setWeatherAlert, toggleFavoriteCity } = weatherSlice.actions;
// export default weatherSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch weather data
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const apiKey = "72d349ce44d84ef09c0a94c96f316fc5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch weather data");

  const weatherData = await response.json();
  // Store fetched weather data in localStorage
  const storedData = JSON.parse(localStorage.getItem("weatherData")) || {};
  storedData[city] = weatherData;
  localStorage.setItem("weatherData", JSON.stringify(storedData));

  return { city, data: weatherData };
});

// Real-time weather alerts using WebSocket
export const startWeatherAlerts = () => (dispatch) => {
  const socket = new WebSocket("wss://your-weather-alert-mock-api.com"); // Replace with actual WebSocket URL

  socket.onopen = () => console.log("WebSocket connected for weather alerts.");

  socket.onmessage = (event) => {
    try {
      const alertData = JSON.parse(event.data);
      dispatch(setWeatherAlert(alertData)); // Store the alert
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  socket.onerror = (error) => console.error("WebSocket error:", error);
  socket.onclose = () => console.log("WebSocket disconnected.");

  return () => socket.close(); // Cleanup function to close WebSocket when unmounting
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: JSON.parse(localStorage.getItem("weatherData")) || {}, // Load weather data from localStorage
    favorites: JSON.parse(localStorage.getItem("weatherFavorites")) || [], // Load favorite cities
    loading: false,
    error: null,
    alert: null, // Store real-time alerts
  },
  reducers: {
    setWeatherAlert: (state, action) => {
      state.alert = action.payload; // Store weather alert in Redux
    },
    toggleFavoriteCity: (state, action) => {
      const cityName = action.payload;
      if (state.favorites.includes(cityName)) {
        state.favorites = state.favorites.filter((name) => name !== cityName);
      } else {
        state.favorites.push(cityName);
      }
      localStorage.setItem("weatherFavorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.city] = action.payload.data;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setWeatherAlert, toggleFavoriteCity } = weatherSlice.actions;
export default weatherSlice.reducer;
