'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class observacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      observacao.belongsTo(models.terapeuta)
      observacao.belongsTo(models.paciente)
    }
  };
  observacao.init({
    texto: DataTypes.STRING,
    terapeutaId: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'observacao',
  });
  return observacao;
};