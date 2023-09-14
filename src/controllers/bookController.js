const Book = require("../models/Book");
const Sequelize = require("sequelize"); // Import Sequelize

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    const book = await Book.create({ title, author, isbn });

    res.status(201).json({
      message: "Book added successfully",
      book_id: book.book_id, // Use the updated field name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const books = await Book.findAll({
      where: { title: { [Sequelize.Op.like]: `%${title}%` } },
    });

    res.status(200).json({ results: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
