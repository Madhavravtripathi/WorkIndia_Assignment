// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({
        status: "Authentication failed. No token provided",
        status_code: 401,
      });
  }

  jwt.verify(token.replace("Bearer ", ""), config.secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({
          status: "Authentication failed. Invalid token",
          status_code: 401,
        });
    }

    req.user = decoded;
    next();
  });
};

exports.authenticateAdmin = (req, res, next) => {
  // Implement your admin authentication logic here
  const apiKey = req.header("API-Key");

  if (!apiKey || apiKey !== config.adminApiKey) {
    return res
      .status(403)
      .json({ status: "Access denied. Invalid API key", status_code: 403 });
  }

  next();
};
