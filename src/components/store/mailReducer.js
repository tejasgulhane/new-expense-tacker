import { createSlice } from "@reduxjs/toolkit";


const mailSlice = createSlice( { 
    name:"mails",
    initialState:{
    sentmails:{},
    mailId:"",
    },
    reducers : {
        saveEmailid( state ,action) {
            state.mailId = action.payload;
        },
        saveSentMails( state ,action) {
            state.sentmails = action.payload
           
        }
    }
})

export const mailSliceActions =mailSlice.actions;
export default mailSlice.reducer;