'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diasuteis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      diasuteis.belongsTo(models.Terapeutas);
    }
  };
  diasuteis.init({
    dia: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    terapeutaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diasuteis',
  });
  return diasuteis;
};