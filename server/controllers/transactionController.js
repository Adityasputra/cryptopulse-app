const { Transaction } = require("../models");
const { getCoinData } = require("../services/coinService");

const createTransaction = async (req, res) => {
  const { coinId, transactionType, quantity, price } = req.body;
  const UserId = req.user.id;
  try {
    const coinData = await getCoinData(coinId);

    const transaction = await Transaction.create({
      CoinId,
      transactionType,
      quantity,
      price,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { UserId: req.user.id },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};
