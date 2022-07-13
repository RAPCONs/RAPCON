'use strict';

//  offloading the SIGN-IN SIGN-UP BUSINESS TO HANDLER TO MODULARIZE THE CODE 

const { CustomerModel } = require('../models/index');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await CustomerModel.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await CustomerModel.findAll({});
    res.status(200).json(userRecords);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
}