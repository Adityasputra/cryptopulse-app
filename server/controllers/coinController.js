const { Coin } = require("../models");
const { fetchCoinData, fetchCoinList } = require("../services/coinService");

module.exports = class CoinController {
  static async createCoin(req, res) {
    try {
      const coin = await Coin.create(req.body);
      res.status(201).json(coin);
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
      const coins = await Coin.findAll();
      res.status(200).json(coins);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async getCoinById(req, res) {
    try {
      const coin = await Coin.findByPk(req.params.id);

      if (!coin) {
        throw { name: "Not Found" };
      }

      res.status(200).json(coin);
    } catch (error) {
      if (error.name === "Not Found") {
        res.status(404).json({
          message: "Not Found",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async updateCoin(req, res) {
    try {
      const [updated] = await Coin.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!updated) {
        throw { name: "Not Found" };
      } else {
        const updatedCoin = await Coin.findByPk(req.params.id);
        res.status(200).json(updatedCoin);
      }
    } catch (error) {
      if (error.name === "Not Found") {
        res.status(404).json({
          message: "Not Found",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async fetchCoinDataFromAPI(req, res) {
    try {
      const coinData = await fetchCoinData(req.params.CoinId);
      res.status(200).json(coinData);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
