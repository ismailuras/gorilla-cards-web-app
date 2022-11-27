import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.put("/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, repassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/signup", {
        email,
        password,
        repassword,
      });
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const sendResetPasswordMail = createAsyncThunk(
  "auth/sendResetPasswordMail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const result = await axios.put("/auth/forgot", {
        email,
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  status: "idle",
  errorMessagesOnSignin: [],
  errorMessagesOnSignup: [],
  errorMessagesOnResetPassword: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isLoggedIn = localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state) => {
      state.isLoggedIn = true;
      state.status = "idle";
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.errorMessagesOnSignin = action.payload;
      state.status = "idle";
    });
    builder.addCase(signin.pending, (state) => {
      state.status = "loading";
      state.errorMessagesOnSignin = [];
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoggedIn = true;
      state.status = "idle";
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.errorMessagesOnSignup = action.payload;
      state.status = "idle";
    });
    builder.addCase(signup.pending, (state) => {
      state.status = "loading";
      state.errorMessagesOnSignup = [];
    });
    builder.addCase(sendResetPasswordMail.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(sendResetPasswordMail.rejected, (state, action) => {
      state.errorMessagesOnResetPassword = [action.payload];
      state.status = "idle";
    });
    builder.addCase(sendResetPasswordMail.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { userLogout } = authSlice.actions;
export default authSlice.reducer;
