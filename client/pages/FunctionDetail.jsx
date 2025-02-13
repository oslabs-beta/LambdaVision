import React, { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import Chart from '../components/Chart';
import ErrorLog from '../components/ErrorLog';
import axios from 'axios';
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  BoltIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

const FunctionPage = () => {
  const [functions, setFunctions] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [metrics, setMetrics] = useState({
    Invocations: 0,
    Errors: 0,
    Throttles: 0,
    ColdStartDuration: 0,
  });
  // const [errorLogs, setErrorLogs] = useState([]);

  //Function List
  const fetchFunctions = async () => {
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
      setFunctions(response.data.functions);
    } catch (error) {
      console.error('Error fetching functions', error.message);
    }
  };
  //Metric Cards & Charts
  const fetchFunctionMetrics = async (functionName) => {
    try {
      const token = localStorage.getItem('token'); // Get the token

      if (!token) {
        console.error('🚨 No token found in local storage');
        return; // Stop execution if no token is available
      }

      const response = await axios.get(
        `http://localhost:3000/api/lambda/functions/${functionName}/metrics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { metrics } = response.data;

      setMetrics({
        Invocations: metrics.Invocations || 0,
        Errors: metrics.Errors || 0,
        Throttles: metrics.Throttles || 0,
        ColdStartDuration: metrics.ColdStartDuration || 0,
      });
    } catch (error) {
      console.error('Error getting metrics', error);
    }
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  useEffect(() => {
    console.log('Selected function changed:', selectedFunction);
    if (selectedFunction) {
      fetchFunctionMetrics(selectedFunction);
    }
  }, [selectedFunction]);

  const handleFunctionChange = (event) => {
    setSelectedFunction(event.target.value);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Function Detail</h1>

      <div className='mt-4 pb-2'>
        <select
          id='function-select'
          className='bg-gray-50 border border-gray-300 text-black-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-1'
          value={selectedFunction}
          onChange={handleFunctionChange}
        >
          <option value=''>Select a Function</option>
          {functions.map((func, index) => (
            <option key={index} value={func.name}>
              {func.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap gap-6 mt-8'>
        <MetricCard
          title={
            <div className='flex items-center space-x-2'>
              <BoltIcon className='w-6 h-6 text-gray-400' />
              <span>Total Invocations</span>
            </div>
          }
          metric={metrics.Invocations}
        >
          {' '}
        </MetricCard>
        <MetricCard
          title={
            <div className='flex items-center space-x-2'>
              <ExclamationTriangleIcon className='w-6 h-6 text-gray-400' />
              <span>Error Rate</span>
            </div>
          }
          metric={`${metrics.Errors} %`}
        >
          {' '}
        </MetricCard>
        <MetricCard
          title={
            <div className='flex items-center space-x-2'>
              <ExclamationCircleIcon className='w-6 h-6 text-gray-400' />
              <span>Throttles</span>
            </div>
          }
          metric={`${metrics.Throttles}`}
        >
          {' '}
        </MetricCard>
        <MetricCard
          title={
            <div className='flex items-center space-x-2'>
              <ClockIcon className='w-6 h-6 text-gray-400' />
              <span>Cold Start</span>
            </div>
          }
          metric={metrics.ColdStartDuration}
        >
          {' '}
        </MetricCard>
      </div>
      <div className='flex gap-6 mt-8'>
        <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
          <Chart
            key={metrics.Invocations} // Force re-render
            title='Invocations'
            data={[{ time: new Date(), value: metrics.Invocations }]}
            color={'blue'}
            yLabel={'Count'}
          />
        </div>
        <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
          <Chart
            key={metrics.ColdStartDuration} //  Force re-render
            title='Duration'
            data={[{ time: new Date(), value: metrics.ColdStartDuration }]}
            color={'green'}
            yLabel={'Milliseconds'}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionPage;
