const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const generateAccount = require('../utils/generateAccount');

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    defaultValue: generateAccount,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = User;
