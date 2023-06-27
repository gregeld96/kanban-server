const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const TaskCommentController = require('../../modules/comment/controller');

routes.use(auth);
routes.post('/', TaskCommentController.create);

module.exports = routes;