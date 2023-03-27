import { createSlice } from "@reduxjs/toolkit";
import { data } from "../App";

const initialState = [
  {
    name: "deGods",
    price: 200,
    qt: 0,
    totalAmount: 0,
  },
  {
    name: "mindfolk",
    price: 50,
    qt: 0,
    totalAmount: 0,
  },
];

const cartReducer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    increaseAmount: (state, action) => {
      const indexArray = action.payload;

      state[indexArray].qt = state[indexArray].qt + 1;
      const total = state[indexArray].price * state[indexArray].qt;
      state[indexArray].totalAmount = total;
    },
    decrese: (state, action) => {
      const indexArray = action.payload;
      if (state[indexArray].qt === 0) {
        state[indexArray].qt = 0;
      } else {
        state[indexArray].qt = state[indexArray].qt - 1;
        const total = state[indexArray].price * state[indexArray].qt;
        state[indexArray].totalAmount = total;
      }
    },
  },
});

export const cartActions = cartReducer.actions;

export default cartReducer;
