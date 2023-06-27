'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AccountInformation.belongsTo(models.Account, {foreignKey: 'accountId', as: 'accounts'});
    }
  }
  AccountInformation.init({
    name: DataTypes.STRING,
    bioData: DataTypes.TEXT,
    accountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccountInformation',
    tableName: 'account_informations',
    underscored: true
  });
  return AccountInformation;
};