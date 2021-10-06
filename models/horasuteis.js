'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horasuteis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      horasuteis.belongsTo(models.Terapeutas);
    }
  };
  horasuteis.init({
    hora: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    terapeutaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'horasuteis',
  });
  return horasuteis;
};