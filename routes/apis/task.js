const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const TaskController = require('../../modules/task/controller');

routes.use(auth);
routes.get('/:id', TaskController.getById)
routes.get('/category/:categoryId', TaskController.getBasedCategory);
routes.put('/update/:id', TaskController.update);
routes.put('/update-category/:id', TaskController.updateTaskCategory);
routes.post('/assign/:id', TaskController.assignAccount);
routes.post('/', TaskController.create);
routes.delete('/:id', TaskController.removeData);

module.exports = routes;