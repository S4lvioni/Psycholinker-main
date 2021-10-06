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
      relatorio.belongsTo(models.paciente)
    }
  };
  relatorio.init({
    humor: DataTypes.INTEGER,
    texto: DataTypes.STRING,
    datar: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'relatorio',
  });
  return relatorio;
};