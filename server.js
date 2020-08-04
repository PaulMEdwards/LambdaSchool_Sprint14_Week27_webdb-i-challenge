const express = require('express');

const server = express();
server.use(express.json());

const logger = require('./middleware/logger');
server.use(logger);

const accountsRouter = require('./data/helpers/accountsRouter.js');
server.use('/api/accounts', accountsRouter);

module.exports = server;
