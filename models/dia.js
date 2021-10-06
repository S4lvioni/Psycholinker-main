'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dia.belongsTo(models.terapeuta)
      dia.hasMany(models.horas)
    }
  };
  dia.init({
    status: DataTypes.BOOLEAN,
    dia: DataTypes.STRING,
    terapeutaId: DataTypes.INTEGER,
    diasUteisId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dia',
  });
  return dia;
};