import { createSelector } from "@reduxjs/toolkit";

export const selectExpenses = (state) => state.expenses.list;
export const selectIncomes = (state) => state.incomes.list;
export const selectAccounts = (state) => state.accounts;

export const selectFinancials = createSelector(
  [selectExpenses, selectIncomes, selectAccounts],
  (expenses, incomes, accounts) => {
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );
    const totalIncomes = incomes.reduce(
      (acc, income) => acc + Number(income.amount),
      0
    );
    const totalAccounts = accounts.reduce(
      (acc, account) => acc + Number(account.amount),
      0
    );
    const balance =
      totalAccounts - totalIncomes >= 0
        ? totalAccounts - totalExpenses
        : totalIncomes - totalExpenses;
    return {
      balance,
      totalExpenses,
      totalIncomes,
      totalAccounts,
    };
  }
);
