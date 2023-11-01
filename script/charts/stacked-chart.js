import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the stacked chart
const stackedChartData = [
  {
    date: "2015-01-01",
    apples: 3840,
    bananas: 1920,
    cherries: 960,
    durians: 400,
  },
  {
    date: "2015-02-01",
    apples: 1600,
    bananas: 1440,
    cherries: 960,
    durians: 400,
  },
  {
    date: "2015-03-01",
    apples: 640,
    bananas: 960,
    cherries: 640,
    durians: 400,
  },
  {
    date: "2015-04-01",
    apples: 320,
    bananas: 480,
    cherries: 640,
    durians: 400,
  },
  // Add more data points here
];

// Dimensions and margins for the chart
const width = 600;
const height = 400;
const margin = { top: 25, right: 40, bottom: 80, left: 80 };

// Create an SVG container
const svg = d3
  .select("#stackedChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Add a title
svg
  .append("text")
  .text("Stacked Chart")
  .attr("x", width / 2)
  .attr("y", margin.top - 10)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("fill", "black");

// Create a group element for the chart area with margins
const chart = svg
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the date format
const parseDate = d3.timeParse("%Y-%m-%d");

// Stack the data
const series = d3
  .stack()
  .keys(["apples", "bananas", "cherries", "durians"])
  .value((d, key) => d[key])
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone)(stackedChartData);

// Scales
const x = d3
  .scaleBand()
  .domain(stackedChartData.map((d) => d.date))
  .range([0, width - margin.left - margin.right])
  .padding(0.1);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
  .nice()
  .range([height - margin.bottom, margin.top]);

// Create a color scale with custom colors
const color = d3
  .scaleOrdinal()
  .domain(["apples", "bananas", "cherries", "durians"])
  .range(["#d16b42", "#91C07D", "#946E45", "#D8BA8E"]);

// Create the chart elements
chart
  .selectAll("g")
  .data(series)
  .enter()
  .append("g")
  .attr("fill", (d) => color(d.key))
  .selectAll("rect")
  .data((d) => d)
  .enter()
  .append("rect")
  .attr("x", (d) => x(d.data.date))
  .attr("y", (d) => y(d[1]))
  .attr("height", (d) => y(d[0]) - y(d[1]))
  .attr("width", x.bandwidth());

// Add x and y axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

chart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis)
  .selectAll("text") // Select all the tick text elements
  .attr("transform", "rotate(15)") // Rotate the text to 15 degrees
  .style("text-anchor", "start") // Adjust text anchor
  .style("font-size", "10px") // Optionally adjust font size
  
chart
  .append("g")
  .attr("class", "y-axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -50) // Adjust the distance from the axis
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Value"); // Y-axis label
