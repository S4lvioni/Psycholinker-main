'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pacientes.belongsTo(models.Terapeutas)
    }
  };
  Pacientes.init({
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pacientes',
  });
  return Pacientes;
};