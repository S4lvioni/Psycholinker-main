'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class relatorio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      relatorio.hasMany(models.atividadexrelatorio);
      relatorio.hasMany(models.remedioxrelatorio);
      relatorio.belongsTo(models.Pacientes);
    }
  };
  relatorio.init({
    humor: DataTypes.INTEGER,
    texto: DataTypes.TEXT,
    emissao: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'relatorio',
  });
  return relatorio;
};