import React, { useState } from 'react';
import 'assets/scss/pages/register.scss';
import { Link } from 'react-router-dom';
import { validEmail, validFullName, validPassword } from 'helpers';
import InputField from 'components/common/InputField';

export default function Register() {
   const [fullName, setFullName] = useState('');
   const [emailAddress, setEmailAddress] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errors, setErrors] = useState([]);
   const [succuss, setSuccess] = useState('');

   const registerHandler = () => {
      let errorsList = [];

      if (!validFullName.test(fullName)) {
         errorsList.push('Full name should only contain alphabets');
      }
      if (!validEmail.test(emailAddress)) {
         errorsList.push('enter valid email address');
      }
      if (!validPassword.test(password)) {
         errorsList.push('Password should have atleast 8 characters');
      }
      if (validPassword.test(password)) {
         if (password !== confirmPassword) {
            errorsList.push('Password and Confirm Password should be same');
         }
      }

      setErrors([...errorsList]);
      if (errorsList.length === 0) {
         const users = JSON.parse(localStorage.getItem('Users'));
         if (!users || users?.length === 0) {
            localStorage.setItem(
               'Users',
               JSON.stringify([
                  {
                     FullName: `${fullName}`,
                     EmailAddress: `${emailAddress}`,
                     Password: `${password}`,
                     AccountType: 'User',
                     IsDisabled: false,
                  },
               ])
            );
         } else {
            localStorage.setItem(
               'Users',
               JSON.stringify([
                  ...users,
                  {
                     FullName: `${fullName}`,
                     EmailAddress: `${emailAddress}`,
                     Password: `${password}`,
                     AccountType: 'User',
                     IsDisabled: false,
                  },
               ])
            );
         }
         setSuccess('User Registration successful');
         resetForm();
      } else {
         setSuccess('');
      }
   };

   const resetForm = () => {
      setFullName('');
      setEmailAddress('');
      setPassword('');
      setConfirmPassword('');
   };

   return (
      <div className='register-container'>
         <div className='register-container-form'>
            <div className='register-container-header'>Register User</div>
            <InputField
               type='text'
               name='full-name'
               placeholder='Full name'
               value={fullName}
               onChangeFunction={setFullName}
            />
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
            <InputField
               type='password'
               name='confirmpassword'
               placeholder='Confirm Password'
               value={confirmPassword}
               onChangeFunction={setConfirmPassword}
            />
            {errors.length > 0 && (
               <div className='register-container-form-error no-select'>
                  {/* usually index will not be used as key. Unique ID from backend will be used as key*/}
                  {errors.map((error, index) => {
                     return <label key={index}>*{error}.</label>;
                  })}
               </div>
            )}
            <div className='register-container-form-success no-select'>
               <label>{succuss}</label>
            </div>
            <button className='btn submit-button' onClick={registerHandler}>
               Register
            </button>
            <div className='login-link'>
               <Link to={'/login'}>Login</Link>
            </div>
         </div>
      </div>
   );
}
