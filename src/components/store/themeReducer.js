import { createSlice } from "@reduxjs/toolkit";
const initialthemestate = {
    darktheme:false,
    premium:false
}

const themeslice = createSlice({
        name:'theme',
        initialState:initialthemestate,
        reducers:{
            updatetheme (state ,action){
            state.darktheme=action.payload
            },

            updatepremium(state,action){
                state.premium=action.payload
            }
        }
})

export const themeaction =themeslice.actions
export default themeslice.reducer