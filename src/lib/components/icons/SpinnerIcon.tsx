import { CSSProperties } from 'react';

export default function SpinnerIcon() {
  const spinnerStyle = {
    transformOrigin: 'center',
    animation: 'spinner 2s linear infinite'
  } as CSSProperties;
  const spinnerCircleStyle = {
    strokeLinecap: 'round',
    animation: 'spinner-circle 1.5s ease-in-out infinite'
  } as CSSProperties;

  return (
    <svg
      width="1em"
      height="1em"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={spinnerStyle}>
        <circle style={spinnerCircleStyle} cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
      </g>
    </svg>
  );
}
