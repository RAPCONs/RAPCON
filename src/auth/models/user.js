'use strict';

// DEFINING RBAC capabilities as well as adding tokens to the user to verify them
// also generally defining user model

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'rapcon';

// ***VERIFY BELOW WITH TEAM

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('customers', {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      required: true,
      defaultValue: 'user',
    },
    phone: {
      type: DataTypes.STRING,
      required: true,
    },
    uuid: {
      type: DataTypes.STRING,
      required: true,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, { expiresIn: '9000000' });
      },
      set(payload) {
        return jwt.sign(payload, process.env.SECRET);
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashPass = await bcrypt.hash(user.password, 10);
    user.password = hashPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticatetoken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };
  
  return model;
};

module.exports = userModel;