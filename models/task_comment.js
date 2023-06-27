'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskComment.belongsTo(models.Account, {foreignKey: 'accountId', as: 'account'});
      TaskComment.belongsTo(models.Task, {foreignKey: 'taskId', as: 'task'});
      TaskComment.belongsTo(models.Subtask, {foreignKey: 'subtaskId', as: 'subtask'});
    }
  }
  TaskComment.init({
    accountId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    subtaskId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TaskComment',
    tableName: 'task_comments',
    underscored: true
  });
  return TaskComment;
};