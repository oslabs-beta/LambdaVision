import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ title, data, color, yLabel }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return; // Prevent rendering if data is empty
    // Clear the container before rendering
    d3.select(svgRef.current).selectAll('*').remove();

    // Margins and chart dimensions
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Parse the date and value from the data
    const parseData = data.map((d) => ({
      time: new Date(d.time),
      value: +d.value || 0,
    }));

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis: time scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(parseData, (d) => d.time))
      .range([0, width]);

    const xAxis = d3
      .axisBottom(x)
      .ticks(d3.timeMinute.every(5))
      .tickFormat(d3.timeFormat('%H:%M'));

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle') // Center align labels
      .attr('transform', 'rotate(-30)') // Rotate for better readability
      .style('font-size', '12px')
      .style('fill', 'black'); // Ensure labels are visible
  

      
    // Y axis: linear scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parseData, (d) => d.value)])
      .range([height, 0]);

    svg
      .append('g')
      .call(
        d3
          .axisLeft(y)
          .tickFormat((d) => (yLabel === 'Milliseconds' ? `${d} ms` : d))
      );

    const line = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.value));

    // Add the line

    svg
      .append('path')
      .datum(parseData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add dots for each data point
    svg
      .selectAll('.dot')
      .data(parseData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.time)) // map time to x position
      .attr('cy', (d) => y(d.value)) //map value to y position
      .attr('r', 4) // Dot size
      .attr('fill', color);

    // Add Y-Axis Label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -60)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', 'black')
      .text(yLabel);
  }, [data, color, yLabel]);

  return (
    <div>
      <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>
      <svg ref={svgRef} width={460} height={400}></svg>
    </div>
  );
};

export default Chart;
