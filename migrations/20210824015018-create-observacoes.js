'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Observacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        references: { model: 'Pacientes', key: 'id' }
      },
      terapeutaId: {
        type: Sequelize.INTEGER,
        references: { model: 'terapeutas', key: 'id' }
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
    await queryInterface.dropTable('Observacoes');
  }
};