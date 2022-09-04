import React from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { authActions } from '../store/authReducer'
import { useRef , useState } from 'react'
import {Navigate, NavigationType, NavLink} from 'react-router-dom'
import Mail from '../mails/Mail'
import ForgotPassword from './ForgotPassword'
import { useNavigate  } from "react-router-dom";


const Login = () => {
    const emailref=useRef()
    const passwordref=useRef()

    let navigate = useNavigate();

    const [IsLoading , setIsLoading] = useState(true)
    const [loginsucess , setloginsucess] = useState(false)
    const [forgotpassword , setforgotpassword] = useState(false)

    const dispatch =useDispatch()
    const login =useSelector( state => state.auth.isLoggedin)
    const apikey=useSelector( state => state.auth.ApiKey)

    const onsubmithandler = async (e) => {
        e.preventDefault();

        const email = e.target.elements["logInEmail"].value;
        const password = e.target.elements["password"].value;

        const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
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
                  res.json().then((data)=> {
                  alert("LogIn sucessfully")
                  navigate("/mails");
                  setloginsucess(true)
                  dispatch(authActions.login(data.idToken))
                  dispatch(authActions.savesenderemail(email))
                  console.log(data)
                  })
                } else {
                  return res.json().then(data => {
                    const generalError = 'Login failed';
                    const errmsg = data.error.message;
                    console.log(data);
                    if (errmsg) alert(data.error.message)
                    else alert(generalError);
                  })
                }
              })
              
            }
            
            const forgotpasswordhandler = () =>{
              setforgotpassword(true)
            }
            
            
    return (
      <>
       { !loginsucess &&  <> 
       <form onSubmit={onsubmithandler}> 
        <h1>LogIn-Page</h1>
        <label htmlFor="email">Email</label>
        <br />
        <input id="logInEmail" type="email" ref={emailref}></input>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" type="password"ref={passwordref}></input>
        <br />
        
        <button  type="submit">
           LogIn
        </button>
        <br />
      </form>

      <div>
        <h3>Forgot your password ? Click here to Reset !!!</h3>
        <div>
           <button onClick={forgotpasswordhandler}>Forgot Password</button>
        </div>
      </div>

      { forgotpassword && <NavLink to={'/forgotpassword'}>ForgotPassword</NavLink>}
      </>
       }
    </>
  )
}

export default Login