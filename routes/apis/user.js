const routes = require('express').Router();
const { auth } = require('../../middlewares/authentication');
const UserController = require('../../modules/user/controller');

routes.use(auth);
routes.post('/', UserController.getAll);

module.exports = routes;