'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medicacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      medicacao.belongsTo(models.paciente)
      medicacao.belongsTo(models.relatorio)
    }
  };
  medicacao.init({
    nome: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER,
    relatorioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'medicacao',
  });
  return medicacao;
};