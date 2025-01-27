import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Chart = ({ title, data, color = "steelblue" }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear the container before rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // Margins and chart dimensions
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    if (!data || data.length === 0) return; // Prevent rendering if data is empty

    // Parse the date and value from the data
    const parseData = data.map((d) => ({
      date: d3.timeParse("%Y-%m-%d")(d.date),
      value: +d.value,
    }));

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis: time scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(parseData, (d) => d.date))
      .range([0, width]);

    const xAxis = d3
      .axisBottom(x)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%b %d"));

    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    // Y axis: linear scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parseData, (d) => d.value)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(parseData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.value))
      );
  }, [data, color]);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <svg ref={svgRef} width={460} height={400}></svg>
    </div>
  );
};

export default Chart;
