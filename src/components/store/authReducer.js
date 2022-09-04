import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice( {
name: "authentictaion",
initialState: {
    isLoggedin:false,
    signup:true,
    idToken:"",
    ApiKey:"AIzaSyBe6G7AEDxn3R9AYIClfCDtJeEZfeSspIU",
    senderemail:"",
    reciveremail:""
} ,

reducers : {
    login(state, action) {
        state.isLoggedin = !state.isLoggedin;
        state.idToken = action.payload;
        localStorage.setItem("idtoken",state.idToken)
      },
      logout(state) {
        state.isLoggedin = !state.isLoggedin;
        state.idToken=""
        localStorage.removeItem("idtoken")
      },
    signup( state ){
        state.signup = false
    },
    savesenderemail(state, action){
       state.senderemail = action.payload
    },
    savereciveremail(state, action){
      state.reciveremail = action.payload
   },

}

})

export const authActions = authSlice.actions
export default authSlice.reducer;