import React, { useState, useEffect } from "react";
import ErrorTable from "../components/ErrorTable";
import axios from "axios";

const ErrorAlerts = () => {
  const [errors, setErrors] = useState([]);
 
const fetchErrorLogs = async () => {
try{
 const response = await axios.get(
        'http://localhost:3000/api/lambda/lambda/cloudlogs'
      );
      console.log(response);
      const formattedErrors = response.data.errorLogs.flatMap((log) =>
      log.errorLogs.map((message) => ({
        functionName: log.functionName,
        message,
      }))
    );
      setErrors(formattedErrors);
}catch(error){
   console.error('Error fetching Logs', error.message);
}
};

useEffect(() => {
 fetchErrorLogs();
}, []);



  return (
    <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold text-gray-800">Error Alerts</h1>
      {/* <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 text-left">Function Name</th>
            <th className="py-2 px-4 text-left">Error Message</th>
          </tr>
        </thead>
        <tbody>
          {errors.length > 0 ? (
            errors.map((error, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{error.functionName}</td>
                <td className="py-2 px-4 text-red-500">{error.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-4 px-4 text-center text-gray-500">
                No errors found.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
      <div className="flex flex-wrap gap-4">
  {errors.length > 0 ? (
    errors.map((error, index) => (
      <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-64">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-gray-700 font-semibold">{error.functionName}</span>
        </div>
        <p className="text-red-500">{error.message}</p>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-500 w-full">
      No errors found.
    </div>
  )}
</div>
    </div>
  );
};

export default ErrorAlerts;


