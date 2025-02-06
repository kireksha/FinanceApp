import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

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
        state[index] = action.payload;
      }
    },
  },
});

export const { addAccount, updateAccount } = accountsSlice.actions;
export const accountsReducer = accountsSlice.reducer;
