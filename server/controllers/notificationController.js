const { Notification, User, Coin } = require("../models");

module.exports = class NotificationController {
  static async createNotification(req, res) {
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json(notification);
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

  static async getAllNotifications(req, res) {
    try {
      const notifications = await Notification.findAll({
        include: [User, Coin],
      });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getNotificationById(req, res) {
    try {
      const notification = await Notification.findByPk(req.params.id, {
        include: [User, Coin],
      });
      if (!notification) {
        res.status(404).json({ message: "Notification not found" });
      } else {
        res.status(200).json(notification);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateNotification(req, res) {
    try {
      const [updated] = await Notification.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) {
        res.status(404).json({ message: "Notification not found" });
      } else {
        const updatedNotification = await Notification.findByPk(req.params.id, {
          include: [User, Coin],
        });
        res.status(200).json(updatedNotification);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteNotification(req, res) {
    try {
      const deleted = await Notification.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        res.status(404).json({ message: "Notification not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
