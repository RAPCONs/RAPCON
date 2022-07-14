'use strict';

const SECRET = process.env.SECRET || 'rapcon';


const bearer = require('../src/auth/middleware/bearer');
const { sequelize } = require('../src/auth/models');
const { CustomerModel } = require('../src/auth/models');
const jwt = require('jsonwebtoken');

let userInfo = {
  admin: { username: 'admin', password: 'password', role: 'admin', phone: '111-111-1111' },
};

beforeAll(async () => {
  await sequelize.sync();
  await CustomerModel.create(userInfo.admin);
});
afterAll(async () => {
  await sequelize.close();
});

describe('Bearer Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('login for admin user fails', () => {

      req.headers = {
        authorization: 'Bearer thistokenisnotcorrect',
      };
      console.log(req.header);
      return bearer(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });
  });
});












