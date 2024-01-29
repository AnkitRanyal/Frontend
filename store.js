
import { configureStore, createReducer } from '@reduxjs/toolkit';
import addressreducer from './slice'
import productReducer from './src/features/product/productSlice';
import authReducer from './src//features/auth/authSlice';
import cartReducer from './src//features/cart/cartSlice';
import orderReducer from './src//features/order/orderSlice';
import userReducer from './src//features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    address : addressreducer,
  },
});