import React from 'react';
import './loader.scss';

/**
 * 
 * @param {*} param0 
 * @returns loader html page
 */
const Loader = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="loader-wrapper">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
