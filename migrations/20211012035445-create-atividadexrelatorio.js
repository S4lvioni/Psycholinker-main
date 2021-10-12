'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('atividadexrelatorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      relatorioId: {
        type: Sequelize.INTEGER,
        references: { model: 'relatorios', key: 'id' }
      },
      atividadeId: {
        type: Sequelize.INTEGER,
        references: { model: 'atividades', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('atividadexrelatorios');
  }
};