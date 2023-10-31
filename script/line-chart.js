import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the line chart
const lineChartData = [
  { x: "2023-01-01", y: 20 },
  { x: "2023-02-01", y: 25 },
  { x: "2023-03-01", y: 18 },
  { x: "2023-04-01", y: 30 },
  { x: "2023-05-01", y: 22 },
  { x: "2023-06-01", y: 28 }
];

// Dimensions and margins for the chart
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Create the x (horizontal position) scale
const x = d3.scaleUtc()
  .domain([new Date("2023-01-01"), new Date("2023-06-01")])
  .range([marginLeft, width - marginRight]);

// Create the y (vertical position) scale
const y = d3.scaleLinear()
  .domain([0, d3.max(lineChartData, (d) => d.y)])
  .range([height - marginBottom, marginTop]);

// Create the line function to plot the data points
const line = d3.line()
  .x((d) => x(new Date(d.x)))
  .y((d) => y(d.y));

// Create the SVG container
const svg = d3.create("svg")
  .attr("width", width)
  .attr("height", height);

// Add the x-axis
svg.append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(d3.axisBottom(x));

// Add the y-axis
svg.append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y));

// Create the line chart path
svg.append("path")
  .datum(lineChartData)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

// Append the SVG element to an HTML container
document.getElementById("lineChart").appendChild(svg.node());
