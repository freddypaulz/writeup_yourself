import React from 'react';
import './index.scss';
export default function InputField({
   type,
   name,
   placeholder,
   value,
   onChangeFunction,
   isDisabled,
}) {
   const onValueChange = (value) => {
      onChangeFunction(value);
   };

   return (
      <div className='input-field-container'>
         <input
            className='input-field-container-component'
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={isDisabled ? true : false}
         />
      </div>
   );
}
