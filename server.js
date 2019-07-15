const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");

const cars = require('./data/routers/cars');

const server = express();

server.use(helmet()); // 3rd party security for headers. Hides x powered by Express
server.use(express.json()); //read/write json
server.use(morgan("dev")); //3rd party logger

//Allow cross origin access
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use('/api/cars', cars);

server.get('/', (req, res) => {
  res.send('hello world')
});

module.exports = server;