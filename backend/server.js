const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/api/", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Добро пожаловать на вашу панель управления!",
    user: req.user,
  });
});

app.post("/api/users/logout", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Вы вышли из системы" });
});

app.options("*", cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
