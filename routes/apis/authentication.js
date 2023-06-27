const routes = require('express').Router();
const AuthController = require('../../modules/authentication/controller');

routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

module.exports = routes;