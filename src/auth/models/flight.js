'use strict';

// flight database scheme what we want from the api to be stored in the database

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('flights', {
    airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flightNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureAirport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureGate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aircraftSpeed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aircraftVerticalSpeed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    arrivalAirport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalGate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    baggageClaim: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flightStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};