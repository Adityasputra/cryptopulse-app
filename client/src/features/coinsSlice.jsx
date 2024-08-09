import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await axios.get("/api/coins/api/markets");
  return response.data;
});

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [],
    portfolio: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addCoinToPortfolio: (state, action) => {
      const coin = action.payload;
      state.portfolio.push(coin);
    },
    setPortfolio: (state, action) => {
      state.portfolio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { addCoinToPortfolio, setPortfolio } = coinsSlice.actions;

// Export the reducer
export default coinsSlice.reducer;
