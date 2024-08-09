// store.js
import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coinsSlice";
// import portfoliosReducer from "./features/portfoliosSlice";

const store = configureStore({
  reducer: {
    coins: coinsReducer,
    // portfolios: portfoliosReducer,
  },
});

export default store;
