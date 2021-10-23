'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agendados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      horario: {
        type: Sequelize.STRING
      },
      paciente: {
        type: Sequelize.STRING
      },
      terapeutaId: {
        type: Sequelize.INTEGER,
        references: { model: 'terapeutas', key: 'id' }
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
    await queryInterface.dropTable('agendados');
  }
};