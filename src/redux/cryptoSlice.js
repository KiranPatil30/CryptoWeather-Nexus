// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // // Fetch crypto data from CoinGecko API
// // export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
// //   const response = await fetch(
// //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano"
// //   );
// //   const data = await response.json();
// //   console.log("Crypto data:",data);
// //   return data;
// // });

// // const cryptoSlice = createSlice({
// //   name: "crypto",
// //   initialState: {
// //     data: [],
// //     loading: false,
// //     error: null,
// //   },
// //   reducers: {
// //     updateCryptoPrice: (state, action) => {
// //       const { id, price } = action.payload;
// //       const crypto = state.data.find((coin) => coin.id === id);
// //       if (crypto) {
// //         crypto.current_price = price;
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchCrypto.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchCrypto.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.data = action.payload;
// //       })
// //       .addCase(fetchCrypto.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message;
// //       });
// //   },
// // });

// // export const { updateCryptoPrice } = cryptoSlice.actions;
// // export default cryptoSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // 🔹 Fetch crypto data from CoinGecko API
// export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
//   const response = await fetch(
//     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano"
//   );
//   const data = await response.json();
//   // console.log("Fetched Crypto Data:", data); // ✅ Debug API Response
//   return data;
// });

// const cryptoSlice = createSlice({
//   name: "crypto",
//   initialState: {
//     data: [],
//     favorites: JSON.parse(localStorage.getItem("cryptoFavorites")) || [], // Load favorites
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     updateCryptoPrice: (state, action) => {
//       const { id, price } = action.payload;
//       const crypto = state.data.find((coin) => coin.id === id);
//       if (crypto) {
//         crypto.current_price = price; // 🔹 Update only the price
//       }

      
//     },
//     toggleFavoriteCrypto: (state, action) => {
//       const coinId = action.payload;
//       if (state.favorites.includes(coinId)) {
//         state.favorites = state.favorites.filter((id) => id !== coinId);
//       } else {
//         state.favorites.push(coinId);
//       }
//       localStorage.setItem("cryptoFavorites", JSON.stringify(state.favorites));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCrypto.pending, (state) => {
//         state.loading = true;
//       })
//       // .addCase(fetchCrypto.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.data = action.payload;
//       // })

//       .addCase(fetchCrypto.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload.map((coin) => ({
//           ...coin,
//           current_price: typeof coin.current_price === "number" ? coin.current_price : 0, // Ensure numeric value
//         }));
//       })
      
//       .addCase(fetchCrypto.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { updateCryptoPrice,toggleFavoriteCrypto } = cryptoSlice.actions;
// export default cryptoSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // 🔹 Safe function to get favorites from localStorage (only in browser)
// const getFavoritesFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     return JSON.parse(localStorage.getItem("cryptoFavorites")) || [];
//   }
//   return []; // Return empty array on the server
// };

// // 🔹 Fetch crypto data from CoinGecko API
// export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
//   const response = await fetch(
//     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano"
//   );
//   const data = await response.json();
//   return data;
// });

// const cryptoSlice = createSlice({
//   name: "crypto",
//   initialState: {
//     data: [],
//     favorites: getFavoritesFromLocalStorage(), // ✅ Now safe during SSR
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     updateCryptoPrice: (state, action) => {
//       const { id, price } = action.payload;
//       const crypto = state.data.find((coin) => coin.id === id);
//       if (crypto) {
//         crypto.current_price = price; // 🔹 Update only the price
//       }
//     },
//     toggleFavoriteCrypto: (state, action) => {
//       const coinId = action.payload;
//       if (state.favorites.includes(coinId)) {
//         state.favorites = state.favorites.filter((id) => id !== coinId);
//       } else {
//         state.favorites.push(coinId);
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("cryptoFavorites", JSON.stringify(state.favorites)); // ✅ Only runs in browser
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCrypto.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCrypto.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchCrypto.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { updateCryptoPrice, toggleFavoriteCrypto } = cryptoSlice.actions;
// export default cryptoSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Function to fetch cryptocurrency data with retry logic
// const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error(`Fetch attempt ${i + 1} failed:`, error);
//       if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
//     }
//   }
//   throw new Error("Failed to fetch after multiple attempts");
// };

// // Async thunk for fetching crypto data
// export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async (_, { rejectWithValue }) => {
//   try {
//     const data = await fetchWithRetry("https://api.coincap.io/v2/assets");
//     return data.data;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// const cryptoSlice = createSlice({
//   name: "crypto",
//   initialState: { data: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCrypto.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCrypto.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchCrypto.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default cryptoSlice.reducer;
// export const updateCryptoPrice = createAction("crypto/updatePrice");

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Function to fetch cryptocurrency data with retry logic
const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to fetch after multiple attempts");
};

// Async thunk for fetching crypto data
export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchWithRetry("https://api.coincap.io/v2/assets");
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: { data: [], loading: false, error: null },
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price } = action.payload;
      const coin = state.data.find((c) => c.id === id);
      if (coin) {
        coin.current_price = parseFloat(price); // Ensure it's a number
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cryptoSlice.reducer;
export const { updateCryptoPrice } = cryptoSlice.actions; // ✅ Only one export, no duplicate
