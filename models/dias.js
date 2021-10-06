'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dias.belongsTo(models.Terapeutas);
    }
  };
  dias.init({
    dia: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    terapeutaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dias',
  });
  return dias;
};