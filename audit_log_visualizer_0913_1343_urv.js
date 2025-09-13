// 代码生成时间: 2025-09-13 13:43:10
 * It features error handling and follows best practices for code maintainability and expandability.
 */

// Define the width and height of the SVG container
const width = 800;
const height = 600;

// Define the margins for the SVG container
const margin = { top: 20, right: 30, bottom: 40, left: 50 };

// Calculate the inner width and height for the SVG element
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Define the color scale for different log levels
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create the SVG container
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Define the x and y scales
const x = d3.scaleTime().range([0, innerWidth]);
const y = d3.scaleLinear().range([innerHeight, 0]);

// Define the axis generators
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

// Append the x and y axes to the SVG
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + innerHeight + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

// Function to draw the log entries as bars
function drawLogEntries(data) {
    // Define the domain of the scales based on the data
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain([0, d3.max(data, d => d.severity)]);

    // Bind the data to the rectangles and append them to the SVG
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.timestamp))
        .attr('y', d => y(d.severity))
        .attr('width', 10)
        .attr('height', d => innerHeight - y(d.severity))
        .attr('fill', d => color(d.severity));

    // Add tooltip functionality (using simple HTML for demonstration)
    bars.on('mouseover', function(event, d) {
        const tooltip = document.createElement('div');
        tooltip.innerHTML = `Timestamp: ${d.timestamp}<br>Severity: ${d.severity}`;
        document.body.appendChild(tooltip);
        tooltip.style.left = event.clientX + 'px';
        tooltip.style.top = event.clientY + 'px';
    });

    bars.on('mouseout', function() {
        document.body.removeChild(document.querySelector('div'));
    });
}

// Function to load and process the audit log data
function loadAuditLogData(url) {
    d3.json(url)
        .then(data => {
            // Process the data (e.g., convert timestamps to Date objects)
            data.forEach(d => {
                d.timestamp = new Date(d.timestamp);
            });

            // Draw the log entries
            drawLogEntries(data);
        })
        .catch(error => {
            console.error('Error loading audit log data:', error);
        });
}

// Usage: loadAuditLogData('path/to/audit_log.json');

// Add error handling for loading data
d3.json('path/to/audit_log.json')
    .then(data => {
        if (data.error) {
            throw new Error(data.message);
        }
        // Call the function to draw the log entries
        drawLogEntries(data);
    })
    .catch(error => {
        console.error('Failed to load data:', error);
    });