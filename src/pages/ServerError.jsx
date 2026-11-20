import React from 'react';
import ErrorLayout from './ErrorLayout';

const ServerError = ({ error = null, errorInfo = null, onReset = null }) => {
  return (
    <ErrorLayout
      code={500}
      error={error}
      errorInfo={errorInfo}
      onReset={onReset}
    />
  );
};

export default ServerError;
