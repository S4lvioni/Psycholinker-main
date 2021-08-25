'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  Agendamentos.init({
    pacienteId: DataTypes.INTEGER,
    terapeutaId: DataTypes.INTEGER,
    datasId: DataTypes.INTEGER,
    data_interesse: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Agendamentos',
  });
  return Agendamentos;
};