import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the pie chart
const pieChartData = [500, 300, 800, 200];
const pieChartColors = ["#d16b42", "#91C07D", "#946E45", "#D8BA8E"]; // Color labels

// Dimensions and margins for the chart
const width = 600;
const height = 400;
const marginTop = 45;
const marginRight = 30;
const marginBottom = 45;
const marginLeft = 30;
const radius = Math.min(width, 300) / 2;

// Create a color scale for the pie chart
const color = d3.scaleOrdinal().range(pieChartColors);

// Create the SVG container
const svg = d3
  .select('#pieChart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`);

// Create an initial pad angle
let padAngle = 0.05;

// Create a pie layout with the initial pad angle
const pie = d3.pie()
  .padAngle(padAngle) // Set the initial pad angle
  .sort(null);

// Create an arc generator
const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

// Create path elements for each slice
const piePaths = svg
  .selectAll('path')
  .data(pie(pieChartData))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', (d, i) => color(i));

// Add an event listener to the pad angle input
const padAngleInput = document.getElementById('padAngle');
const padAngleValue = document.getElementById('padAngleValue');

padAngleInput.addEventListener('input', function () {
  // Update the pad angle based on the slider value
  padAngle = +this.value;
  pie.padAngle(padAngle); // Update the pie layout

  // Update the pie chart with the new pad angle
  piePaths
    .data(pie(pieChartData))
    .transition() // Add a smooth transition for updating
    .duration(500) // Transition duration in milliseconds
    .attrTween('d', function (d) {
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  // Update the displayed pad angle value
  padAngleValue.textContent = padAngle.toFixed(2);
});

// Add a title
svg
  .append('text')
  .text('Pie Chart')
  .attr('x', 0)
  .attr('y', -180)
  .attr('text-anchor', 'middle')
  .style('font-size', '16px')
  .style('fill', 'black');

// Add color labels to the right
const legend = svg
  .selectAll('.legend')
  .data(pieChartColors)
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', (d, i) => `translate(${35},${i * 20})`);

legend
  .append('rect')
  .attr('x', 125)
  .attr('width', 10)
  .attr('height', 10)
  .attr('fill', (d, i) => color(i));

legend
  .append('text')
  .attr('x', 140)
  .attr('y', 10)
  .attr('text-anchor', 'start')
  .text((d) => d);
