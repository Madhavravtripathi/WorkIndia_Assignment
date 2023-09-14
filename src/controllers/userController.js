// src/controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    const token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: "24h",
    });

    res.status(201).json({
      status: "Account successfully created",
      status_code: 201,
      user_id: user.id,
      access_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({
          status: "Incorrect username/password provided. Please retry",
          status_code: 401,
        });
    }

    const token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: "Login successful",
      status_code: 200,
      user_id: user.id,
      access_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
