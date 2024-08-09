// controllers/portfolioController.js

const { Portfolio } = require("../models");

// Mendapatkan semua portofolio
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan portofolio berdasarkan ID
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat portofolio baru
exports.createPortfolio = async (req, res) => {
  try {
    const {
      coinId,
      name,
      symbol,
      current_price,
      market_cap,
      price_change_percentage_24h,
    } = req.body;
    const newPortfolio = await Portfolio.create({
      coinId,
      name,
      symbol,
      current_price,
      market_cap,
      price_change_percentage_24h,
    });
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengupdate portofolio
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      coinId,
      name,
      symbol,
      current_price,
      market_cap,
      price_change_percentage_24h,
    } = req.body;

    const [updated] = await Portfolio.update(
      {
        coinId,
        name,
        symbol,
        current_price,
        market_cap,
        price_change_percentage_24h,
      },
      { where: { id } }
    );

    if (updated) {
      const updatedPortfolio = await Portfolio.findByPk(id);
      res.status(200).json(updatedPortfolio);
    } else {
      res.status(404).json({ message: "Portfolio not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus portofolio
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Portfolio.destroy({ where: { id } });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Portfolio not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
