// import { createSlice } from "@reduxjs/toolkit";
// import {
//   getAllPortfolios,
//   createPortfolio,
//   updatePortfolio as updatePortfolioAPI, // Rename to avoid conflict
//   deletePortfolio,
// } from "../services/postofolio";

// export const portfolioSlice = createSlice({
//   name: "portfolio",
//   initialState: {
//     portfolios: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     setPortfolios: (state, action) => {
//       state.portfolios = action.payload;
//     },
//     addPortfolio: (state, action) => {
//       state.portfolios.push(action.payload);
//     },
//     updatePortfolio: (state, action) => {
//       const index = state.portfolios.findIndex(
//         (portfolio) => portfolio.id === action.payload.id
//       );
//       if (index >= 0) {
//         state.portfolios[index] = action.payload;
//       }
//     },
//     removePortfolio: (state, action) => {
//       state.portfolios = state.portfolios.filter(
//         (portfolio) => portfolio.id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPortfolios.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPortfolios.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.portfolios = action.payload;
//       })
//       .addCase(fetchPortfolios.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setPortfolios, addPortfolio, updatePortfolio, removePortfolio } =
//   portfolioSlice.actions;

// export const fetchPortfolios = () => async (dispatch) => {
//   try {
//     const portfolios = await getAllPortfolios();
//     dispatch(setPortfolios(portfolios));
//   } catch (error) {
//     console.error("Failed to fetch portfolios:", error);
//   }
// };

// export const createPortfolioAsync = (portfolio) => async (dispatch) => {
//   try {
//     const newPortfolio = await createPortfolio(portfolio);
//     dispatch(addPortfolio(newPortfolio));
//   } catch (error) {
//     console.error("Failed to create portfolio:", error);
//   }
// };

// export const updatePortfolioAsync = (id, portfolio) => async (dispatch) => {
//   try {
//     const updatedPortfolio = await updatePortfolioAPI(id, portfolio); // Use renamed import
//     dispatch(updatePortfolio(updatedPortfolio));
//   } catch (error) {
//     console.error("Failed to update portfolio:", error);
//   }
// };

// export const deletePortfolioAsync = (id) => async (dispatch) => {
//   try {
//     await deletePortfolio(id);
//     dispatch(removePortfolio(id));
//   } catch (error) {
//     console.error("Failed to delete portfolio:", error);
//   }
// };

// export default portfolioSlice.reducer;
