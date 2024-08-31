import React from 'react';

const ErrorPage = ({ message }) => {
  return (
    <div className="error-page">
      <h3>Error</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
