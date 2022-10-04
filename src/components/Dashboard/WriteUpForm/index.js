import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputField from 'components/common/InputField';
import InputTextArea from 'components/common/InputTextArea';
import { validWriteUpTitle, validWriteUpContent } from 'helpers';
import './index.scss';

export default function WriteUpForm({ saveWriteUp }) {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [errors, setErrors] = useState([]);
   const [succuss, setSuccess] = useState('');

   const writeUp = useSelector((state) => state.writeUp).writeUp;

   const onSaveHandler = () => {
      let errorsList = [];
      setSuccess('');

      if (!validWriteUpTitle.test(title)) {
         errorsList.push('Title should be 10 to 100 characters long');
      }
      if (!validWriteUpContent.test(content)) {
         errorsList.push('Content should be 50 to 1000 characters long');
      }

      if (errorsList.length === 0) {
         saveWriteUp(title, content);
         setSuccess('WriteUp updated successfully');
      }
      setErrors([...errorsList]);
   };

   useEffect(() => {
      console.log(writeUp);
      setTitle(writeUp.Title);
      setContent(writeUp.Content);
   }, []);

   const onResetHandler = () => {
      setTitle('');
      setContent('');
   };

   return (
      <div className='writeup-form-container'>
         <div className='writeup-form-container-content'>
            <InputField
               type='text'
               name='title'
               placeholder='Title'
               value={title}
               onChangeFunction={setTitle}
            />
            <InputTextArea
               name='content'
               placeholder='Content'
               value={content}
               onChangeFunction={setContent}
               rows={17}
            />
         </div>
         <div className='writeup-form-container-action'>
            {errors.length > 0 && (
               <div className='writeup-form-container-error'>
                  {errors.map((error, index) => {
                     return <label key={index}>*{error}.</label>;
                  })}
               </div>
            )}
            <div className='writeup-form-container-success'>
               <label>{succuss}</label>
            </div>
            <button className='btn btn-primary btn-lg' onClick={onSaveHandler}>
               Save
            </button>
            <button
               className='btn btn-secondary btn-lg'
               onClick={onResetHandler}
            >
               Reset
            </button>
         </div>
      </div>
   );
}
