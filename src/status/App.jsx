// src/StatusPage.jsx
import React from 'react';

const Status = () => {
  return (
    <iframe
      src="https://easy4o.betteruptime.com"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 999999,
      }}
      title="Status Page"
    />
  );
};

export default Status;