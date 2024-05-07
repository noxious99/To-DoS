const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken();

    res.status(200).json({ message: "login successful", email, token });
  } catch (Error) {
    res.status(400).json({ Error: Error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (Error) {
    res.status(400).json({ Error: Error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
