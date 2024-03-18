import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        googleUser: false
    },
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload;
        },
        removeUser : (state) => {
            state.user = null;
        },
        typeofUser : (state, action) => {
            state.googleUser = action.payload;
        }
    },
});



export const { setUser , removeUser , typeofUser } = userSlice.actions;
export default userSlice.reducer;