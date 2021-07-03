import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import userDetailReducer from "./userSlices/userDetailSlice";
import userReducer from "./userSlices/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    userDetail: userDetailReducer,
  },
});

export default store;
