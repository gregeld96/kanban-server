'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.hasMany(models.Subtask, {foreignKey: 'taskId', as: 'subtasks'});
      Task.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'category'});
      Task.hasMany(models.TaskAccount, {foreignKey: 'taskId', as: 'assign'});
      Task.belongsTo(models.Account, {foreignKey: 'accountId', as: 'owner'});
      Task.hasMany(models.TaskComment, {foreignKey: 'taskId', as: 'comments'});
    }
  }
  Task.init({
    title: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });
  return Task;
};