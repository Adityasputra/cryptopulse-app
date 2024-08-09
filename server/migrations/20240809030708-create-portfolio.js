"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Portfolios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coinId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      current_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      market_cap: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      price_change_percentage_24h: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Portfolios");
  },
};
