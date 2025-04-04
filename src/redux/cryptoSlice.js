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
