'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Data.belongsTo(models.Agendamento);
    }
  };
  Data.init({
    hora: DataTypes.DATE,
    agendamentoId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'data',
  });
  return Data;
};