import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the single-value chart
const singleValueData = 75; // Replace with your data

// Dimensions for the chart
const width = 400;
const height = 300;

// Create an SVG container for the single-value chart
const svg = d3
  .select('#singleValueChart')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create a text element to display the single value
svg
  .append('text')
  .attr('x', width / 2)
  .attr('y', height / 2)
  .attr('text-anchor', 'middle')
  .attr('dy', '0.3em')
  .style('font-size', '2em')
  .text(singleValueData);
