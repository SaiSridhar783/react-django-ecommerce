import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios-instance";

const userLogin = createAsyncThunk("user/login", async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/api/users/login/", {
      username: payload.email,
      password: payload.password,
    });
    thunkAPI.fulfillWithValue(response.data);
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

const initialUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: initialUserInfo },
  reducers: {
    userLogout: (state, action) => {
      return {};
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
