import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import appSlice from "./appSlice";
import loginSlice from "./loginSlice";
import loadingSlice from './loadingSlice'
import navigationSlice from "./navigationSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        app:appSlice,
        login:loginSlice,
        loading:loadingSlice,
        navigation:navigationSlice
    },
});
