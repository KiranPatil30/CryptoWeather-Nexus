import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
  },
});
