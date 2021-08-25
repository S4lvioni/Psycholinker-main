'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Relatorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      atividadeId: {
        type: Sequelize.INTEGER
      },
      humor: {
        type: Sequelize.INTEGER
      },
      pacienteId: {
        type: Sequelize.INTEGER
      },
      terapeutaId: {
        type: Sequelize.INTEGER
      },
      texto: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Relatorios');
  }
};