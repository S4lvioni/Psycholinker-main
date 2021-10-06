'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horasUteis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      horasUteis.belongsTo(models.diasUteis)
    }
  };
  horasUteis.init({
    status: DataTypes.BOOLEAN,
    hora: DataTypes.STRING,
    diasUteisId: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'horasUteis',
  });
  return horasUteis;
};