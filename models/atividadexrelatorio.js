'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class atividadexrelatorio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      atividadexrelatorio.belongsTo(models.Pacientes);
      atividadexrelatorio.belongsTo(models.atividade);
    }
  };
  atividadexrelatorio.init({
    pacienteId: DataTypes.INTEGER,
    atividadeId: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    dia: DataTypes.STRING,
    mes: DataTypes.STRING,
    ano: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'atividadexrelatorio',
  });
  return atividadexrelatorio;
};