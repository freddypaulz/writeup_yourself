import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from 'components/common/NavBar';
import AdminDashboard from 'components/Dashboard/AdminDashboard';
import UserDashboard from 'components/Dashboard/UserDashboard';
import { userReducer, writeUpReducer } from 'reducers/dashboard';
import 'assets/scss/pages/dashboard.scss';

export default function Dashboard() {
   const [user, setUser] = useState({});
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const activeUser = useSelector((state) => state.user).user;

   const logoutHandler = () => {
      dispatch(writeUpReducer.actions.logout());
      localStorage.removeItem('currentUser');
   };

   useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (!currentUser) {
         navigate('/login', { replace: true });
      } else {
         setUser(currentUser);
         dispatch(userReducer.actions.setUser(currentUser));
      }
      console.log('activeUser: ', activeUser);
   }, []);

   return (
      <div className='dashboard-container'>
         <NavBar
            user={activeUser.FullName}
            logoutHandler={() => {
               logoutHandler();
            }}
         />
         {activeUser.AccountType === 'Admin' ? (
            <AdminDashboard />
         ) : (
            <UserDashboard userEmailId={activeUser.EmailAddress} />
         )}
      </div>
   );
}
