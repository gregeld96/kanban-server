'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskAccount.belongsTo(models.Account, {foreignKey: 'accountId', as: 'assign'});
      TaskAccount.belongsTo(models.Task, {foreignKey: 'taskId', as: 'task'})
    }
  }
  TaskAccount.init({
    accountId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaskAccount',
    tableName: 'task_accounts',
    underscored: true
  });
  return TaskAccount;
};