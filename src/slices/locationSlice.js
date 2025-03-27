import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState:{
        userLocation:null,
        status:'idle',
        error:null,
    },
    reducers:{
        setUserLocation:(state,action)=>{
            state.userLocation = action.payload;
            state.status = 'succeeded',
            state.error= null;
        },
        setLocationError:(state,action)=>{
            state.userLocation = null;
            state.status = 'failed',
            state.error= action.payload;
        },
        setLocationLoading:(state)=>{
            state.status = 'loading'
        }
    }
})

export default locationSlice.reducer
export const { setUserLocation, setLocationError, setLocationLoading } = locationSlice.actions;