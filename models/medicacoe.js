'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicacoes.belongsTo(models.Paciente);
      Medicacoes.belongsTo(models.Relatorio);
    }
  };
  Medicacoes.init({
    nome: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER,
    relatorioId: DataTypes.INTEGER,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medicacoes',
  });
  return Medicacoes;
};