'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coin.init({
    apiId: DataTypes.STRING,
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    currentPrice: DataTypes.DECIMAL,
    marketCap: DataTypes.DECIMAL,
    volume: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Coin',
  });
  return Coin;
};