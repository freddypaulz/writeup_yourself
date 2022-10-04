import React from 'react';
import './index.scss';
export default function InputTextArea({
   name,
   placeholder,
   value,
   onChangeFunction,
   rows,
   isDisabled,
}) {
   const onValueChange = (value) => {
      onChangeFunction(value);
   };

   return (
      <div className='input-textarea-container'>
         <textarea
            className='input-textarea-container-component'
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            rows={rows}
            disabled={isDisabled ? true : false}
         />
      </div>
   );
}
