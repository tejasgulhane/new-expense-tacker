import HomePage from './components/pages/Homepage';
// import AuthContext from './components/store/auth-context'
// import { useContext } from 'react'
import React ,{ useState  } from 'react'
import './style.css';
import Welcome from './components/pages/Welcome';
import {Routes ,Route , Navigate} from 'react-router-dom'
import ForgotPassword from './components/pages/ForgotPassword';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { themeaction } from './components/store/themeReducer';


function App() {
  const [loginsucess ,setloginsucess ] = useState(false)
  const istheme =useSelector( state => state.premium.premium)

  const isAuth = useSelector(state=>state.auth.isAuthenticated);
  return (
    <div className={istheme ? "AppDark" : "App"}>
      <h1>Expense Tracker App</h1>
   
      <Routes>
        <Route exact path='/welcome' element={<Welcome/>}/>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        {/* <Route path='/editprofile' element={<Editprofile/>}/> */}
      </Routes>

    </div>
  );
}

export default App;
