'use strict';

const { sequelize } = require('../src/auth/models');
const { server } = require('../src/index');
const base64 = require('base-64');
const supertest = require('supertest');
const request = supertest(server);


const username = 'test user';
const password = 'password'

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Signin/Signup', () => {
  test('User creates an account', async () => {
    const response = await request.post('/signup').send({ username, password });
    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe(username);
    expect(response.body.user.password).not.toBe(password)
  });

  test('User can sign in', async () => {
    let authString = base64.encode(`${username}:${password}`);
    const response = await request.post('/signin').set('authorization', `Basic ${authString}`);
    expect(response.status).toBe(200);
    expect(response.body.user.token).toBeTruthy();
  });

  test('Get all users', async () => {
    console.log(req.headers);
  });
})
