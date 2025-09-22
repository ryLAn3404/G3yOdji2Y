// 代码生成时间: 2025-09-22 15:06:37
// Ensure strict mode is enabled for this script
"use strict";

// The main function that initializes the D3 layout
function initResponsiveD3Layout(selector) {
  // Ensure that a valid selector is provided
  if (!selector) {
    console.error("Error: selector must be provided for D3 layout initialization.");
    return;
  }

  // Get the container element
  const container = d3.select(selector);

  // Calculate the container dimensions
  const width = +container.node().offsetWidth;
  const height = +container.node().offsetHeight;

  // Create a responsive SVG element
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('display', 'block');

  // Example D3 layout - a simple circle
  svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', Math.min(width, height) / 3)
    .style('fill', 'teal');

  // Listen for window resize events to update the SVG dimensions
  window.addEventListener('resize', () => {
    const newWidth = +container.node().offsetWidth;
    const newHeight = +container.node().offsetHeight;

    // Update SVG dimensions
    svg.attr('width', newWidth)
      .attr('height', newHeight)
      .attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
  });
}

// Usage: Call the function with the desired container selector
// initResponsiveD3Layout('#myD3Container');