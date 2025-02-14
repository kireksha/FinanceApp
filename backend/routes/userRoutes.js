const express = require("express");
const { check, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    check("login", "Логин должен содержать минимум 5 символов").isLength({
      min: 5,
    }),
    check("password", "Пароль должен содержать минимум 6 символов").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("login", "Логин должен содержать минимум 5 символов").isLength({
      min: 5,
    }),
    check("password", "Введите пароль").not().isEmpty(),
  ],
  loginUser
);

module.exports = router;
