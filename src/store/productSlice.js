import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios-instance";

const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ keyword, pageNo }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/products/?search=${keyword}&page=${pageNo}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data.detail || err?.response?.data || err.message
      );
    }
  }
);

const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/products/${payload}/`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data.detail || err.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], error: null, loading: true, product: {} },
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.error = null;
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchSingleProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.product = {};
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.error = null;
      state.loading = false;
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.error = action.payload || "Something Went Wrong...";
      state.loading = false;
    },
  },
});

export const productActions = {
  ...productSlice.actions,
  fetchProducts,
  fetchSingleProduct,
};

export default productSlice.reducer;
