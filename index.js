'use strict';

const { sequelize } = require('./src/auth/models');
const server = require('./src/index');

sequelize.sync()
  .then(() => {
    console.log('SuccessfullConnection');
  })
  .catch(error => console.error(error));

  server.start();