'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agendado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      agendado.belongsTo(models.Pacientes);
      agendado.belongsTo(models.Terapeutas);
    }
  };
  agendado.init({
    horario: DataTypes.STRING,
    paciente: DataTypes.STRING,
    terapeutaId: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'agendado',
  });
  return agendado;
};