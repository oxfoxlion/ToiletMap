import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getToilets = createAsyncThunk('toilets/getToiltes',async()=>{
    const response = await axios.get('https://data.moenv.gov.tw/api/v2/fac_p_07?api_key=9e565f9a-84dd-4e79-9097-d403cae1ea75&limit=1000&sort=ImportDate%20desc&format=JSON')
    return response.data.records;
})

const toiletsSlice = createSlice({
    name:'toilets',
    initialState:{
        toilets:[],
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getToilets.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(getToilets.fulfilled,(state,action)=>{
            state.status = 'succeeded',
            state.toilets = action.payload
        })
        .addCase(getToilets.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default toiletsSlice.reducer