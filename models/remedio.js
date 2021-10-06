'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class remedio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      remedio.belongsTo(models.relatorio);
    }
  };
  remedio.init({
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER,
    relatorioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'remedio',
  });
  return remedio;
};