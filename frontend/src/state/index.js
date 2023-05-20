import {createSlice} from "@reduxjs/toolkit"; // Wrapper to make using redux a little easier

// Will be accessible across entire application
const initialState = {
    // Initialize auth information
    user: null,
    token: null,
    posts: []
};

// Reducer functions for authorization
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            // Reset user, token on logout
            state.user = null;
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
          }
    }
});

export const {setLogin, setLogout, setPosts} = authSlice.actions;
export default authSlice.reducer;