import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ExpenseForm from "../expensse/ExpenseForm";
import { authActions } from "../store/auth-reducer";
import { themeaction } from "../store/themeReducer";
import { useNavigate  } from "react-router-dom";

const WelcomePage = (props) => {

  const dispatch = useDispatch();
  const userIdToken = useSelector(state=>state.auth.idToken);
  const isEmailVerified = useSelector(state=>state.auth.isEmailVerified);
 const APIkey =useSelector(state => state.auth.APIkey)
  const ispremiumclicked= useSelector( state => state.premium.premium )
  const expenses = useSelector(state=>state.expense.expenses);
  const totalExpense =  expenses && Object.keys(expenses).reduce((p , key)=> {return p + Number(expenses[key].cost)},0);
  const userEmail = useSelector((state)=>state.auth.email);
  const cleanUserEmail = userEmail.replace(/[^a-zA-Z0-9 ]/g, '');
  const [istheme ,setistheme] = useState(false)

  let navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: userIdToken,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(authActions.setEmail(data ? data.users[0].email : ""));
        dispatch(authActions.setIsEmailVerified(data ? data.users[0].emailVerified : false));
      });
  },[APIkey, userIdToken, dispatch]);

  const [editprofile, setEditProfile] = useState(false);
  const editProfileClickHandler = () => {
    setEditProfile(true);
  };

  const emailVerifyClickHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${APIkey}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: userIdToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(`verification email is sent to ${data.email}`);
      })
      .catch((err) => console.log(err));
  };

  const logoutClickHandler = () => {
    dispatch(authActions.logout())
    navigate("/");
  };

  const togglethemehandler =() =>{
    // dispatch(themeaction.updatetheme(true))
    dispatch(themeaction.updatepremium(true))
  }

  const downlodExpClickHandler = () => {

    let csv = "id,cost,catagory,description\n";
    Object.keys(expenses).forEach((item) => {
      csv += `${item},${expenses[item].cost},${expenses[item].catagory},${expenses[item].description}\n`;
    });

    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${cleanUserEmail}-Expenses.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Fragment>
      <Fragment>
        <h1>Welcome</h1>
        { totalExpense>10000 && <button onClick={togglethemehandler}>Activate Premium</button> }

        <button onClick={logoutClickHandler}>Log Out</button>
        {!editprofile && (
          <button
            onClick={editProfileClickHandler}
          >{`Your profile is incomplete \nClick hear to edit`}</button>
        )}
        {editprofile && <Navigate to={"/editprofile"} />}
        <br />
        {!isEmailVerified ? (
          <button onClick={emailVerifyClickHandler}>
            Verify your Email ID
          </button>
        ) : (
          <p>Email Verified</p>
        )}

        <button onClick={downlodExpClickHandler}>Download Expense As CSV</button>
      </Fragment>
      <div>
        <ExpenseForm />
      </div>
    </Fragment>
  );
};
export default WelcomePage;