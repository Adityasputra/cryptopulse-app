import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coinsSlice";

const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export default store;
