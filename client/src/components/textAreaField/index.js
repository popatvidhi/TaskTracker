import React from 'react';
import './textAreaField.scss';

/**
 *
 * @param {*} param0
 * @returns text area html wrapper
 */
const TextAreaField = ({ name, label, error, ...props }) => {
  return (
    <div className="textarea-wrapper">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...{ name }} rows="5" cols="50" {...props} />
      {error && <p className="error-field">{error}</p>}
    </div>
  );
};

export default TextAreaField;
