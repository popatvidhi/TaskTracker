import React from 'react';
import './colorPicker.scss';
const COLORS_DATA = [
  '#B71C1C',
  '#880E4F',
  '#4A148C',
  '#311B92',
  '#0D47A1',
  '#004D40',
  '#1B5E20',
  '#F57F17',
  '#BF360C',
];

/**
 *
 * @param {*} param0
 * @returns color picker html page
 */
const ColorPicker = ({ label, onChange, name, value, error }) => {
  return (
    <div className="color-picker-wrapper">
      <label>{label}</label>
      <div className="colors-list">
        {COLORS_DATA.map((color, index) => (
          <div
            key={`color ${index}`}
            className={`color-picker-block ${value === color ? 'color-picker-selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange({ target: { name, value: color } })}
          />
        ))}
      </div>
      {error && <p className="error-field">{error}</p>}
    </div>
  );
};

export default ColorPicker;
