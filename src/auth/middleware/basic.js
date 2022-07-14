'use strict';

const base64 = require('base-64');
const { CustomerModel } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  
  let basic = req.headers.authorization.split(' ').pop();
  console.log(basic);
  let [user, pass] = base64.decode(basic).split(':');
  console.log([user, pass])
  try {
    req.user = await CustomerModel.authenticateBasic(user, pass);
    console.log(req.user)
    next();
  } catch (e) {
    console.error(e);
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};