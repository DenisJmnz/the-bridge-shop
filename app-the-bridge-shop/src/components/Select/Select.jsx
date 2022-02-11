import React from 'react';
import './Select.css';

const Select = ({
    children,
    className,
    options,
    id,
    onChange
}) => {
  return (<div className="divSelect" id={id}>
      <label htmlFor={`select_`+id}>{children}</label>
      <select onChange={onChange} id={`select_`+id}>
          {
            options.map((option,i)=>{
                return( <option key={i} value={option._id}>{option.name}</option> )
            })
          }
      </select>
  </div>);
};

export default Select;
