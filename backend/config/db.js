const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB подключен");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error.message);
    process.exit(1); // Останавливаем приложение, если не удается подключиться
  }
};

module.exports = connectDB;
