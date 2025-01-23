import React from "react";
const styles = {
 container: {
   margin: "20px",
   fontFamily: "Arial, sans-serif",
 },
 table: {
   width: "100%",
   borderCollapse: "collapse",
   marginTop: "20px",
   border: "1px solid #ddd",
 },
 h1: {
   textAlign: "left",
   fontSize: "23px",
   padding: "10px",
   color: "gray",
 },
 th: {
   color: "gray",
   padding: "12px",
   textAlign: "left",
   fontWeight: "bold",
   borderBottom: "2px solid #ddd",
 },
 td: {
   padding: "12px",
   textAlign: "left",
   borderBottom: "1px solid #f1f1f1",
 },
 trHover: {
   backgroundColor: "#f1f1f1",
   cursor: "pointer",
 },
 link: {
   color: "#007bff",
   textDecoration: "none",
 },
};
const ErrorLog = ({ errors }) => {
 return (
   <div>
     <table style={styles.table}>
       <thead>
         <h1 style={styles.h1}>Error Log</h1>
         <tr>
           <th style={styles.th}>Timestamp</th>
           <th style={styles.th}>Error Type</th>
           <th style={styles.th}>Message</th>
           <th style={styles.th}>Duration</th>
           <th style={styles.th}>Actions</th>
         </tr>
       </thead>
       <tbody>
         {errors.map((error, index) => (
           <tr key={index} style={styles.trHover}>
             <td style={styles.td}>{error.time}</td>
             <td style={styles.td}>{error.error}</td>
             <td style={styles.td}>{error.message}</td>
             <td style={styles.td}>{error.duration}</td>
             <td style={styles.td}>
               <a
                 href="#"
                 style={{ color: "#007bff", textDecoration: "none" }}
               >
                 {error.action}
               </a>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
};


export default ErrorLog;

export default ErrorTable;
