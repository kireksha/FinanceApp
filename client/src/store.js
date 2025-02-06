import { configureStore } from "@reduxjs/toolkit";
import {
  expensesReducer,
  userReducer,
  incomesReducer,
  accountsReducer,
} from "./redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
    incomes: incomesReducer,
    accounts: accountsReducer,
  },
});
