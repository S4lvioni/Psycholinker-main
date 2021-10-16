'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('relatorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      humor: {
        type: Sequelize.INTEGER
      },
      texto: {
        type: Sequelize.TEXT
      },
      emissao: {
        type: Sequelize.STRING
      },
      
      pacienteId: {
        type: Sequelize.INTEGER,
        references: { model: 'pacientes', key: 'id' }
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
    await queryInterface.dropTable('relatorios');
  }
};