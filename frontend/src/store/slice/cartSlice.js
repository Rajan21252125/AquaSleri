import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const productIndex = state.cartItems.findIndex((x) => x._id === item._id);
      if (productIndex !== -1) {
        state.cartItems[productIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload._id;
      const itemIndex = state.cartItems.findIndex((item) => item._id === itemIdToRemove);
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

  },
});


export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;