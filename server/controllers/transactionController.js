const { Transaction, User, Coin } = require("../models");

module.exports = class TransactionController {
  static async createTransaction(req, res) {
    try {
      const transaction = await Transaction.create(req.body);
      res.status(201).json(transaction);
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

  static async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll({
        include: [User, Coin],
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const transaction = await Transaction.findByPk(req.params.id, {
        include: [User, Coin],
      });
      if (!transaction) {
        res.status(404).json({ message: "Transaction not found" });
      } else {
        res.status(200).json(transaction);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateTransaction(req, res) {
    try {
      const [updated] = await Transaction.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      if (updated[0] === 0) {
        res.status(404).json({ message: "Transaction not found" });
      } else {
        const updatedTransaction = await Transaction.findByPk(req.params.id, {
          include: [User, Coin],
        });
        res.status(200).json(updatedTransaction);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteTransaction(req, res) {
    try {
      const deleted = await Transaction.destroy({
        where: { id: req.params.id },
      });
      if (deleted === 0) {
        res.status(404).json({ message: "Transaction not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
