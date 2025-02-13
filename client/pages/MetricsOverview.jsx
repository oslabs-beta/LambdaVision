import React from 'react';
import Chart from '../components/Chart';
import MetricCard from '../components/MetricCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ExclamationTriangleIcon,
  CodeBracketIcon,
  BoltIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

const MetricsOverview = () => {
  const [metrics, setMetrics] = useState([
    {
      totalFunctions: 0,
      totalInvocations: 0,
      totalErrors: 0,
      errorRate: 0,
      averageDuration: 0,
    },
  ]);
  const [functionMetrics, setFunctionMetrics] = useState([]);

  const fetchMetrics = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token

    if (!token) {
      console.error('⚠️ No token found in localStorage');
      return; // Prevents API call if no token is found
    }

    try {
      const response = await axios.get(
        'http://localhost:3000/api/lambda/total-metrics',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMetrics(response.data);
    } catch (error) {
      console.error('There was an error getting metrics information', error);
    }
  };

  const fetchFunctionMetrics = async () => {
    //
    try {
      const token = localStorage.getItem('token'); // Get the token

      if (!token) {
        console.error('🚨 No token found in local storage');
        return; // Stop execution if no token is available
      }

      const response = await axios.get(
        'http://localhost:3000/api/lambda/total-functions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setFunctionMetrics(response.data.functions || []);
    } catch (error) {
      console.error('Error fetching functions', error.message);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchFunctionMetrics();
  }, []);

  //create an array for throttles data
  const invocationsData = [
    {
      time: new Date(),
      value: metrics.totalInvocations,
    },
  ];

  //create an array for invocations data

  const errorData = [
    {
      time: new Date(),
      value: metrics.totalErrors,
    },
  ];

  return (
    <div className='App flex'>
      <div className='flex-1'>
        <div className='p-6 space-y-6'>
          <div className='flex flex-wrap gap-4'>
            <MetricCard
              title={
                <div className='flex items-center space-x-2'>
                  <CodeBracketIcon className='w-6 h-6 text-gray-400' />
                  <span>Total Functions</span>
                </div>
              }
              metric={metrics.totalFunctions}
            ></MetricCard>

            <MetricCard
              title={
                <div className='flex items-center space-x-2'>
                  <BoltIcon className='w-6 h-6 text-gray-400' />
                  <span>Total Invocations</span>
                </div>
              }
              metric={metrics.totalInvocations}
            ></MetricCard>

            <MetricCard
              title={
                <div className='flex items-center space-x-2'>
                  <ExclamationTriangleIcon className='w-6 h-6 text-gray-400' />
                  <span>Total Errors</span>
                </div>
              }
              metric={metrics.totalErrors}
            ></MetricCard>

            <MetricCard
              title={
                <div className='flex items-center space-x-2'>
                  <ClockIcon className='w-6 h-6 text-gray-400' />
                  <span>Average Duration</span>
                </div>
              }
              metric={metrics.averageDuration}
            ></MetricCard>
          </div>
          {/* Charts Section */}
          <div className='flex gap-4 p-5'>
            <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
              <Chart
                title='Invocations'
                data={invocationsData}
                color={'orange'}
                yLabel={'Count'}
              />
            </div>
            <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
              <Chart
                title='Errors'
                data={errorData}
                color={'red'}
                yLabel={'Count'}
              />
            </div>
          </div>

          {/* Lambda Functions Table */}
          <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
            <table className='w-full text-left table-auto min-w-max '>
              <thead>
                <tr>
                  <th className='w-1/4 p-4 border-b border-slate-300 bg-slate-50'>
                    <p className='block text-sm font-normal leading-none text-slate-500'>
                      Function Name
                    </p>
                  </th>
                  <th className='w-1/4 p-4 border-b border-slate-300 bg-slate-50'>
                    <p className='block text-sm font-normal leading-none text-slate-500'>
                      RunTime
                    </p>
                  </th>
                  <th className='w-1/4 p-4 border-b border-slate-300 bg-slate-50'>
                    <p className='block text-sm font-normal leading-none text-slate-500'>
                      Last Modified
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {functionMetrics.length > 0 ? (
                  functionMetrics.map((func, index) => (
                    <tr key={index} className='hover:bg-slate-50'>
                      <td className='w-1/4 p-4 border-b border-slate-200'>
                        <p className='block text-sm font-semibold text-slate-800'>
                          {func.name}
                        </p>
                      </td>
                      <td className='w-1/4 p-4 border-b border-slate-200'>
                        <p className='block text-sm text-slate-800'>
                          {func.runtime}
                        </p>
                      </td>
                      <td className='w-1/4 p-4 border-b border-slate-200'>
                        <p className='block text-sm font-semibold text-slate-800'>
                          {new Date(func.lastModified).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                            timeZoneName: 'short',
                          })}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='4' className='p-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
