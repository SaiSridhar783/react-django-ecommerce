import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import checkoutReducer from "./checkoutSlice";
import userDetailReducer from "./userSlices/userDetailSlice";
import userReducer from "./userSlices/userSlice";
import orderReducer from "./orderSlices/orderSlice";
import eachOrderReducer, {
  orderPayReducer,
} from "./orderSlices/eachOrderSlice";
import getAllOrdersSlice from "./orderSlices/getAllOrdersSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    userDetail: userDetailReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    eachOrder: eachOrderReducer,
    orderPay: orderPayReducer,
    allOrders: getAllOrdersSlice,
  },
});

export default store;
