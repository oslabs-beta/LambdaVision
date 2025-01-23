import React from "react";
import MetricCard from "./MetricCard";
import Chart from "./Chart";
import ErrorLog from "./ErrorLog";

const styles = {
 MetricContainer: {
   display: "flex",
   flexWrap: "wrap",
   gap: "16px",
 },
 ChartsContainer: {
   display: "flex",
   justifyContent: "space-between",
   flexWrap: "nowrap",
   gap: "10px",
   padding: "20px",
 },
 Chart: {
   flex: "1 1 48%",
   minWidth: "300px",
   padding: "20px",
   border: "2px solid #ccc",
   borderRadius: "5px",
   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
 },
};
//sample data
const data = [
 { date: "2023-01-01", value: 30 },
 { date: "2023-02-01", value: 80 },
 { date: "2023-03-01", value: 45 },
 { date: "2023-04-01", value: 60 },
 { date: "2023-05-01", value: 20 },
 { date: "2023-06-01", value: 90 },
 { date: "2023-07-01", value: 55 },
];
const errorData = [
 {
   time: "2024-01-01 10:00",
   error: "Timeout",
   message: "Function execution exceeded time limit",
   duration: "85ms",
   action: "Details",
 },
 {
   time: "2024-01-02 11:15",
   error: "Memory Limit Exceeded",
   message: "Function used more memory than allocated",
   duration: "150ms",
   action: "Details",
 },
 {
   time: "2024-01-03 14:00",
   error: "Invalid Input",
   message: "Received unexpected input parameters",
   duration: "120ms",
   action: "Details",
 },
];
const FunctionPage = () => {
 return (
   <div>
     <div className="MetricContainer" style={styles.MetricContainer}>
       <MetricCard
         title="Total Invocations"
         metric="24,521"
         description="+12.3% vs last period"
       >
         {" "}
       </MetricCard>
       <MetricCard
         title="Success Rate"
         metric="99.2%"
         description="-0.1% vs last period"
       >
         {" "}
       </MetricCard>
       <MetricCard
         title="Avg. Duration"
         metric="245ms"
         description="+5ms vs last period"
       >
         {" "}
       </MetricCard>
       <MetricCard
         title="Cold Starts"
         metric="142"
         description="-23% vs last period"
       >
         {" "}
       </MetricCard>
     </div>
     <div className="ChartsContainer" style={styles.ChartsContainer}>
       <div style={styles.Chart}>
         <Chart title="Execution Duration" data={data} color={"blue"} />
       </div>
       <div style={styles.Chart}>
         <Chart title="Memory Usage" data={data} color={"green"} />
       </div>
     </div>
     <div>
       <ErrorLog errors={errorData} />
     </div>
   </div>
 );
};


export default FunctionPage;
