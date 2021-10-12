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
      atividade.belongsTo(models.Pacientes);
      atividade.hasMany(models.atividadexrelatorio);
    }
  };
  atividade.init({
    nome: DataTypes.STRING,
    relatorioId: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'atividade',
  });
  return atividade;
};