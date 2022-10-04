import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { writeUpReducer } from 'reducers/dashboard';
import WriteUpForm from '../WriteUpForm';
import './index.scss';

export default function UserDashboard({ userEmailId }) {
   const [activeTab, setActiveTab] = useState(1);
   const [userHasWriteUp, setUserHasWriteUp] = useState(false);

   const userWriteUp = useSelector((state) => state.writeUp).writeUp;
   const dispatch = useDispatch();

   const handleTabChange = (tab) => {
      setActiveTab(tab);
   };

   useEffect(() => {
      const writeUps = JSON.parse(localStorage.getItem('userWriteUps'));
      console.log(userEmailId, writeUps);
      if (writeUps) {
         const writeUp = writeUps.find(
            (writeUp) => writeUp.EmailAddress == userEmailId
         );
         console.log(writeUp);
         if (writeUp !== undefined) {
            setUserHasWriteUp(true);
            dispatch(writeUpReducer.actions.setWriteUp(writeUp));
            console.log(writeUp);
         } else {
            console.log('not Found');
         }
      } else {
         console.log('not Found');
      }
   }, [userEmailId]);

   const saveWriteUp = (title, content) => {
      const writeUps = JSON.parse(localStorage.getItem('userWriteUps'));

      if (writeUps) {
         const index = writeUps.findIndex(
            (writeUp) => writeUp.EmailAddress == userEmailId
         );
         if (index !== -1) {
            writeUps.splice(index, 1, {
               EmailAddress: userEmailId,
               Title: title,
               Content: content,
            });
            localStorage.setItem('userWriteUps', JSON.stringify(writeUps));
         } else {
            localStorage.setItem(
               'userWriteUps',
               JSON.stringify([
                  ...writeUps,
                  {
                     EmailAddress: userEmailId,
                     Title: title,
                     Content: content,
                  },
               ])
            );
         }
      } else {
         localStorage.setItem(
            'userWriteUps',
            JSON.stringify([
               {
                  EmailAddress: userEmailId,
                  Title: title,
                  Content: content,
               },
            ])
         );
      }
      dispatch(
         writeUpReducer.actions.setWriteUp({
            EmailAddress: userEmailId,
            Title: title,
            Content: content,
         })
      );
      setUserHasWriteUp(true);
      console.log(userEmailId, title, content);
   };

   return (
      <>
         <div className='tab-container'>
            <div
               className={`tab-container-item ${activeTab === 1 && 'active'} `}
               onClick={() => {
                  handleTabChange(1);
               }}
            >
               Writeup yourself
            </div>
            <div
               className={`tab-container-item ${activeTab === 2 && 'active'} `}
               onClick={() => {
                  handleTabChange(2);
               }}
            >
               Edit your writeup
            </div>
         </div>
         <div className='user-dashboard-container'>
            {activeTab === 1 ? (
               userHasWriteUp ? (
                  <div className='writeup'>
                     <div className='writeup-title'>{userWriteUp.Title}</div>
                     <div className='writeup-content'>
                        {userWriteUp.Content}
                     </div>
                  </div>
               ) : (
                  <WriteUpForm saveWriteUp={saveWriteUp} />
               )
            ) : (
               <WriteUpForm saveWriteUp={saveWriteUp} />
            )}
         </div>
      </>
   );
}
