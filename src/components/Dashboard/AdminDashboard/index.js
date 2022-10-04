import React, { useState, useEffect } from 'react';
// import './index.scss';

export default function AdminDashboard() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      let userList = [];
      userList = JSON.parse(localStorage.getItem('Users'));

      if (userList) {
         setUsers(userList);
      }
   }, []);

   const toggleIsDisableHandler = (email) => {
      let userList = [];
      userList = users;
      const index = userList.findIndex((user) => user.EmailAddress === email);

      if (index !== -1) {
         console.log(userList[index].IsDisabled);
         userList[index].IsDisabled = !userList[index].IsDisabled;
         setUsers([...userList]);
         localStorage.setItem('Users', JSON.stringify(userList));
      }
   };

   const deleteUserHandler = (email) => {
      let userList = [];
      userList = users;
      const index = userList.findIndex((user) => user.EmailAddress === email);

      if (index !== -1) {
         userList.splice(index, 1);
         setUsers([...userList]);
         localStorage.setItem('Users', JSON.stringify(userList));
      }
   };

   return (
      <div className='admin-dashboard-container'>
         <div className='admin-dashboard-container-header'>User Management</div>
         <hr />
         <div className='user-list'>
            {users.map(
               ({ FullName, EmailAddress, IsDisabled, AccountType }, index) => {
                  if (AccountType !== 'Admin') {
                     return (
                        <div className='users' key={index}>
                           <div className='users-data'>{FullName}</div>
                           <div className='users-data'>{EmailAddress}</div>
                           <div className='users-action-panel'>
                              <button
                                 className=''
                                 onClick={() =>
                                    toggleIsDisableHandler(EmailAddress)
                                 }
                              >
                                 {IsDisabled ? (
                                    <div>
                                       <i class='fa-solid fa-user'></i>
                                    </div>
                                 ) : (
                                    <div>
                                       <i class='fa-solid fa-user-slash'></i>
                                    </div>
                                 )}
                              </button>
                              <button
                                 className=''
                                 onClick={() => deleteUserHandler(EmailAddress)}
                              >
                                 <i class='fa-solid fa-trash'></i>
                              </button>
                           </div>
                        </div>
                     );
                  }
                  return null;
               }
            )}
         </div>
      </div>
   );
}
