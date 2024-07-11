import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import toast from "react-hot-toast";

const initialState = {
  transactions: [],
  transaction: null,
  receiverName: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get user transactions
export const getUserTransactions = createAsyncThunk(
  "transactions/getUserTransactions",
  async (_, thunkAPI) => {
    try {
      return await transactionService.getUserTransactions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify Account
export const verifyAccount = createAsyncThunk(
  "transaction/verifyAccount",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.verifyAccount(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// transfer fund
export const transferFund = createAsyncThunk(
  "transaction/transferFund",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.transferFund(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    RESET_TRANSACTION_MESSAGE(state) {
      state.message = "";
    },
    REST_RECEIVER(state) {
      state.receiverName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // get user transaction
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload;
        console.log(action.payload);
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Verify Account
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.receiverName = action.payload.receiverName;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // transfer fund
      .addCase(transferFund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferFund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(transferFund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_TRANSACTION_MESSAGE, REST_RECEIVER } =
  transactionSlice.actions;

export const selectTransactions = (state) => state.transaction.transactions;
export const selectTransactionMessage = (state) => state.transaction.message;
export const selectReceiverName = (state) => state.transaction.receiverName;

export default transactionSlice.reducer;
