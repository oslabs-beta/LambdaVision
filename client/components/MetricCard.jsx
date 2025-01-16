import React from "react";


const MetricCard = ({title, metric, description}) => {
    return(
<div>
    <p id="title">
        {title}
    </p>
    <h1>
        {metric}
    </h1>
    <p id="description"> {description}</p>
</div>
    );
}

export default MetricCard;
