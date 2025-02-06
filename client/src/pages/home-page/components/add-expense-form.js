import { useDispatch } from "react-redux";
import { useState } from "react";
import { addExpense } from "../../../redux/expensesSlice";

export const AddExpenseForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      name,
      amount: Number(amount),
    };
    dispatch(addExpense(newExpense));
    setName("");
    setAmount("");
  };

  return (
    <form onSubmit={handleAddExpense}>
      <input
        type="text"
        placeholder="Название расхода"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Добавить расход</button>
    </form>
  );
};
