'use strict';

// this file brings all the models together to start the sequlize database 
//  this is where we do the relational foreign key business DONT FORGET

const { Sequelize, DataTypes } = require('sequelize');
const modelInterface = require('./modelInterface')
const flightSchema = require('./flight');
const customerSchema = require('./customers');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/rapcon';

const sequelize = new Sequelize (DATABASE_URL);

// Circle back to this below when deploying to database
// const sequelize = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// Customer Model
const CustomerModel = customerSchema(sequelize, DataTypes);

// Flight Model
const FlightModel = flightSchema(sequelize, DataTypes);

// Create Associations
CustomerModel.hasMany(FlightModel, {foreignKey:'customerID', sourceKey:'id'});
FlightModel.belongsTo(CustomerModel, {foreignKey: 'customerID', targetKey: 'id'});

module.exports = {
  sequelize,
  CustomerModel,
  FlightModel: new modelInterface(FlightModel),
};