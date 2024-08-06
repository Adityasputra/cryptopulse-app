const axios = require("axios");

const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoinData = async (CoinId) => {
  try {
    const { data } = await axios.get(
      `${COINGECKO_API_BASE_URL}/coins/${CoinId}`
    );
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchCoinList = async () => {
  try {
    const { data } = await axios.get(
      `${COINGECKO_API_BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};
