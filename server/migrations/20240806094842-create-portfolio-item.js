"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PortfolioItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PortfolioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Portfolios",
          key: "id",
        },
        onDelete: "cascade",
      },
      CoinId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Coins",
          key: "id",
        },
        onDelete: "set null",
      },
      quantity: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      purchasePrice: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("PortfolioItems");
  },
};
