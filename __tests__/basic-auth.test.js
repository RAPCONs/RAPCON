'use strict';

const { sequelize } = require('../src/auth/models');
const base64 = require('base-64');
const middleware = require('../src/auth/middleware/basic')
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


const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {
      const basicAuthString = base64.encode('username:password');

      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      await middleware(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);

    });

    it('logs in an admin user with the correct credentials', () => {
      let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return middleware(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      })
    });
  });
