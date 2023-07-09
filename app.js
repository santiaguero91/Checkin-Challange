const express = require("express");
const routes = require('./src/routes/index');

const server = express();

server.use('/', routes);

module.exports = server;