import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "others",
    selectedCategory: "Прочие счета",
    amount: 0,
    isInitialCapital: false,
  },
];

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.push(action.payload);
    },
    updateAccount: (state, action) => {
      const index = state.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.updatedData };
      }
    },
    removeAccount: (state, action) => {
      return state.filter((account) => account.id !== action.payload);
    },
    transferFunds: (state, action) => {
      const { fromAccountId, toAccountId, amount } = action.payload;
      const fromAccount = state.find((acc) => acc.id === fromAccountId);
      const toAccount = state.find((acc) => acc.id === toAccountId);
      if (fromAccount && toAccount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
      }
    },
  },
});

export const { addAccount, updateAccount, removeAccount, transferFunds } =
  accountsSlice.actions;
export const accountsReducer = accountsSlice.reducer;
