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

const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  status: "idle",
  errorMessageOnSignin: [],
  errorMessageOnSignup: [],
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
      state.errorMessageOnSignin = action.payload;
      state.status = "idle";
    });
    builder.addCase(signin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoggedIn = true;
      state.status = "idle";
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.errorMessageOnSignup = action.payload;
      state.status = "idle";
    });
    builder.addCase(signup.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { isLoggedIn, userLogout } = authSlice.actions;
export default authSlice.reducer;
