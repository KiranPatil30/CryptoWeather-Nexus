// src/redux/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import weatherReducer from "./weatherSlice";

// export const store = configureStore({
//   reducer: {
//     weather: weatherReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
  },
});
