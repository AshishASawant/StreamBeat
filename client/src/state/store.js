import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import appSlice from "./appSlice";
import loginSlice from "./loginSlice";
import loadingSlice from './loadingSlice'

export const store = configureStore({
    reducer: {
        home: homeSlice,
        app:appSlice,
        login:loginSlice,
        loading:loadingSlice
    },
});
