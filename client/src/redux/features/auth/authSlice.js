import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// resgister user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      return response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      return await authService.logoutUser() 
    } catch (error) {
      const message = 
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message);
    }
  }
);

// get login status
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginstatus();
    } catch (error) {
      const message = 
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
)

// get user
export const getUser = createAsyncThunk(
  "auth/getUser",
  async(_, thunkAPI) => {
    try {
      return await authService.getUser();
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message)

    }
  }
);
// update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message)
    }
  }
)

// update photo
export const updatePhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (userData, thunkAPI) => {
    try {
      return await authService.updatePhoto(userData);
    } catch (error) {
      const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message)
    }
  }
)

// admin check
export const authAdminCheck = createAsyncThunk(
  "auth/authAdminCheck",
  async(_, thunkAPI) => {
    try {
      return await authService.authAdminCheck();
    } catch (error) {
      const message = 
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
)

// auth check
export const authUserCheck = createAsyncThunk(
  "auth/authUserCheck",
  async(_, thunkAPI) => {
    try {
      return await authService.authUserCheck()
    } catch (error) {
      const message =
      (error.response &&
        error.response.data && 
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    // register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration successful");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      // login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("login successful");
        console.log("show me userDetails =>", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // get login status
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        // console.log(action.payload);
        if(action.payload.message === "invalid signature") {
          state.isLoggedIn = false;
        }
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      // get user 
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false 
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
        // update user 
        .addCase(updateUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = true;
          state.user = action.payload;
          toast.success("User Updated")
          console.log(action.payload);
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.isLoading = false 
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
          // update photo 
      .addCase(updatePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Photo Updated")
        // console.log(action.payload);
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.isLoading = false 
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
       // admin check
       .addCase(authAdminCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAdminCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // console.log(action.payload);
      })
      .addCase(authAdminCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      // auth check
      .addCase(authUserCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUserCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        console.log(action.payload);
      })
      .addCase(authUserCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

  },
});
const persistConfig = {
  key: "auth", 
  storage,
  whitelist: ["isLoggedIn", "user"]
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const {RESET_AUTH} = authSlice.actions;
export const selectIsloggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export default persistedAuthReducer;
