import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {current:localStorage.getItem("currentApp") ||'movie'},
    reducers: {
        updateAppState: (state, action) => {
            state.current= action.payload.newState;
            localStorage.setItem("currentApp",action.payload.newState)
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateAppState } = appSlice.actions;

export default appSlice.reducer;
