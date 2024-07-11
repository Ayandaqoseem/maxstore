import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import toast from "react-hot-toast";

const initialState = {
  order: null,
  orders: [],
  totalOrderAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (FormData, thunkAPI) => {
    try {
      return await orderService.createOrder(FormData);
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

// get orders
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrders();
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

// get all orders
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllOrders();
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
)

// get single order
export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrder(id);
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

// update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async({ id, formData }, thunkAPI) => {
    try {
      return await orderService.updateOrderStatus(id, formData);
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
)

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        // console.log(action.payload);
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

        // get all orders
        .addCase(getAllOrders.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.orders = action.payload;
          // console.log(action.payload);
        })
        .addCase(getAllOrders.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          console.log(action.payload);
        })

      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
        // console.log(action.payload);
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      // updata order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        // console.log(action.payload);
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

  },
});

export const {} = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount;

export default orderSlice.reducer;
