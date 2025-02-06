const express = require("express");
const { check, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль должен содержать минимум 6 символов").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Введите корректный email").isEmail(),
    check("password", "Введите пароль").not().isEmpty(),
  ],
  loginUser
);

module.exports = router;
