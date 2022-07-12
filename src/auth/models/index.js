'use strict';

// this file brings all the models together to start the sequlize database 
//  this is where we do the relational foreign key business DONT FORGET

const { Sequelize, DataTypes } = require('sequelize');
const flightSchema = require('./flight');
const customerSchema = require('./user');
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

// Flight Info
const Flights = flightSchema(sequelize, DataTypes);

// User Info
const Customers = customerSchema(sequelize, DataTypes);

// Create Associations
Customers.hasMany(Flights, {foreignKey:'uuid', sourceKey:'uuid'});
Flights.belongsTo(Customers, {foreignKey: 'uuid', targetKey: 'uuid'});

module.exports = {
  sequelize,
  Flights,
  Customers,
};