import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
    name: "navigation",
    initialState: {current:1},
    reducers: {
        setNav: (state, action) => {
            state.current= action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setNav } = navigationSlice.actions;

export default navigationSlice.reducer;
