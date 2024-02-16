import * as React from 'react';

/**
 *  
 * @param {*} props 
 * @returns svg
 */
const AddIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
    <path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: '#000',
        fillOpacity: 1,
      }}
      d="M0 0v30h30V0Zm25.5 16H16v9.5h-2V16H4.5v-2H14V4.5h2V14h9.5Zm0 0"
    />
  </svg>
);

export default AddIcon;
