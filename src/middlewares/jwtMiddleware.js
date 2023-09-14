// jwtMiddleware.js
const jwt = require("jsonwebtoken");
const { secretKey } = require("./config"); // Import the secret key from your config file

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Store user information in the request object
    next();
  });
};

module.exports = verifyToken;
