import React, {useState} from 'react';
import MetricCard from '../components/MetricCard';
import Chart from '../components/Chart';
import ErrorLog from '../components/ErrorLog';

//sample data
const data = [
  { date: '2023-01-01', value: 30 },
  { date: '2023-02-01', value: 80 },
  { date: '2023-03-01', value: 45 },
  { date: '2023-04-01', value: 60 },
  { date: '2023-05-01', value: 20 },
  { date: '2023-06-01', value: 90 },
  { date: '2023-07-01', value: 55 },
];
const data2 = [
  { date: '2024-01-01', value: 128 },
  { date: '2024-02-01', value: 256 },
  { date: '2024-03-01', value: 512 },
  { date: '2024-04-01', value: 1024 },
  { date: '2024-05-01', value: 2048 },
  { date: '2024-06-01', value: 3072 },
  { date: '2024-07-01', value: 4096 },
  { date: '2024-08-01', value: 5120 },
  { date: '2024-09-01', value: 6144 },
];

const errorData = [
  {
    time: '2024-01-01 10:00',
    error: 'Timeout',
    message: 'Function execution exceeded time limit',
    duration: '85ms',
    action: 'Details',
  },
  {
    time: '2024-01-02 11:15',
    error: 'Memory Limit Exceeded',
    message: 'Function used more memory than allocated',
    duration: '150ms',
    action: 'Details',
  },
  {
    time: '2024-01-03 14:00',
    error: 'Invalid Input',
    message: 'Received unexpected input parameters',
    duration: '120ms',
    action: 'Details',
  },
];
  const functions = ['Function A', 'Function B', 'Function C', 'Function D'];
const FunctionPage = () => {
   const [selectedFunction, setSelectedFunction] = useState('');

   const handleFunctionChange = (event) => {
     setSelectedFunction(event.target.value);
   };

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800'>Function Detail</h1>

      <div className='mt-4 pb-2'>
        <select
          id='function-select'
          className='mt-2 p-2 pb-3 border border-gray-300 rounded-md w-1/2'
          value={selectedFunction}
          onChange={handleFunctionChange}
        >
          <option value=''>-- Select a Function --</option>
          {functions.map((func, index) => (
            <option key={index} value={func}>
              {func}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap gap-4'>
        <MetricCard
          title='Total Invocations'
          metric='24,521'
          description='+12.3% vs last period'
        >
          {' '}
        </MetricCard>
        <MetricCard
          title='Success Rate'
          metric='99.2%'
          description='-0.1% vs last period'
        >
          {' '}
        </MetricCard>
        <MetricCard
          title='Avg. Duration'
          metric='245ms'
          description='+5ms vs last period'
        >
          {' '}
        </MetricCard>
        <MetricCard
          title='Cold Starts'
          metric='142'
          description='-23% vs last period'
        >
          {' '}
        </MetricCard>
      </div>
      <div className='flex gap-4 p-5'>
        <div
          s
          className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'
        >
          <Chart title='Execution Duration' data={data} color={'blue'} />
        </div>
        <div className='flex-1 min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
          <Chart title='Memory Usage' data={data2} color={'green'} />
        </div>
      </div>
      <div>
        <ErrorLog errors={errorData} />
      </div>
    </div>
  );
};

export default FunctionPage;
