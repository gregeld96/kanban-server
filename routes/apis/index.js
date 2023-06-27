const routes = require('express').Router();
const AuthRoutes = require('./authentication');
const CategoryRoutes = require('./category');
const TaskRoutes = require('./task');
const SubTaskRoutes = require('./subtask');
const TaskCommentRoutes = require('./comment');

routes.use('/auths', AuthRoutes);
routes.use('/categories', CategoryRoutes);
routes.use('/tasks', TaskRoutes);
routes.use('/subtasks', SubTaskRoutes);
routes.use('/comments', TaskCommentRoutes);

module.exports = routes;