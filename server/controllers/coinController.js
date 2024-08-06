const { Coin } = require("../models");
const { fetchCoinData, fetchCoinList } = require("../services/coinService");

module.exports = class CoinController {
  static async createCoin(req, res) {
    try {
      const coins = await Coin.create(req.body);
      res.status(201).json(coins);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const validate = error.errors.map((e) => message);
        res.status(400).json({
          message: validate,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getAllCoins(req, res) {
    try {
      const coins = Coin.findAll();
      res.status(200).json(coins);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
