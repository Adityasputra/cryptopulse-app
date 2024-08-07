const axios = require("axios");
const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";

const fetchCoinData = async (coinId) => {
  if (!coinId) {
    throw new Error("coinId is required");
  }
  try {
    const { data } = await axios.get(
      `${COINGECKO_API_BASE_URL}/coins/${coinId}`,
      {
        params: {
          vs_currency: "usd",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching coin data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch coin data");
  }
};

const fetchCoinList = async () => {
  try {
    const { data } = await axios.get(`${COINGECKO_API_BASE_URL}/coins/list`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching coin list:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch coin list");
  }
};

module.exports = {
  fetchCoinData,
  fetchCoinList,
};
