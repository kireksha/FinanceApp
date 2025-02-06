const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/auth");

router.post("/transactions", authMiddleware, async (req, res) => {
  try {
    const { amount, category, date, description, type } = req.body;
    const transaction = new Transaction({
      amount,
      category,
      date,
      description,
      type,
      user: req.user._id,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при добавлении транзакции" });
  }
});

// Редактирование транзакции
router.put("/transactions/:id", authMiddleware, async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { amount, category, date, description, type } = req.body;

    // Ищем транзакцию по ID, только если она принадлежит текущему пользователю
    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Транзакция не найдена" });
    }

    // Обновляем транзакцию
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.date = date || transaction.date;
    transaction.description = description || transaction.description;
    transaction.type = type || transaction.type;

    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при редактировании транзакции" });
  }
});

// Удаление транзакции
router.delete("/transactions/:id", authMiddleware, async (req, res) => {
  try {
    const transactionId = req.params.id;

    // Ищем транзакцию по ID, только если она принадлежит текущему пользователю
    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Транзакция не найдена" });
    }

    res.status(200).json({ message: "Транзакция удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении транзакции" });
  }
});

module.exports = router;
