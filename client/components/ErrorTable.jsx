import React from "react";

const ErrorTable = ({ errors = [] }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Error Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Function
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 text-sm text-gray-700">{error.type}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {error.function}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {error.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {error.timestamp}
              </td>
              <td className="px-6 py-4 text-sm text-blue-500 space-x-4">
                <a
                  href={error.logsLink}
                  className="hover:underline hover:text-blue-700"
                >
                  View Logs
                </a>
                <a
                  href={error.traceLink}
                  className="hover:underline hover:text-blue-700"
                >
                  View Trace
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ErrorTable;