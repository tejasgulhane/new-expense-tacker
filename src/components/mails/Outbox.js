import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { mailSliceActions } from '../store/mailReducer';
import OutboxMessage from './OutboxMessage';

const Outbox = () => {
    const allMails = useSelector(state =>state.mail.sentmails)
    const dispatch=useDispatch()
    
    const reciver = useSelector(state =>state.auth.senderemail)
    const cleanEmail = reciver.replace(/[^a-zA-Z ]/g, "");

    useEffect(() => {
        fetch(
          `https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${cleanEmail}sentmails.json`,
          {
            method: "GET",
            headers: {
              "Content-type": "application-json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(mailSliceActions.saveSentMails(data));
          });
      }, []);
   

  return (
    <>
        <div>
   
        <ul>
         
          {
            allMails &&  Object.keys(allMails).map((item) => (
            <li key={item} id={item}>
              {<OutboxMessage 
              body={allMails[item].body}
              heading={allMails[item].heading}
              to={allMails[item].to} /> }
              
            </li>
          ))
          }
        </ul>
      </div>
    <div>

   
    </div>
    
    </>
  )
}

export default Outbox;