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
      pacienteId: {
        type: Sequelize.INTEGER,
        references: { model: 'pacientes', key: 'id' }
      },
      atividadeId: {
        type: Sequelize.INTEGER,
        references: { model: 'atividades', key: 'id' }
      },
      nome:{
        type: Sequelize.STRING
      },
      dia:{
        type: Sequelize.STRING
      },
      mes:{
        type: Sequelize.STRING
      },
      ano:{
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
    await queryInterface.dropTable('atividadexrelatorios');
  }
};