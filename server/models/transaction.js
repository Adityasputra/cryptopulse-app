"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Coin);
    }
  }
  Transaction.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Must be an Integer",
          },
        },
      },
      CoinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Must be an Integer",
          },
        },
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction type is required",
          },
          notNull: {
            msg: "Transaction type is required",
          },
          isIn: {
            args: [["buy"], ["sell"]],
            msg: "Only 'Buy' or 'Sell' is allowed",
          },
        },
      },
      quantity: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Must be an Decimal",
          },
          min: {
            args: 0,
            msg: "Quantity must not be less than 0",
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Must be an Decimal",
          },
          min: {
            args: 0,
            msg: "Price must not be less than 0",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
