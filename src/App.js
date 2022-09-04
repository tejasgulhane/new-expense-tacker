import logo from './logo.svg';
import './App.css';
import {Routes,Route} from  'react-router-dom'
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import ForgotPassword from './components/Authentication/ForgotPassword';
import Homepage from './components/Homepage'
import Mails from './components/mails/Mail';
import authReducer from './components/store/authReducer';
import { useSelector } from 'react-redux';

function App() {

 const idtoken = localStorage.getItem('idtoken')
 




  return (
   <>
      <h1>Mail-Box-Client</h1>
      <Routes>
        <Route exact path='*' element={<Signup />}/>
        <Route exact path='/signup' element={<Signup />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/forgotpassword' element={<ForgotPassword />}/>
        <Route exact path='/mails' element={idtoken ? <Mails /> : <Login />}/>
      </Routes>
   </>
  );
}

export default App;
