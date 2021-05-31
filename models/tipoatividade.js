'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoAtividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoAtividade.hasMany(models.Atividade);
    }
  };
  TipoAtividade.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'tipoatividades',
  });
  return TipoAtividade;
};