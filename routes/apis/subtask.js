const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const SubTaskController = require('../../modules/subtask/controller');

routes.use(auth);
routes.get('/:id', SubTaskController.getById)
routes.post('/assign/:id', SubTaskController.assign);
routes.post('/status/:id', SubTaskController.updateStatus)
routes.post('/', SubTaskController.create);

module.exports = routes;