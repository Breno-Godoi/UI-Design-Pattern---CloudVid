import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the donut chart
const donutChartData = [500, 300, 800, 200];
const donutChartColors = ["#d16b42", "#91C07D", "#946E45", "#D8BA8E"];

// Dimensions and margins for the chart
const width = 600;
const height = 400;
const marginTop = 45;
const marginRight = 30;
const marginBottom = 45;
const marginLeft = 30;
const radius = Math.min(width, 300) / 2;

// Create a color scale for the donut chart using the same colors as the pie chart
const color = d3.scaleOrdinal().range(donutChartColors);

// Create the SVG container for the donut chart
const svg = d3
  .select('#donutChart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`);

// Create a pie layout for the donut chart
const pie = d3.pie().sort(null);

// Set inner and outer radii to create a hole in the center for the donut chart
const arc = d3.arc()
  .innerRadius(radius * 0.6) // Adjust this value for the size of the hole
  .outerRadius(radius);

// Create path elements for each slice in the donut chart
const donutPaths = svg
  .selectAll('path')
  .data(pie(donutChartData))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', (d, i) => color(i));

// Add a title
svg
  .append('text')
  .text('Donut Chart')
  .attr('x', 0)
  .attr('y', -180)
  .attr('text-anchor', 'middle')
  .style('font-size', '16px')
  .style('fill', 'black');

// Add color labels to the right
const legend = svg
  .selectAll('.legend')
  .data(donutChartColors)
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', (d, i) => `translate(${180},${i * 20})`);

legend
  .append('rect')
  .attr('x', -15)
  .attr('width', 10)
  .attr('height', 10)
  .attr('fill', (d, i) => color(i));

legend
  .append('text')
  .attr('x', 0)
  .attr('y', 10)
  .attr('text-anchor', 'start')
  .text((d) => d);
