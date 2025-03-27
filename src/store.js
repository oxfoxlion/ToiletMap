import { configureStore } from "@reduxjs/toolkit";
import toiletsReducer from "./slices/toiletsSlice";
import locationReducer from './slices/locationSlice';

export const store = configureStore({
    reducer:{
        toilets: toiletsReducer,
        location: locationReducer,
    }
})