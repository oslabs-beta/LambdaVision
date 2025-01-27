import React, { useState, useEffect } from "react";
import ErrorTable from "../components/ErrorTable";
//import Chart from "../components/Chart";

const ErrorAlerts = () => {
  const [errors, setErrors] = useState([]);
  const [errorBreakdown, setErrorBreakdown] = useState({
    memoryErrors: 0,
    timeoutErrors: 0,
  });

  useEffect(() => {
    const mockErrors = [
      {
        type: "Memory Exceeded",
        function: "Function A",
        description: "Exceeded memory limit of 128MB",
        timestamp: "2 min ago",
        logsLink: "/logs/function-a",
        traceLink: "/trace/function-a",
      },
      {
        type: "Timeout Error",
        function: "Function B",
        description: "Execution timed out after 30 seconds",
        timestamp: "15 min ago",
        logsLink: "/logs/function-b",
        traceLink: "/trace/function-b",
      },
    ];
    setErrors(mockErrors);

    const mockBreakdown = { memoryErrors: 45, timeoutErrors: 30 };
    setErrorBreakdown(mockBreakdown);
  }, []);

  return (
    <div className="flex h-screen">
   
      <div className="flex flex-col flex-grow">
       
        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Error Alerts</h1>
          {/* Error Breakdown and Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Error Breakdown</h2>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-bold text-red-500">Memory Errors:</span>{" "}
                  {errorBreakdown.memoryErrors}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold text-orange-500">Timeout Errors:</span>{" "}
                  {errorBreakdown.timeoutErrors}
                </p>
              </div>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              {/* <Chart data={errorBreakdown} /> */}
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Recent Errors</h2>
            <ErrorTable errors={errors} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ErrorAlerts;


