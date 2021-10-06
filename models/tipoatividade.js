'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipoatividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tipoatividade.belongsTo(models.paciente)
      tipoatividade.hasMany(models.atividade)
    }
  };
  tipoatividade.init({
    nome: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tipoatividade',
  });
  return tipoatividade;
};