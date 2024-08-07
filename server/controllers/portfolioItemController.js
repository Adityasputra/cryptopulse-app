const { PortfolioItem, Portfolio, Coin } = require("../models");

module.exports = class PortfolioItemController {
  static async createPortfolioItem(req, res) {
    try {
      const portfolioItem = await PortfolioItem.create(req.body);
      res.status(201).json(portfolioItem);
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

  static async getAllPortfolioItems(req, res) {
    try {
      const portfolioItems = await PortfolioItem.findAll({
        include: [Portfolio, Coin],
      });
      res.status(200).json(portfolioItems);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getPortfolioItemById(req, res) {
    try {
      const portfolioItem = await PortfolioItem.findByPk(req.params.id, {
        include: [Portfolio, Coin],
      });
      if (!portfolioItem) {
        res.status(404).json({ message: "Portfolio Item not found" });
      } else {
        res.status(200).json(portfolioItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updatePortfolioItem(req, res) {
    try {
      const [updated] = await PortfolioItem.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) {
        res.status(404).json({ message: "Portfolio Item not found" });
      } else {
        const updatedPortfolioItem = await PortfolioItem.findByPk(
          req.params.id,
          {
            include: [Portfolio, Coin],
          }
        );
        res.status(200).json(updatedPortfolioItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deletePortfolioItem(req, res) {
    try {
      const deleted = await PortfolioItem.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        res.status(404).json({ message: "Portfolio Item not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
