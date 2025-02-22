import React from 'react';

const ErrorLog = ({ errors = [] }) => {
  return (
    <div className='m-5 font-sans'>
      <h1 className='text-left text-xl p-2 text-gray-500'>Error Log</h1>
      <table className='w-full border-collapse mt-5 border border-gray-300 bg-white'>
        <thead>
          <tr>
            <th className='text-gray-500 p-3 text-left font-bold border-b-2 border-gray-300'>
              Timestamp
            </th>
            <th className='text-gray-500 p-3 text-left font-bold border-b-2 border-gray-300'>
              Error Type
            </th>
            <th className='text-gray-500 p-3 text-left font-bold border-b-2 border-gray-300'>
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error, index) => (
            <tr key={index} className='hover:bg-gray-100 cursor-pointer'>
              <td className='p-3 text-left border-b border-gray-100'>
                {error.time}
              </td>
              <td className='p-3 text-left border-b border-gray-100'>
                {error.error}
              </td>
              <td className='p-3 text-left border-b border-gray-100'>
                {error.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ErrorLog;
