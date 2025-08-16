// 代码生成时间: 2025-08-17 02:46:03
 * It assumes that system metrics are available via an API endpoint.
 */

// Import necessary D3 modules
import * as d3 from 'd3';

// Constants
const API_ENDPOINT = '/api/system-metrics'; // Replace with the actual API endpoint
const REFRESH_INTERVAL = 5000; // Refresh interval in milliseconds

// DOM elements
const svgContainer = d3.select('#performance-chart'); // Container for the chart

// Initialize the chart dimensions and scales
const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = +svgContainer.attr('width') - margin.left - margin.right;
const height = +svgContainer.attr('height') - margin.top - margin.bottom;

// Create the SVG element
const svg = svgContainer.append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Define the X and Y scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Define the line generator
const line = d3.line()
  .x(d => x(d.timestamp))
  .y(d => y(d.value));

// Define the color scale for different metrics
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Initialize the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

// Set up the axes in the SVG
svg.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

svg.append('g')
  .call(yAxis);

// Function to fetch data and update the chart
function fetchData() {
  d3.json(API_ENDPOINT)
    .then(data => {
      // Update the domain of the scales
      x.domain(d3.extent(data, d => d.timestamp));
      y.domain([0, d3.max(data, d => d.value)]);

      // Select the line and update it with new data
      const path = svg.selectAll('path').data([data]);

      // Enter and update the line
      path.enter().append('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line)
        .merge(path)
        .transition()
        .duration(500)
        .attr('d', line);

      // Update the axes
      svg.selectAll('g').transition().duration(500).call(xAxis).call(yAxis);
    })
    .catch(error => {
      console.error('Error fetching system metrics:', error);
      // Handle the error appropriately, e.g., show a message to the user
    });
}

// Start fetching data and refresh every REFRESH_INTERVAL milliseconds
setInterval(fetchData, REFRESH_INTERVAL);

// Initial fetch to populate the chart
fetchData();