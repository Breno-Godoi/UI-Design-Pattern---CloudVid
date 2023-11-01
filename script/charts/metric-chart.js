// Sample data for the Metric Chart
const metricChartData = {
    title: "Average Watch Time",
    value: "8 min 27 sec",
    description: "This chart represents the average watch time per video.",
  };
  
  // Dimensions for the chart
  const width = 400;
  const height = 150;
  
  // Create an SVG container for the Metric Chart
  const svg = d3.select('#metricChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Create the Metric Chart
  const chart = svg.append('g');
  
  // Add the chart title
  chart.append('text')
    .text(metricChartData.title)
    .attr('class', 'chart-title')
    .attr('x', width / 2)
    .attr('y', 30)
    .attr('text-anchor', 'middle');
  
  // Add the chart value
  chart.append('text')
    .text(metricChartData.value)
    .attr('class', 'chart-value')
    .attr('x', width / 2)
    .attr('y', 80)
    .attr('text-anchor', 'middle');
  
  // Add the chart description
  chart.append('text')
    .text(metricChartData.description)
    .attr('class', 'chart-description')
    .attr('x', width / 2)
    .attr('y', 120)
    .attr('text-anchor', 'middle');
  