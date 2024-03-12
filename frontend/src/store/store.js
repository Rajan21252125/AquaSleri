import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';

const store = configureStore({
    reducer: {
        userDetail : user
    }
});

export default store;