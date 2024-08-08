import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  try {
    const response = await axios.get("/api/coins/data/markets");
    return response.data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    throw new Error(errorMessage);
  }
});

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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

export default coinsSlice.reducer;
