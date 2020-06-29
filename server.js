const express = require("express");
const router = require("./routes");
const morgan  = require('morgan')

const server = express();

server.use(morgan('combined'))
server.use(router);

module.exports = server;