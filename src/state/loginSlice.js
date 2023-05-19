import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    current: localStorage.getItem("authToken") || false,
  },
  reducers: {
    updateLoginState: (state, action) => {
      state.current = action.payload;
      if(action.payload){
        localStorage.setItem("authToken", action.payload);
      }
      else{
        localStorage.removeItem('authToken')
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLoginState } = loginSlice.actions;

export default loginSlice.reducer;
