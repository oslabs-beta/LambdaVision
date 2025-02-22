import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ErrorAlerts = () => {
  const [errors, setErrors] = useState([]);

  const fetchErrorLogs = async () => {
    const token = localStorage.getItem('token'); // ✅ Retrieve token

    if (!token) {
      console.error("No token found in localStorage. User may be logged out.");
      return; // Prevent API call if token is missing
    }

    try {
      const response = await axios.get(
        'http://localhost:3000/api/lambda/cloudlogs', // ✅ Correct API endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("Fetched error logs:", response.data);
      
      const formattedErrors = response.data.errorLogs.flatMap((log) =>
        log.errorLogs.map((message) => ({
          functionName: log.functionName,
          message,
        }))
      );
      setErrors(formattedErrors);
    } catch (error) {
      console.error('Error fetching Logs', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchErrorLogs();
  }, []);

  const sampleErrors = [
    {
      functionName: 'fetchUserData',
      message: 'Failed to fetch user data: Network error',
    },
    {
      functionName: 'processPayment',
      message: 'Payment gateway timeout',
    },
    {
      functionName: 'uploadFile',
      message: 'File size exceeds the limit',
    },
    {
      functionName: 'generateReport',
      message: 'Database connection lost',
    },
    {
      functionName: 'sendEmail',
      message: 'SMTP server unreachable',
    },
  ];
  const errorList = sampleErrors;
  return (
    <div className='overflow-x-auto'>
      <h1 className='text-2xl font-bold pb-6 text-gray-800'>Error Alerts</h1>

      <div className='flex flex-col gap-4 w-full max-w-3xl'>
        {errors.length > 0 ? (
          errors.map((error, index) => (
            <div
              key={index}
              className='bg-red-100 border-l-4 border-red-500 shadow-md rounded-lg p-5 w-full hover:bg-red-200 hover:shadow-lg transition-all duration-200'
            >
              <div className='flex items-center mb-2'>
                <div className='w-4 h-4 bg-red-500 rounded-full mr-2'></div>
                <span className='text-gray-700 font-semibold'>
                  {error.functionName}
                </span>
              </div>
              <p className='text-red-500'>{error.message}</p>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500 w-full'>
            No errors found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorAlerts;
