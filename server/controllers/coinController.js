const { Coin } = require("../models");
const { fetchCoinData, fetchCoinList } = require("../services/coinService");

class CoinController {
  static async createCoin(req, res) {
    try {
      const { apiId, name, symbol, currentPrice, marketCap, volume } = req.body;
      const coin = await Coin.create({
        apiId,
        name,
        symbol,
        currentPrice,
        marketCap,
        volume,
      });
      res.status(201).json(coin);
    } catch (error) {
      console.error("Error creating coin:", error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllCoins(req, res) {
    try {
      const coins = await Coin.findAll();
      res.status(200).json(coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getCoinById(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid coin ID" });
      }
      const coin = await Coin.findByPk(id);
      if (!coin) {
        return res.status(404).json({ message: "Coin not found" });
      }
      res.status(200).json(coin);
    } catch (error) {
      console.error("Error fetching coin by ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateCoin(req, res) {
    try {
      const { id } = req.params;
      const { apiId, name, symbol, currentPrice, marketCap, volume } = req.body;
      const [updated] = await Coin.update(
        { apiId, name, symbol, currentPrice, marketCap, volume },
        { where: { id }, returning: true }
      );
      if (updated[0] === 0) {
        return res.status(404).json({ message: "Coin not found" });
      }
      res.status(200).json({ message: "Coin updated successfully" });
    } catch (error) {
      console.error("Error updating coin:", error);
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteCoin(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Coin.destroy({ where: { id } });
      if (deleted === 0) {
        return res.status(404).json({ message: "Coin not found" });
      }
      res.status(200).json({ message: "Coin deleted successfully" });
    } catch (error) {
      console.error("Error deleting coin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async fetchCoinDataFromAPI(req, res) {
    try {
      const { coinId } = req.params;
      if (!coinId) {
        return res
          .status(400)
          .json({ message: "coinId parameter is required" });
      }
      const data = await fetchCoinData(coinId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching coin data from API:", error);
      res.status(500).json({ message: "Failed to fetch coin data" });
    }
  }

  static async fetchCoinListFromApi(req, res) {
    try {
      const coinList = await fetchCoinList();
      res.status(200).json(coinList);
    } catch (error) {
      console.error("Error fetching coin list from API:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = CoinController;
