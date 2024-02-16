import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendarField.scss';

/**
 *
 * @param {*} param0
 * @returns dynamic calender html page
 */
const CalendarField = ({ name, error, label, onChange, ...props }) => {
  return (
    <div className="calendar-wrapper">
      <label htmlFor={name}>{label}</label>
      <DatePicker
        {...{ name }}
        {...{ props }}
        selected={props.value}
        placeholderText="Select Date"
        onChange={(date) => onChange(name, date)}
      />
      {error && <p className="error-field">{error}</p>}
    </div>
  );
};

export default CalendarField;
