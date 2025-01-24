import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ErrorTable from './ErrorTable';
import Chart from './Chart';

const ErrorPage = () => {
  const [errors, setErrors] = useState([]);
  const [errorBreakdown, setErrorBreakdown] = useState({ memoryErrors: 0, timeoutErrors: 0 });

  useEffect(() => {
    // Mock API call
    const mockErrors = [
      {
        type: 'Memory Exceeded',
        function: 'Function A',
        description: 'Exceeded memory limit of 128MB',
        timestamp: '2 min ago',
        logsLink: '/logs/function-a',
        traceLink: '/trace/function-a',
      },
      {
        type: 'Timeout Error',
        function: 'Function B',
        description: 'Execution timed out after 30 seconds',
        timestamp: '15 min ago',
        logsLink: '/logs/function-b',
        traceLink: '/trace/function-b',
      },
    ];
    setErrors(mockErrors);

    const mockBreakdown = { memoryErrors: 45, timeoutErrors: 30 };
    setErrorBreakdown(mockBreakdown);
  }, []);

  return (
    <div className="error-page">
      <Sidebar />
      <div className="main-content">
        <Header title="Error Monitor" />
        <div className="filters">
          <select>
            <option>All Functions</option>
          </select>
          <select>
            <option>All Error Types</option>
          </select>
        </div>
        <ErrorTable errors={errors} />
        <div className="suggested-fixes">
          <div className="fix-card">Increase memory allocation to prevent memory errors.</div>
          <Chart data={errorBreakdown} title="Error Breakdown" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
