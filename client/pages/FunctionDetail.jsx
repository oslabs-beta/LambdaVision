import React, { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import Chart from '../components/Chart';
import ErrorLog from '../components/ErrorLog';
import axios from 'axios';

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
      const response = await axios.get(
        'http://localhost:3000/api/lambda/total-functions'
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
      const response = await axios.get(
        `http://localhost:3000/api/lambda/functions/${functionName}/metrics`
      );
      setMetrics(response.data);
    } catch (error) {
      console.error('Error getting metrics', error);
    }
  };
  //Error Logs
  // const fetchErrorLogs = async () => {
  //   try {
  //     const response = await axios.get(
  //       ''
  //     );
  //     setErrorLogs(response.data.errorLogs);
  //   } catch (error) {
  //     console.error('Error getting metrics', error);
  //   }
  // };

  useEffect(() => {
    fetchFunctions();
  }, []);

  useEffect(() => {
    if (selectedFunction) {
      fetchFunctionMetrics(selectedFunction);
    }
  }, [selectedFunction]);

  const handleFunctionChange = (event) => {
    setSelectedFunction(event.target.value);
  };

  //create an array for throttles data
  const invocationsData = [
    {
      time: new Date(),
      value: metrics.Invocations,
    },
  ];

  //create an array for invocations data

  const durationData = [
    {
      time: new Date(),
      value: metrics.ColdStartDuration,
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800'>Function Detail</h1>

      <div className='mt-4 pb-2'>
        <select
          id='function-select'
          class='bg-gray-50 border border-gray-300 text-black-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-1'
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
      <div className='flex flex-wrap gap-4'>
        <MetricCard
          title='Total Invocations'
          metric={metrics.Invocations}
          // description='+12.3% vs last period'
        >
          {' '}
        </MetricCard>
        <MetricCard
          title='Error Rate'
          metric={`${metrics.Errors} %`}
          // description='-0.1% vs last period'
        >
          {' '}
        </MetricCard>
        <MetricCard
          title='Throttles'
          metric={`${metrics.Throttles}`}
          // description='+5ms vs last period'
        >
          {' '}
        </MetricCard>
        <MetricCard
          title='Cold Starts'
          metric={metrics.ColdStartDuration}
          // description='-23% vs last period'
        >
          {' '}
        </MetricCard>
      </div>
      <div className='flex gap-4 p-5'>
        <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
          <Chart
            title='Invocations'
            data={invocationsData}
            color={'blue'}
            yLabel={'Count'}
          />
        </div>
        <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
          <Chart
            title='Duration'
            data={durationData}
            color={'green'}
            yLabel={'Milliseconds'}
          />
        </div>
      </div>
      <div>{/* <ErrorLog /> */}</div>
    </div>
  );
};

export default FunctionPage;
