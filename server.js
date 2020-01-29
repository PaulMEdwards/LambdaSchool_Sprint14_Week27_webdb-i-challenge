const express = require('express');

const server = express();
server.use(express.json());

const logger = require('./middleware/logger');
server.use(logger);

module.exports = server;