"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coin.hasMany(models.Portfolio);
      Coin.hasMany(models.News);
      Coin.hasMany(models.Notification);
      Coin.hasMany(models.Transaction);
    }
  }
  Coin.init(
    {
      apiId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
          len: {
            args: [1, 100],
            msg: "Min char is 1 and Max is 100",
          },
        },
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Symbol is required",
          },
          notNull: {
            msg: "Symbol is required",
          },
          len: {
            args: [1, 10],
            msg: "Min char is 1 and Max is 10",
          },
        },
      },
      currentPrice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
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
      marketCap: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: "Market Cap must not be less than 0",
          },
          isDecimal: {
            msg: "Must be an Decimal",
          },
        },
      },
      volume: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: "Volume must not be less than 0",
          },
          isDecimal: {
            msg: "Must be an Decimal",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Coin",
    }
  );
  return Coin;
};
