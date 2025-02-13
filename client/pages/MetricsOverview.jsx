
import React from "react";
import Chart from "../components/Chart";
import MetricCard from "../components/MetricCard";

import {useState, useEffect} from 'react' 
import axios from 'axios'

 
const MetricsOverview = () => {
  const[metrics, setMetrics] = useState([
    {totalFunctions: 0, totalInvocations:0, totalErrors:0, errorRate:0, averageDuration: 0},
  ]);
  const [functionMetrics, setFunctionMetrics] = useState({
    functionName: '',
    Invocations: 0,
    Errors: 0,
    Throttles: 0,
    ColdStartDuration: 0,
  });
  
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage or wherever it is stored
  console.log('Token:', token);


  const fetchMetrics = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/lambda/total-metrics', {
          headers: {
        Authorization: `Bearer ${token}`
      }
        });
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
    <div className="App flex">
      <div className="flex-1">
        <div className="p-6 space-y-6">
   
          <div className= "flex flex-wrap gap-4">    

          <MetricCard
          title='Total Functions'
          metric={metrics.totalFunctions}
        ></MetricCard>

          <MetricCard
          title='Total Invocations'
          metric={metrics.totalInvocations}
        ></MetricCard>

            <MetricCard
          title='Total Errors'
          metric={metrics.totalErrors}
        ></MetricCard>

    

        <MetricCard
          title='Average Duration'
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
     <table className="border-collapse mt-5 border border-gray-300 bg-white w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Function Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Invocations</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Errors</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Cold Start Duration</th>
            </tr>
          </thead>
          <tbody>
           {functionMetrics.functionName ? (
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">{functionMetrics.functionName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{functionMetrics.Invocations}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{functionMetrics.Errors}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{functionMetrics.ColdStartDuration}</td>
                  </tr>
                
              ) : (
                <tr>
                  <td colSpan="4" className="border border-gray-300 p-2 text-center">
                    No function metrics available
                  </td>
                </tr>
              )}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;




