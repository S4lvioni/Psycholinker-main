'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Datas.init({
    agendamentoId: DataTypes.INTEGER,
    hora: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Datas',
  });
  return Datas;
};