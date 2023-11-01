import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data for the stacked chart
const stackedChartData = [
  {
    date: new Date("2015-01-01"),
    apples: 3840,
    bananas: 1920,
    cherries: 960,
    durians: 400,
  },
  {
    date: new Date("2015-02-01"),
    apples: 1600,
    bananas: 1440,
    cherries: 960,
    durians: 400,
  },
  {
    date: new Date("2015-03-01"),
    apples: 640,
    bananas: 960,
    cherries: 640,
    durians: 400,
  },
  {
    date: new Date("2015-04-01"),
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
const margin = { top: 20, right: 30, bottom: 30, left: 40 };

// Create an SVG container
const svg = d3
  .select("#stackedChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

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
  .range([margin.left, width - margin.right])
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
svg
  .append("g")
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

svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);

svg
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", `translate(${margin.left},0)`)
  .call(yAxis);
