const { Portfolio, PortfolioItem, Coin, User } = require("../models");

module.exports = class PortfolioController {
  static async createPortfolio(req, res) {
    try {
      const portfolio = await Portfolio.create(req.body);
      res.status(201).json(portfolio);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((e) => e.message);
        res.status(400).json({ errors });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getAllPortfolios(req, res) {
    try {
      const portfolios = await Portfolio.findAll({
        include: [User, { model: PortfolioItem, as: "PortfolioItems" }],
      });
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getPortfolioById(req, res) {
    try {
      const portfolio = await Portfolio.findByPk(req.params.id, {
        include: [User, { model: PortfolioItem, as: "PortfolioItems" }],
      });
      if (!portfolio) {
        res.status(404).json({ message: "Portfolio not found" });
      } else {
        res.status(200).json(portfolio);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updatePortfolio(req, res) {
    try {
      const [updated] = await Portfolio.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      if (updated[0] === 0) {
        res.status(404).json({ message: "Portfolio not found" });
      } else {
        const updatedPortfolio = await Portfolio.findByPk(req.params.id, {
          include: [User, { model: PortfolioItem, as: "PortfolioItems" }],
        });
        res.status(200).json(updatedPortfolio);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deletePortfolio(req, res) {
    try {
      const deleted = await Portfolio.destroy({
        where: { id: req.params.id },
      });
      if (deleted === 0) {
        res.status(404).json({ message: "Portfolio not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUserPortfolios(req, res) {
    try {
      const userId = req.user.id;
      const portfolios = await Portfolio.findAll({
        where: { userId: userId },
        include: [
          { model: PortfolioItem, as: "PortfolioItems", include: [Coin] },
        ],
      });
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getPortfolioItems(req, res) {
    try {
      const { portfolioId } = req.params;
      const portfolio = await Portfolio.findByPk(portfolioId, {
        include: [PortfolioItem],
      });
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json(portfolio.PortfolioItems);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async buyCoin(req, res) {
    try {
      const { coinId, quantity } = req.body;
      const userId = req.user.id;

      const coin = await Coin.findByPk(coinId);
      if (!coin) {
        return res.status(404).json({ message: "Coin not found" });
      }

      const totalCost = coin.price * quantity;

      const user = await User.findByPk(userId);
      if (!user || user.balance < totalCost) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      user.balance -= totalCost;
      await user.save();

      let portfolio = await Portfolio.findOne({ where: { userId } });
      if (!portfolio) {
        portfolio = await Portfolio.create({ userId });
      }

      const portfolioItem = await PortfolioItem.create({
        portfolioId: portfolio.id,
        coinId,
        quantity,
      });

      res.status(201).json(portfolioItem);
    } catch (error) {
      console.error("Error buying coin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
