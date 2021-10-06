'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class atividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      atividade.belongsTo(models.tipoatividade)
      atividade.belongsTo(models.paciente)
      atividade.belongsTo(models.relatorio)
    }
  };
  atividade.init({
    nome: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER,
    tipoatividadeId: DataTypes.INTEGER,
    relatorioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'atividade',
  });
  return atividade;
};