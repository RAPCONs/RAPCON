'use strict';

// this file will handle all of our routes on express server(think about turning this stuff AWS LANDISH BLAH BLAH )

const express = require('express');
// cors?

const internalError = require('./auth/error-handlers/500')
const notFoundHandler = require('./auth/error-handlers/404')
const authRoutes = require('./auth/router/index')

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(internalError);

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('listening on port', PORT)),
};


