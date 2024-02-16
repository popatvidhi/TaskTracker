import * as React from 'react';

/**
 * 
 * @param {*} props 
 * @returns svg
 */
const GreenTickIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={150} height={150} {...props}>
    <defs>
      <linearGradient
        id="a"
        gradientUnits="userSpaceOnUse"
        x1={42}
        y1={0}
        x2={42}
        y2={84}
        gradientTransform="scale(1.78571)"
      >
        <stop
          offset={0}
          style={{
            stopColor: '#fff',
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#fff',
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1={77.5}
        y1={5}
        x2={11}
        y2={75.5}
        gradientTransform="scale(1.78571)"
      >
        <stop
          offset={0}
          style={{
            stopColor: '#1ac4a5',
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#b8dfa5',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
    <path
      style={{
        fill: 'url(#a)',
        stroke: 'none',
      }}
      d="M0 0h150v150H0z"
    />
    <path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: 'url(#b)',
      }}
      d="M150 75c0 41.422-33.578 75-75 75S0 116.422 0 75 33.578 0 75 0s75 33.578 75 75Zm-37.219-28.406a7.036 7.036 0 0 0-5.105-2.051 7.035 7.035 0 0 0-5.02 2.258L70.098 88.285 50.477 68.652a7.03 7.03 0 0 0-9.786.157 7.026 7.026 0 0 0-.152 9.78l24.805 24.817a7.034 7.034 0 0 0 10.113-.187l37.426-46.781a7.032 7.032 0 0 0-.09-9.844Zm0 0"
    />
  </svg>
);

export default GreenTickIcon;
