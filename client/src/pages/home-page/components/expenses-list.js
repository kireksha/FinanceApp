import { useSelector } from "react-redux";

export const ExpensesList = () => {
  const expenses = useSelector((state) => state.expenses);

  return (
    <div>
      <h3>Список расходов</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name}: {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
