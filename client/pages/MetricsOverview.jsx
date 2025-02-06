
import React from "react";
import Chart from "../components/Chart";
import MetricCard from "../components/MetricCard";
import ErrorTable from "../components/ErrorTable";
import {useState, useEffect} from 'react' 
import axios from 'axios'

    {/* MetricsOverview REACT Section */}
const MetricsOverview = () => {
  const[metrics, setMetrics] = useState([
    {Invocations: 0, Errors:0, throttles:'0ms', ColdStartDuration:0},
  ]);
  
  {/* MetricsOverview FUNCTION Section */}


  const fetchFunctionMetrics = async (f) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lambda/total-metrics`);
        setMetrics(response.data);
    } catch (error) {
      console.error('There was an error getting metrics information', error);
    }
  };
  useEffect(() => {
  fetchFunctionMetrics();}, []);


  return (
    <div className="App flex">
      <div className="flex-1">
        <div className="p-6 space-y-6">
          {/* Metrics Summary Section */}
          <div className= "flex flex-wrap gap-4">    {/*"grid grid-cols-1 md:grid-cols-4 gap-6"*/}

          <MetricCard
          title='Total Invocations'
          metric={metrics.Invocations}
        ></MetricCard>

          <MetricCard
          title='Error Rate'
          metric={metrics.Errors}
        ></MetricCard>

            <MetricCard
          title='Throttle Times'
          metric={metrics.throttles}
        ></MetricCard>

            <MetricCard
          title='Cold Start Times'
          metric={metrics.ColdStartDuration}
        ></MetricCard>

        </div>


          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Chart title="Invocations Trend" />
            <Chart title="Error Rate Trend" />
          </div>

          {/* Lambda Functions Table */}
          <ErrorTable />
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;




