import * as React from 'react';

/**
 * 
 * @param {*} props 
 * @returns svg
 */
const BackIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} {...props}>
    <path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: 'rgb(47,47,47)',
        fillOpacity: 1,
      }}
      d="M25 0C11.191 0 0 11.191 0 25c0 13.805 11.191 25 25 25 13.805 0 25-11.195 25-25C50 11.191 38.805 0 25 0Zm6.54 36.367a2.327 2.327 0 0 1-1.653.684 2.312 2.312 0 0 1-1.649-.684l-9.383-9.383a2.312 2.312 0 0 1-.394-.312 2.316 2.316 0 0 1-.68-1.692 2.303 2.303 0 0 1 1.074-2.007l9.34-9.34c.91-.91 2.39-.91 3.301 0 .91.914.91 2.39 0 3.3l-8.043 8.047 8.086 8.086c.91.91.91 2.387 0 3.301Zm0 0"
    />
  </svg>
);

export default BackIcon;
