'use strict';

// OUR ROUTES WITH RBAC CAPABILITIES 

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic');
// acl?
const bearerAuth = require('../middleware/bearer');

const {
  handleSignin,
  handleSignup,
  handleGetUsers,
} = require('./handler');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);

module.exports = authRouter;