require("dotenv").config();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Credentials are needed" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Logged in",
      userId: user._id,  
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: "Erro no servidor",
      details: err.message,
    });
  }
};

module.exports = Login;