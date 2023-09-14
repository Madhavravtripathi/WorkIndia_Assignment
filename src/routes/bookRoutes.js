// src/routes/bookRoutes.js
const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();

router.post("/create", bookController.createBook);
router.get("/", bookController.searchBooksByTitle);

module.exports = router;
