'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paciente.hasMany(models.Relatorio);
      Paciente.hasMany(models.Medicacoe);
      Paciente.hasMany(models.Agendamento);
      Paciente.hasMany(models.Observacao);
      Paciente.belongsTo(models.Terapeuta);
    }
  };
  Paciente.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    terapeutaId: DataTypes.INTEGER
  }, {
    sequelize,
     tableName: 'pacientes',
  });
  return Paciente;
};