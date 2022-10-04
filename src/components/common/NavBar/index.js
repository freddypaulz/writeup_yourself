import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
export default function NavBar({ user, logoutHandler }) {
   const navigate = useNavigate();

   const logout = () => {
      logoutHandler();
      navigate('/login', { replace: true });
   };

   return (
      <nav className='navbar-container'>
         <div className='navbar-container-username'>{user}</div>
         <div className='navbar-container-logout'>
            <button className='' onClick={logout}>
               <i className='fa-solid fa-right-from-bracket'></i>
            </button>
         </div>
      </nav>
   );
}
