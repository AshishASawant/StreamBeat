import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {current:localStorage.getItem("currentApp") ||'movie',userName:''},
    reducers: {
        updateAppState: (state, action) => {
            state.current= action.payload.newState;
            localStorage.setItem("currentApp",action.payload.newState)
        },
        updateUserName: (state, action) => {
            state.userName= action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateAppState,updateUserName } = appSlice.actions;

export default appSlice.reducer;
