import React from 'react';
import Chart from '../components/Chart';
import MetricCard from '../components/MetricCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ExclamationTriangleIcon,
  CodeBracketIcon,BoltIcon,ClockIcon
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
  const [functionMetrics, setFunctionMetrics] = useState({
    functionName: '',
    Invocations: 0,
    Errors: 0,
    Throttles: 0,
    ColdStartDuration: 0,
  });
  



  const fetchMetrics = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/lambda/total-metrics');
        setMetrics(response.data);
    } catch (error) {
      console.error('There was an error getting metrics information', error);
    }
  };

  const fetchFunctionMetrics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lambda/functions/metrics`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
        }
      );
      setFunctionMetrics(response.data);
    } catch (error) {
      console.error('Error getting metrics', error);
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
        value: metrics.errorRate,
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
                title='Error Rate'
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
                      Invocations
                    </p>
                  </th>
                  <th className='w-1/4 p-4 border-b border-slate-300 bg-slate-50'>
                    <p className='block text-sm font-normal leading-none text-slate-500'>
                      Errors
                    </p>
                  </th>
                  <th className='w-1/4 p-4 border-b border-slate-300 bg-slate-50'>
                    <p className='block text-sm font-normal leading-none text-slate-500'>
                      Cold Start Duration
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='hover:bg-slate-50'>
                  <td className='w-1/4 p-4 border-b border-slate-200'>
                    <p className='block text-sm font-semibold text-slate-800'>
                      {functionMetrics.functionName}
                    </p>
                  </td>
                  <td className='w-1/4 p-4 border-b border-slate-200'>
                    <p className='block text-sm text-slate-800'>
                      {functionMetrics.Invocations}
                    </p>
                  </td>
                  <td className='w-1/4 p-4 border-b border-slate-200'>
                    <p className='block text-sm font-semibold text-red-500'>
                      {functionMetrics.Errors}
                    </p>
                  </td>
                  <td className='w-1/4 p-4 border-b border-slate-200'>
                    <p className='block text-sm text-slate-800'>
                      {functionMetrics.ColdStartDuration} ms
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
