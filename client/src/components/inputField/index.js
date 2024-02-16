import React from 'react';
import './inputField.scss';

/**
 *
 * @param {*} param0
 * @returns dyanmic input value html
 */
const InputField = ({ name, label, error, ...props }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input {...props} id={name} {...{ name }} />
      {error && <p className="error-field">{error}</p>}
    </div>
  );
};

export default InputField;
