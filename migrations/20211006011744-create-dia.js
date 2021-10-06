'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      dia: {
        type: Sequelize.STRING
      },
      terapeutaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'terapeuta',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      diasUteisId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'diasUteis',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('dia');
  }
};