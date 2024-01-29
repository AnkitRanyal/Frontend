import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder, deleteOrdersById } from './orderApi';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: [],
  totalOrders: 0,
  selectedAddress: null,
  orderstatus: false,
  payment: null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async ({ order }) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteOrdersByIdAsync = createAsyncThunk(
  'order/deleteOrdersById',
  async (val) => {
    const response = await deleteOrdersById(val);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
      localStorage.removeItem("order")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder.push(action.payload);
        const data = JSON.stringify(current(state.currentOrder))
        localStorage.setItem("order", data)
        state.selectedAddress = action.payload.selectedAddress

      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload;
        state.orderstatus = true
        state.payment = action.payload

      })
      .addCase(deleteOrdersByIdAsync.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(deleteOrdersByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders.splice(index, 1)
      })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectedAddress = (state) => state.order.selectedAddress;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatus = (state) => state.order.status;
export const selectpaymentStatus = (state) => state.order.payment;
export const selectorderStatus = (state) => state.order.orderstatus;

export default orderSlice.reducer;