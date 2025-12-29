import React from 'react';

const spinnerContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
};

const spinnerStyle: React.CSSProperties = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  border: '6px solid rgba(68, 129, 195, 0.3)',
  borderTopColor: '#4481c3',
  animation: 'spinner-rotate 1s linear infinite',
};

const Spinner: React.FC = () => (
  <>
    <style>
      {`
        @keyframes spinner-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>

    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle} />
    </div>
  </>
);

export default Spinner;
