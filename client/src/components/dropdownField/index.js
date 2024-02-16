import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import './dropdownField.scss';

/**
 * 
 * @param {*} param0 
 * @returns dnd drop down field
 */
const DropDownField = ({
  name,
  data,
  onChange,
  label,
  display,
  selectedValues,
  value,
  multi = false,
  error,
}) => {
  const onSelectHandler = (a, b) => {
    onChange(a);
  };

  const onRemoveHandler = (a, b) => {
    onChange(a);
  };

  return (
    <div className="dropdown-wrapper">
      <label htmlFor={name}>{label}</label>
      {multi ? (
        <Multiselect
          {...{ name }}
          options={data}
          displayValue={display}
          selectedValues={selectedValues}
          onSelect={onSelectHandler}
          onRemove={onRemoveHandler}
        />
      ) : (
        <select {...{ name }} {...{ onChange }}>
          {data.map((item, index) => (
            <option value={item.id} key={name + index} selected={item.id === value}>
              {item.name}
            </option>
          ))}
          <optgroup label=""></optgroup>
        </select>
      )}
      {error && <p className="error-field">{error}</p>}
    </div>
  );
};

export default DropDownField;
