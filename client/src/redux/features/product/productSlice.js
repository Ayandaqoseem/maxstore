import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import productService from "./productService";

const initialState = {
  product: null,
  products: [],
  minPrice: null,
  maxPrice: null,
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

//create new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
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

// get products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
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

// delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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

// get product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async(id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
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

// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async({id, formData}, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PRODUT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;
      const array = []
      products.map((product) => {
        const price = product.price
        return array.push(price)
      })
      const max = Math.max(...array)
      const min = Math.min(...array)

      state.maxPrice = max;
      state.minPrice = min
    }
  },
  extraReducers: (builder) => {
    builder
      // create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("From Payload =>", action.payload);
        if(action.payload && action.payload.hasOwnProperty("message")) {
          toast.error(action.payload.message);
        } else {
          state.message = "Product created successfully"
          toast.success("Product created successfully");
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        // console.log("From Payload =>", action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully.");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        // console.log(action.payload);
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if(action.payload && action.payload.hasOwnProperty("message")) {
          toast.error(action.payload.message)
        } else {
          state.message = "Product updated successfully";
          toast.success("Product updated successfully"); 
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { 
  RESET_PRODUT,
  GET_PRICE_RANGE,
 } = productSlice.actions;

export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading

export default productSlice.reducer;
