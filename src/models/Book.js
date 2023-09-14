const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Add more fields as needed
});

module.exports = Book;
