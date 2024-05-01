import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const product = state.cartItems.find((x) => x._id === item._id);
            if (product) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === product._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload._id);
        },
    },
});


export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;