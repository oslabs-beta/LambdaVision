/*

import the four metric card components 

for the metric card component, description not needed, metric part: variable for try and catch 


add side bar that Darren is working on 
Tiara will be message us on the chart to be placed in the overview page

*/

import React from 'react';
import Header from './Header';
import Chart from './Chart';
import Sidebar from './Sidebar';
import MetricCard from './MetricCard';
import ErrorTable from './ErrorTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Chart />
      <Sidebar />
      <MetricCard title="Total Invocations" metric="24,521" description="+12.3% vs last period" > </MetricCard>
      <ErrorTable  />
    </div>
  );
}

export default App;



