const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const generateToken = (userId, login, res) => {
  const token = jwt.sign({ userId, login }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    path: "/",
    maxAge: 3600000,
  });
  return token;
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { login, password } = req.body;

  try {
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким login уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ login, password: hashedPassword });
    await newUser.save();

    generateToken(newUser._id, newUser.login, res);

    res.status(201).json({ message: "Регистрация успешна!" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    generateToken(user._id, login, res);

    res.status(200).json({ message: "Вход успешен!" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
