'use strict';
const { ForeignKeyConstraintError } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Terapeutas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Terapeutas.hasMany(models.Observacoes);
      Terapeutas.hasMany(models.Pacientes);
      Terapeutas.hasMany(models.diasuteis);
      Terapeutas.hasMany(models.horasuteis);
      Terapeutas.hasMany(models.dias);
      Terapeutas.hasMany(models.agendado);
    }
  };
  Terapeutas.init({
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    cr: DataTypes.STRING,
    especializacao: DataTypes.STRING,
    password: DataTypes.STRING,
    horasconf: DataTypes.BOOLEAN,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Terapeutas',
  });
  return Terapeutas;
};