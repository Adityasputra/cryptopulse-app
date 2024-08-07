const { Portfolio, User, PortfolioItem } = require("../models");

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
      });
      if (!updated) {
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
      if (!deleted) {
        res.status(404).json({ message: "Portfolio not found" });
      } else {
        res.status(204).json();
      }
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
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
