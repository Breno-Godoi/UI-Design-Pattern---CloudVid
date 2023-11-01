import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Sample data
const barChartData = [
  { category: "Category 1", value: 10 },
  { category: "Category 2", value: 25 },
  { category: "Category 3", value: 15 },
  { category: "Category 4", value: 30 },
  { category: "Category 5", value: 20 },
];

const margin = { top: 45, right: 30, bottom: 40, left: 45 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
  .select("#barChart") // This selector should match the id in the HTML
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Add a title
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", -15)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Bar Chart Title");

// Add x-axis label
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("X-Axis Label");

// Add y-axis label
svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -30)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Y-Axis Label");

const xScale = d3
  .scaleBand()
  .domain(barChartData.map((d) => d.category))
  .range([0, width])
  .padding(0.1);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(barChartData, (d) => d.value)])
  .nice()
  .range([height, 0]);

svg
  .selectAll("rect")
  .data(barChartData)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(d.category))
  .attr("y", (d) => yScale(d.value))
  .attr("width", xScale.bandwidth())
  .attr("height", (d) => height - yScale(d.value))
  .attr("fill", "#91C07D");

svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale));

svg.append("g").call(d3.axisLeft(yScale));
