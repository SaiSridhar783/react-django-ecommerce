import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import checkoutReducer from "./checkoutSlice";
import userDetailReducer from "./userSlices/userDetailSlice";
import userReducer from "./userSlices/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    userDetail: userDetailReducer,
    checkout: checkoutReducer,
  },
});

export default store;
