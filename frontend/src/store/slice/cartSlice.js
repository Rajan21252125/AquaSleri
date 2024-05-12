import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0
  },
  reducers: {
    addToCart: (state, action) => {
      // Destructure payload to extract cartItems and totalPrice
      const { cartItems, totalPrice } = action.payload;
      // Update state with the new values
      state.cartItems = cartItems;
      state.totalPrice = totalPrice;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
