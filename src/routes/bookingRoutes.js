// src/routes/bookingRoutes.js
const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();


router.get("/:book_id/availability", bookingController.getBookAvailability);
router.post("/borrow", bookingController.borrowBook);

module.exports = router;
