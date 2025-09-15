// 代码生成时间: 2025-09-16 02:12:28
// A simple function to handle window resize events
// and update the layout accordingly.
function resizeLayout() {
    // Retrieve the width and height of the SVG element
    const svgWidth = document.getElementById('svg-container').clientWidth;
    const svgHeight = document.getElementById('svg-container').clientHeight;

    // Update the dimensions of the SVG element
    d3.select('#svg-container').selectAll('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
}

// Initialize the SVG container with a default size
// and add event listeners for window resize.
function initResponsiveLayout() {
    const svgWidth = 960; // Default width
    const svgHeight = 500; // Default height

    // Create the SVG element
    const svg = d3.select('#svg-container')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // Add a resize event listener to the window
    window.addEventListener('resize', resizeLayout);

    // Call the initial resize layout function
    resizeLayout();
}

// Call the initialization function when the script loads
document.addEventListener('DOMContentLoaded', initResponsiveLayout);