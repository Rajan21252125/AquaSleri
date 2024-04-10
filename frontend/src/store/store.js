import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';
import product from './slice/productSlice';

const store = configureStore({
    reducer: {
        userDetail : user,
        product : product
    }
});

export default store;