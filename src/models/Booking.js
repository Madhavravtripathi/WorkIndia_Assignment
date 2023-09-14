// src/models/Booking.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Booking = sequelize.define('Booking', {
  issue_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Add more fields as needed
});

module.exports = Booking;
