import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import slideServices from "./slideService";
import toast from "react-hot-toast";

const initialState = {
  slide: null,
  slides: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create slide
export const createSlide = createAsyncThunk(
  "slides/create",
  async (formData, thunkAPI) => {
    try {
      return await slideServices.createSlide(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSrting();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get slides
export const getSlides = createAsyncThunk(
  "slides/getSlide",
  async (_, thunkAPI) => {
    try {
      return await slideServices.getSlides();
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

const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create slide
      .addCase(createSlide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSlide.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
        toast.success("Slide Created Successfully");
      })
      .addCase(createSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get slides
      .addCase(getSlides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSlides.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = true;
        state.slides = action.payload;
        console.log(action.payload);
      })
      .addCase(getSlides.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = slideSlice.actions;
export default slideSlice.reducer;
