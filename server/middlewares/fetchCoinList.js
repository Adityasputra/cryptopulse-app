const { fetchCoinList } = require("../services/coinService");

const fetchCoinListMiddleware = async (req, res, next) => {
  try {
    const coinList = await fetchCoinList();
    req.coinList = coinList;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = fetchCoinListMiddleware;
