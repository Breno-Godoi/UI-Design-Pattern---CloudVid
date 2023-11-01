import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the scatter plot
const scatterPlotData = [
  { x: 10, y: 20, label: 'Data Point 1' },
  { x: 30, y: 40, label: 'Data Point 2' },
  { x: 50, y: 10, label: 'Data Point 3' },
  { x: 70, y: 60, label: 'Data Point 4' },
  { x: 90, y: 30, label: 'Data Point 5' },
];

// Dimensions and margins for the chart
const width = 400;
const height = 400;
const margin = { top: 20, right: 20, bottom: 60, left: 60 }; // Increased bottom margin

// Create an SVG container
const svg = d3
  .select('#scatterPlot')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create scales for x and y axes
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(scatterPlotData, (d) => d.x)])
  .range([margin.left, width - margin.right]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(scatterPlotData, (d) => d.y)])
  .range([height - margin.bottom, margin.top]);

// Create the circles for data points
const circles = svg
  .selectAll('circle')
  .data(scatterPlotData)
  .enter()
  .append('circle')
  .attr('cx', (d) => xScale(d.x))
  .attr('cy', (d) => yScale(d.y))
  .attr('r', 8) // Radius of the circles
  .attr('fill', '#91C07D');

// Create x and y axes
svg
  .append('g')
  .attr('transform', `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale))
  .append('text')
  .text('X Axis Label') // X-axis label
  .attr('x', width / 2)
  .attr('y', 35)
  .attr('text-anchor', 'middle')
  .style('fill', 'black');

svg
  .append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(yScale))
  .append('text')
  .text('Y Axis Label') // Y-axis label
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -45)
  .attr('text-anchor', 'middle')
  .style('fill', 'black');

// Chart title
svg
  .append('text')
  .text('Scatter Plot Chart') // Chart title
  .attr('x', width / 2)
  .attr('y', 20)
  .attr('text-anchor', 'middle')
  .style('font-size', '16px')
  .style('fill', 'black');

// Create a brush for highlighting and brushing
const brush = d3
  .brush()
  .extent([
    [margin.left, margin.top],
    [width - margin.right, height - margin.bottom],
  ])
  .on('brush', brushed);

// Append the brush to the scatter plot
svg.append('g').call(brush);

function brushed(event) {
  const selection = event.selection;
  if (selection) {
    // Highlight the selected circles
    circles.classed('highlighted', (d) => {
      const x = xScale(d.x);
      const y = yScale(d.y);
      return x >= selection[0][0] && x <= selection[1][0] && y >= selection[0][1] && y <= selection[1][1];
    });
  } else {
    // Remove highlighting
    circles.classed('highlighted', false);
  }
}