import React from "react";
const styles = {
 metricCard: {
   backgroundColor: "white",
   borderRadius: "5px",
   width: "20%",
   boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
   padding: "20px", 
 },
 title: {
   color: "gray",
   fontSize: "16px",
   paddingTop: "15px",
   paddingBottom: "0",
   margin: "5px",
 },
 h1: {
   fontSize: "30px",
   padding: "0",
   margin: "5px",
 },
 description: {
   color: "gray",
   fontSize: "15px",
   paddingBottom: "15px",
   marginBottom: "0px",
 },
};


const MetricCard = ({title, metric, description}) => {
    return(
<div style={styles.metricCard}>
    <p id="title" style={styles.title}>
        {title}
    </p>
    <h1 style={styles.h1}>
        {metric}
    </h1>
    <p id="description" style={styles.description}> {description}</p>
</div>
    );
}

export default MetricCard;
