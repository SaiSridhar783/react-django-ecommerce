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

const adminUserDelete = createAsyncThunk(
  "adminUser/delete",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const response = await axiosInstance.delete(
        `/api/users/delete/${id}`,
        config
      );
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
  initialState: { users: [], success: false },
  reducers: {
    adminUserGetReset: (state, action) => {
      state = { users: [] };
    },
  },
  extraReducers: {
    [adminUserGet.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [adminUserGet.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = false;
    },
    [adminUserGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    [adminUserDelete.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [adminUserDelete.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    [adminUserDelete.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const adminUserActions = {
  ...adminUserSlice.actions,
  adminUserGet,
  adminUserDelete,
};

export default adminUserSlice.reducer;
