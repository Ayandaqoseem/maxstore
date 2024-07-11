import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-hot-toast";

const initialState = {
  coupon: null,
  coupons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//  create coupon
export const createCoupon = createAsyncThunk(
  "coupons/create",
  async (formData, thunkAPI) => {
    try {
      return await couponService.createCoupon(formData);
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

// get coupons
export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (_, thunkAPI) => {
    try {
      return await couponService.getCoupons();
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

// get coupon
export const getCoupon = createAsyncThunk(
  "coupons/getCoupon",
  async (couponName, thunkAPI) => {
    try {
      return await couponService.getCoupon(couponName);
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

// delete coupon
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
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

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    REMOVE_COUPON(state, action) {
      state.coupon = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // create coupon
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        toast.success("Coupon Created successfully");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get coupons
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        // console.log(action.payload);
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

         // get coupon
         .addCase(getCoupon.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCoupon.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.coupon = action.payload;
          toast.success("Coupon applied successfully.")
          // console.log(action.payload);
        })
        .addCase(getCoupon.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })

      // delete coupon
      .addCase(deleteCoupon.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      // state.coupon = action.payload;
      toast.success("Coupon deleted successfully.")
      console.log(action.payload);
    })
    .addCase(deleteCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })


  },
});

export const {
  REMOVE_COUPON
} = couponSlice.actions;
export default couponSlice.reducer;
