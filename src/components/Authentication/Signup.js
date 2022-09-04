import React from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { authActions } from '../store/authReducer'
import { useRef , useState } from 'react'
import Login from './Login';
import {NavLink} from 'react-router-dom'
import { useNavigate  } from "react-router-dom";


const Signup = () => {


    let navigate = useNavigate();
    const emailref=useRef()
    const passwordref=useRef()

    const [IsLoading , setIsLoading] = useState(true)
    const [Login , setLogin] =useState(false)
    const dispatch =useDispatch()
    
    // const login =useSelector( state => state.auth.isLoggedin)
    // const apikey=useSelector( state => state.auth.ApiKey)
    // const signup=useSelector( state => state.auth.signup)

    const onsubmithandler = async (e) => {
        e.preventDefault();

        const email = e.target.elements["logInEmail"].value;
        const password = e.target.elements["password"].value;

        const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
        AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4`, {
                method: 'POST',
                body: JSON.stringify({
                  email: email,
                  password: password,
                  returnSecureToken: true,
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res=>{
                setIsLoading(false);
                if (res.ok) {
                  alert("SignUp sucessfully")
                } else {
                  return res.json().then(data => {
                    const generalError = 'Authentication failed';
                    const errmsg = data.error.message;
                    console.log(data);
                    if (errmsg) alert(data.error.message)
                    else alert(generalError);
                  })
                }
              })
      
    }

    const loginclickhandler =() => {
        navigate("/login");
    }


  return (
    <>
        <form onSubmit={onsubmithandler}> 
        <h1>Signup-Page</h1>
        <label htmlFor="email">Email</label>
        <br />
        <input id="logInEmail" type="email" ref={emailref}></input>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" type="password"ref={passwordref}></input>
        <br />
        <label htmlFor="password">Confirm-Password</label>
        <br />
        <input id="confirmpassword" type="password"></input>
        <br />
        <button  type="submit">
          SignUp
        </button>
        <br />
      </form>

      <div>
        <h3>Alreday Has Account ? Click here to Login !!!</h3>
        <div>
           <button onClick={loginclickhandler}>Login</button>
        </div>
      </div>

      { Login && <NavLink to={'/login'} /> }
    </>
  )
}

export default Signup