"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PortfolioItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PortfolioItem.belongsTo(models.Portfolio);
      PortfolioItem.belongsTo(models.Coin);
    }
  }
  PortfolioItem.init(
    {
      PortfolioId: {
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
      purchasePrice: {
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
      modelName: "PortfolioItem",
    }
  );
  return PortfolioItem;
};
