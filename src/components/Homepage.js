import React from 'react'
import Signup from './Authentication/Signup'
import Login from './Authentication/Login'
import ForgotPassword from './Authentication/ForgotPassword'
import { useSelector } from 'react-redux'

const Homepage = () => {

    const signup = useSelector( state => state.auth.signup);

  return (
    <>
    
       {/* {   signup &&   <Signup /> }
       {  !signup &&  <Login /> } */}
        

    </>
  )
}

export default Homepage