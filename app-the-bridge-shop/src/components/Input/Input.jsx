import React from 'react';
import './Input.css';

const Input = ({ children, onChange, id}) => {

    return (
        <div className="divSearch" id={id}>
            <label htmlFor={`"input_${id}`}>{children}</label>
            <input type="text" id={`"input_${id}`} onChange={onChange} />
        </div>
    );
};

export default Input;
