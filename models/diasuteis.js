'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diasUteis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      diasUteis.belongsTo(models.terapeuta)
      diasUteis.hasMany(models.horasUteis)
    }
  };
  diasUteis.init({
    status: DataTypes.BOOLEAN,
    dia: DataTypes.STRING,
    terapeutaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diasUteis',
  });
  return diasUteis;
};