"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User);
      Notification.belongsTo(models.Coin);
    }
  }
  Notification.init(
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
      targetPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Must be an Decimal",
          },
          min: {
            args: 0,
            msg: "Target Price must not be less than 0",
          },
        },
      },
      notified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
