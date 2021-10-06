'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      horas.belongsTo(models.Terapeutas);
      horas.belongsTo(models.Pacientes);
    }
  };
  horas.init({
    hora: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    terapeutaId: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'horas',
  });
  return horas;
};