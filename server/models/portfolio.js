("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Portfolio.init(
    {
      coinId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      market_cap: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price_change_percentage_24h: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Portfolio",
    }
  );
  return Portfolio;
};
