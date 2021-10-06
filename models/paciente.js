'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      paciente.belongsTo(models.terapeuta)
      paciente.hasMany(models.observacao)
      paciente.hasMany(models.medicacao)
      paciente.hasMany(models.tipoatividade)
      paciente.hasMany(models.relatorio)
      paciente.hasMany(models.dia)
      paciente.hasMany(models.atividade)
    }
  };
  paciente.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telefone: DataTypes.STRING,
    code: DataTypes.STRING,
    terapeutaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paciente',
  });
  return paciente;
};