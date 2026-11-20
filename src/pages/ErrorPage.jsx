import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const VALID_CODES = [404, 500, 403, 503];

const ErrorPage = () => {
  const { code } = useParams();
  const numericCode = parseInt(code, 10);
  const resolvedCode = VALID_CODES.includes(numericCode) ? numericCode : 404;

  return <ErrorLayout code={resolvedCode} />;
};

export default ErrorPage;
