const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const TaskController = require('../../modules/task/controller');

routes.use(auth);
routes.get('/:id', TaskController.getById)
routes.get('/category/:categoryId', TaskController.getBasedCategory);
routes.post('/update-category/:id', TaskController.updateTaskCategory);
routes.post('/', TaskController.create);
routes.delete('/:id', TaskController.removeData);

module.exports = routes;