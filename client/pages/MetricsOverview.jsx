import React from "react";

const MetricsOverview = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Functions</h3>
          <p className="text-2xl font-bold text-gray-800">24</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Invocations</h3>
          <p className="text-2xl font-bold text-gray-800">1.2M</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Execution Time</h3>
          <p className="text-2xl font-bold text-gray-800">245ms</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Error Rate</h3>
          <p className="text-2xl font-bold text-gray-800">0.02%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Invocations Trend
          </h3>
          <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
            Chart: Invocations over time
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Error Rate Trend
          </h3>
          <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
            Chart: Error rate over time
          </div>
        </div>
      </div>

      {/* Lambda Functions Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Lambda Functions
        </h3>
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Function Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Invocations
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Avg. Duration
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Error Rate
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Cold Starts
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-2 text-sm text-gray-700">
                api-gateway-handler
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">245K</td>
              <td className="px-4 py-2 text-sm text-gray-700">123ms</td>
              <td className="px-4 py-2 text-sm text-gray-700">0.01%</td>
              <td className="px-4 py-2 text-sm text-gray-700">12</td>
              <td className="px-4 py-2 text-sm text-green-500 font-bold">
                Healthy
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">image-processor</td>
              <td className="px-4 py-2 text-sm text-gray-700">89K</td>
              <td className="px-4 py-2 text-sm text-gray-700">892ms</td>
              <td className="px-4 py-2 text-sm text-gray-700">1.2%</td>
              <td className="px-4 py-2 text-sm text-gray-700">45</td>
              <td className="px-4 py-2 text-sm text-orange-500 font-bold">
                Warning
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 text-sm text-gray-700">auth-service</td>
              <td className="px-4 py-2 text-sm text-gray-700">567K</td>
              <td className="px-4 py-2 text-sm text-gray-700">45ms</td>
              <td className="px-4 py-2 text-sm text-gray-700">0.003%</td>
              <td className="px-4 py-2 text-sm text-gray-700">8</td>
              <td className="px-4 py-2 text-sm text-green-500 font-bold">
                Healthy
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsOverview;

