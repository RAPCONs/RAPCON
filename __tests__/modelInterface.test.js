'use strict';

const { sequelize } = require('../src/auth/models');
const { FlightModel } = require('../src/auth/models')
const { CustomerModel } = require('../src/auth/models')

let userInfo = {
  admin: { username: 'admin-basic', password: 'password', role: 'admin', phone: '111-111-1111' },
};

beforeAll(async () => {
  await sequelize.sync();
  await CustomerModel.create(userInfo.admin);

});
afterAll(async () => {
  await sequelize.close();
});

let flights = {
  airline: 'AA',
  flightNumber: 61,
  departureAirport: 'SEA', 
  departureTime: '1:19',
  departureGate: 'B6',
  aircraftSpeed: 222,
  arrivalAirport: 'LAX',
  arrivalTime: '5:50',
  arrivalGate: 'C19',
  baggageClaim: '1',
  flightStatus: 'en-route',
  customerID: 1,
}

describe('Postgres CRUD', () => {
  test('Creates a flight record to the flights table in postgres', async () => {
    let response = await FlightModel.create(flights);
    let oneRecord = FlightModel.readOne(1)
    console.log('response:', response);

    expect(oneRecord.flights).toBe(1);
  });
})
