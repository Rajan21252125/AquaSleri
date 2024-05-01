import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';
import product from './slice/productSlice';
import cart from './slice/cartSlice';

const store = configureStore({
    reducer: {
        userDetail : user,
        product : product,
        cart : cart
    }
});

export default store;