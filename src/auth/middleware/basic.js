'use strict';

const base64 = require('base-64');
const { Customers } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  
  let basic = req.headers.authorization.split(' ').pop();
  console.log(basic);
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await Customers.authenticateBasic(user, pass);
    next();
  } catch (e) {
    console.error(e);
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};