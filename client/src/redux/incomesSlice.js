import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAuthToken = () => {
  return Cookies.get("jwt") || null; // Возвращаем jwt cookie или null, если оно отсутствует
};

export const fetchIncomes = createAsyncThunk(
  "incomes/fetchIncomes",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/transactions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить доходы");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронная функция для добавления дохода
export const addIncomeAsync = createAsyncThunk(
  "incomes/addIncomeAsync",
  async (incomeData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      });

      if (!response.ok) {
        throw new Error("Не удалось добавить доход");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const incomesSlice = createSlice({
  name: "incomes",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setIncomes: (state, action) => {
      state.list = action.payload;
    },
    addIncome: (state, action) => {
      state.list.push(action.payload);
    },
    removeIncome: (state, action) => {
      state.list = state.list.filter((income) => income.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addIncomeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncomeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addIncomeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIncomes, addIncome, removeIncome } = incomesSlice.actions;

export const incomesReducer = incomesSlice.reducer;
