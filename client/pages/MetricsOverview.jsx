
import React from "react";
import Chart from "../components/Chart";
import MetricCard from "../components/MetricCard";
import ErrorTable from "../components/ErrorTable";

const MetricsOverview = () => {
  return (
    <div className="App flex">
      <div className="flex-1">
        <div className="p-6 space-y-6">
          {/* Metrics Summary Section */}
          <div className= "flex flex-wrap gap-4">    {/*"grid grid-cols-1 md:grid-cols-4 gap-6"*/}
            <MetricCard title="Total Functions" metric="24" />
            <MetricCard title="Total Invocations" metric="1.2M" />
            <MetricCard title="Avg. Execution Time" metric="245ms" />
            <MetricCard title="Error Rate" metric="0.02%" />
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



