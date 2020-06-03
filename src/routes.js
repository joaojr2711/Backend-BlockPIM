const express = require('express');

const UsersController = require('./Controllers/UsersController');
//rota de login - OK
const SessionController = require('./Controllers/SessionController');

//rota de transações - OK
const TransactionController = require('./Controllers/TransactionController');

//rota de carteiras - OK
const WalletController = require('./Controllers/WalletController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

routes.get('/transaction', TransactionController.index);
routes.post('/transaction', TransactionController.create);

routes.get('/wallet', WalletController.index);
routes.post('/wallet', WalletController.create);


module.exports = routes;