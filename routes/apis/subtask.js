const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const SubTaskController = require('../../modules/subtask/controller');

routes.use(auth);
routes.get('/:id', SubTaskController.getById)
routes.post('/assign/:id', SubTaskController.assign);
routes.put('/status/:id', SubTaskController.updateStatus)
routes.post('/', SubTaskController.create);
routes.delete('/:id', SubTaskController.removeData);

module.exports = routes;