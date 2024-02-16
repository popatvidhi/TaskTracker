import * as React from 'react';

/**
 * 
 * @param {*} props 
 * @returns svg
 */
const DeleteIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
    <path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: '#000',
        fillOpacity: 1,
      }}
      d="M15 0C6.715 0 0 6.715 0 15s6.715 15 15 15 15-6.715 15-15S23.285 0 15 0Zm5.07 17.754a1.636 1.636 0 0 1-1.156 2.797c-.422 0-.84-.16-1.16-.477L15 17.32l-2.754 2.754a1.645 1.645 0 0 1-2.316 0 1.64 1.64 0 0 1 0-2.32L12.68 15l-2.75-2.754a1.64 1.64 0 0 1 0-2.32 1.643 1.643 0 0 1 2.316 0L15 12.68l2.754-2.754a1.648 1.648 0 0 1 2.32 0c.637.64.637 1.68 0 2.32L17.32 15Zm0 0"
    />
  </svg>
);

export default DeleteIcon;
