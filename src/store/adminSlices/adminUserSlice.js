import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios-instance";

const adminUserGet = createAsyncThunk(
  "adminUser/get",
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const response = await axiosInstance.get(`/api/users/`, config);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response.data.details || err.message
      );
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: { users: [] },
  reducers: {
    adminUserGetReset: (state, action) => {
      state = { users: [] };
    },
  },
  extraReducers: {
    [adminUserGet.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [adminUserGet.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    [adminUserGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const adminUserActions = { ...adminUserSlice.actions, adminUserGet };

export default adminUserSlice.reducer;
