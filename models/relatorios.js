'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relatorios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Relatorios.init({
    atividadeId: DataTypes.INTEGER,
    humor: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER,
    terapeutaId: DataTypes.INTEGER,
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Relatorios',
  });
  return Relatorios;
};