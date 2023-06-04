import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "app",
    initialState: {progress:0},
    reducers: {
        setProgress: (state, action) => {
            state.progress= action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProgress } = loadingSlice.actions;

export default loadingSlice.reducer;
