const { News, Coin } = require("../models");

module.exports = class NewsController {
  static async createNews(req, res) {
    try {
      const news = await News.create(req.body);
      res.status(201).json(news);
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

  static async getAllNews(req, res) {
    try {
      const news = await News.findAll({
        include: Coin,
      });
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getNewsById(req, res) {
    try {
      const news = await News.findByPk(req.params.id, {
        include: Coin,
      });
      if (!news) {
        res.status(404).json({ message: "News not found" });
      } else {
        res.status(200).json(news);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateNews(req, res) {
    try {
      const [updated] = await News.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      if (updated[0] === 0) {
        res.status(404).json({ message: "News not found" });
      } else {
        const updatedNews = await News.findByPk(req.params.id, {
          include: Coin,
        });
        res.status(200).json(updatedNews);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteNews(req, res) {
    try {
      const deleted = await News.destroy({
        where: { id: req.params.id },
      });
      if (deleted === 0) {
        res.status(404).json({ message: "News not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
