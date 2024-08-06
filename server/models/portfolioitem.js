'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PortfolioItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PortfolioItem.init({
    PortfolioId: DataTypes.INTEGER,
    CoinId: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    purchasePrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'PortfolioItem',
  });
  return PortfolioItem;
};