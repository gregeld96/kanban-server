'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subtask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subtask.belongsTo(models.Task, {foreignKey: 'taskId', as: 'task'});
      Subtask.belongsTo(models.Account, {foreignKey: 'assignId', as: 'assignTo'});
      Subtask.hasMany(models.TaskComment, {foreignKey: 'subtaskId', as: 'comments'});
    }
  }
  Subtask.init({
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    assignId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subtask',
    tableName: 'subtasks',
    underscored: true
  });
  return Subtask;
};