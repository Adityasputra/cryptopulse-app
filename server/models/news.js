"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.Coin);
    }
  }
  News.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Url is required",
          },
          notNull: {
            msg: "Url is required",
          },
          isUrl: {
            msg: "Invalid url formatted",
          },
        },
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Must be an Date",
          },
        },
      },
      CoinId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Must be an Integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
