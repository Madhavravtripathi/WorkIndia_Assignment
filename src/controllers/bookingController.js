// src/controllers/bookingController.js
const Booking = require("../models/Booking");
const Book = require("../models/Book");
const Sequelize = require("sequelize"); // Import Sequelize

exports.getBookAvailability = async (req, res) => {
  try {
    const { book_id } = req.params; // Use req.params to get the book_id from the URL

    const book = await Book.findByPk(book_id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the book is available
    const existingBooking = await Booking.findOne({
      where: {
        book_id,
        return_time: { [Sequelize.Op.gt]: new Date() }, // Check if return_time is greater than the current time
      },
    });

    if (existingBooking) {
      return res.status(200).json({
        book_id: book.id,
        title: book.title,
        author: book.author,
        available: false,
        next_available_at: existingBooking.return_time,
      });
    }

    res.status(200).json({
      book_id: book.id,
      title: book.title,
      author: book.author,
      available: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { book_id, user_id, issue_time, return_time } = req.body;
    const book = await Book.findByPk(book_id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the book is available
    const existingBooking = await Booking.findOne({
      where: {
        book_id,
        [Sequelize.Op.or]: [
          { issue_time: { [Sequelize.Op.between]: [issue_time, return_time] } },
          {
            return_time: { [Sequelize.Op.between]: [issue_time, return_time] },
          },
        ],
      },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({
          status: "Book is not available at this moment",
          status_code: 400,
        });
    }

    const booking = await Booking.create({
      book_id,
      user_id,
      issue_time,
      return_time,
    });

    res.status(200).json({
      status: "Book booked successfully",
      status_code: 200,
      booking_id: booking.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
