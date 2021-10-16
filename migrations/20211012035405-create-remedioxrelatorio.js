'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('remedioxrelatorios', {
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
      remedioId: {
        type: Sequelize.INTEGER, 
        references: { model: 'remedios', key: 'id' }
      },
      nome:{
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
    await queryInterface.dropTable('remedioxrelatorios');
  }
};