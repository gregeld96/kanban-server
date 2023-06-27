const routes = require('express').Router();
const RoutesApi = require('./apis');

routes.use('/api', RoutesApi);

module.exports = routes;