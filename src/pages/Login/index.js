import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail } from 'helpers';
import InputField from 'components/common/InputField';
import { writeUpReducer } from 'reducers/dashboard';
import 'assets/scss/pages/login.scss';

export default function Login() {
   const [emailAddress, setEmailAddress] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState([]);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const loginHandler = () => {
      let errorsList = [];
      if (!validEmail.test(emailAddress)) {
         errorsList.push('enter valid email address');
      }

      setErrors([...errorsList]);
      if (errorsList.length === 0) {
         const users = JSON.parse(localStorage.getItem('Users'));
         if (users) {
            const user = users.find(
               (user) => user.EmailAddress === emailAddress
            );
            if (user !== undefined) {
               if (user.Password === password) {
                  if (!user.IsDisabled) {
                     console.log('logged in');
                     localStorage.setItem(
                        'currentUser',
                        JSON.stringify({
                           FullName: user.FullName,
                           EmailAddress: user.EmailAddress,
                           AccountType: user.AccountType,
                        })
                     );
                     navigate('/dashboard');
                  } else {
                     errorsList.push('your account is disabled contact admin');
                     setErrors([...errorsList]);
                     return;
                  }
               }
            }
         }
         errorsList.push('check user name or password');
         setErrors([...errorsList]);
      }
   };

   useEffect(() => {
      localStorage.removeItem('currentUser');
      dispatch(writeUpReducer.actions.logout());

      const users = JSON.parse(localStorage.getItem('Users'));
      if (!users) {
         localStorage.setItem(
            'Users',
            JSON.stringify([
               {
                  FullName: 'Administrator',
                  EmailAddress: 'admin@enerji.com',
                  Password: '12345678',
                  AccountType: 'Admin',
                  IsDisabled: false,
               },
               {
                  FullName: 'User',
                  EmailAddress: 'user@gmail.com',
                  Password: '12345678',
                  AccountType: 'User',
                  IsDisabled: false,
               },
            ])
         );
      }
   }, []);

   return (
      <div className='login-container'>
         <div className='login-container-form'>
            <div className='login-container-header'>Login</div>
            <InputField
               type='email'
               name='e-mail'
               placeholder='Email Address'
               value={emailAddress}
               onChangeFunction={setEmailAddress}
            />
            <InputField
               type='password'
               name='password'
               placeholder='Password'
               value={password}
               onChangeFunction={setPassword}
            />
            <div className='login-container-form-error no-select'>
               {/* usually index will not be used as key. Unique ID from backend will be used as key*/}
               {errors.map((error, index) => {
                  return <label key={index}>*{error}.</label>;
               })}
            </div>
            <button className='btn submit-button' onClick={loginHandler}>
               Login
            </button>
            <div className='register-link'>
               <Link to={'/register'}>Register</Link>
            </div>
         </div>
      </div>
   );
}
