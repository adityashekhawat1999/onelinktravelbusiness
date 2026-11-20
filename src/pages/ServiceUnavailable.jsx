import React from 'react';
import ErrorLayout from './ErrorLayout';

const ServiceUnavailable = () => {
  return <ErrorLayout code={503} />;
};

export default ServiceUnavailable;
