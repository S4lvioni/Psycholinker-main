'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class terapeuta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      terapeuta.hasMany(models.paciente)
      terapeuta.hasMany(models.observacao)
      terapeuta.hasMany(models.diasUteis)
      terapeuta.hasMany(models.dia)
    }
  };
  terapeuta.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    cr: DataTypes.STRING,
    especializacao: DataTypes.STRING,
    password: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'terapeuta',
  });
  return terapeuta;
};