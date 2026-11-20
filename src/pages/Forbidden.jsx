import React from 'react';
import ErrorLayout from './ErrorLayout';

const Forbidden = () => {
  return <ErrorLayout code={403} />;
};

export default Forbidden;
