import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios-instance";

const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const response = await axiosInstance.delete(
        `/api/products/delete/${id}/`,
        config
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data.detail || err.message
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {},
  reducers: {},
  extraReducers: {
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
      state.loading = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const adminProductActions = {
  ...adminProductSlice.actions,
  deleteProduct,
};

export default adminProductSlice.reducer;
