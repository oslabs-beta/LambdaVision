import React from 'react';

const ErrorTable = ({ errors }) => {
  return (
    <div className="error-table">
      {errors.map((error, index) => (
        <div key={index} className="error-row">
          <div className="error-type">{error.type}</div>
          <div className="error-function">{error.function}</div>
          <div className="error-description">{error.description}</div>
          <div className="error-timestamp">{error.timestamp}</div>
          <div className="error-actions">
            <a href={error.logsLink}>View Logs</a>
            <a href={error.traceLink}>View Trace</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorTable;