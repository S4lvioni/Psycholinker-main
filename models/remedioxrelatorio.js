'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class remedioxrelatorio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      remedioxrelatorio.belongsTo(models.relatorio);
      remedioxrelatorio.belongsTo(models.remedio);
    }
  };
  remedioxrelatorio.init({
    relatorioId: DataTypes.INTEGER,
    remedioId: DataTypes.INTEGER,
    nome:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'remedioxrelatorio',
  });
  return remedioxrelatorio;
};