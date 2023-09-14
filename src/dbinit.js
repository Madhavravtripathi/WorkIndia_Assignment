// src/dbinit.js
const { Sequelize } = require("sequelize");
const config = require("../config");
const sequelize = require("./db");
const User = require("./models/User");
const Booking = require("./models/Booking");
const Book = require("./models/Book");

async function initializeDatabase() {
  try {
    // Try connecting to the specified database
    await sequelize.authenticate();
    console.log("Connected to the database");

    // Use the specified database
    sequelize.options.database = config.database;

    // Define and sync all models (create tables)
    await User.sync({ force: true });
    await Booking.sync({ force: true });
    await Book.sync({ force: true });

    console.log("All tables created successfully");
  } catch (error) {
    if (error.name === "SequelizeConnectionError") {
      // The database doesn't exist, create it
      try {
        await sequelize.queryInterface.createDatabase(config.database);
        console.log(`Database "${config.database}" created`);
        // Use the specified database
        sequelize.options.database = config.database;
      } catch (createError) {
        console.error("Error creating the database:", createError);
      }
    } else {
      console.error("Error initializing the database:", error);
    }
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log("Database connection closed");
  }
}

// Run the initialization function
initializeDatabase();
