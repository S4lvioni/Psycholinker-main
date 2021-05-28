'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicacoe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicacoe.belongsTo(models.Paciente);
      Medicacoe.belongsTo(models.Relatorio);
    }
  };
  Medicacoe.init({
    nome: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER,
    relatorioId: DataTypes.INTEGER,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'medicacoe',
  });
  return Medicacoe;
};