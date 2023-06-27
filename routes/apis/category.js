const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const CategoryController = require('../../modules/category/controller');

routes.use(auth);
routes.get('/', CategoryController.getAll);
routes.post('/', CategoryController.create);
routes.put('/:id', CategoryController.update);
routes.delete('/:id', CategoryController.removeData);

module.exports = routes;