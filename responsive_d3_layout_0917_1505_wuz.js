// 代码生成时间: 2025-09-17 15:05:20
// responsive_d3_layout.js
// This script creates a responsive layout using D3.js

// Import D3.js
const d3 = require('d3');

/**
 * Function to create a responsive layout
 * @param {string} selector - The CSS selector for the SVG container
 * @param {number} width - The width of the SVG
 * @param {number} height - The height of the SVG
 */
function createResponsiveLayout(selector, width, height) {
    // Check if the selector is valid
    if (!selector || typeof selector !== 'string') {
        throw new Error('Invalid selector provided');
    }

    // Create the SVG element with a responsive viewBox
    const svg = d3.select(selector)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', '100%')
        .attr('height', '100%')
        .style('max-width', '100%')
        .style('height', 'auto');

    // Add a group for the chart elements to ensure they scale correctly
    const chart = svg.append('g');

    // Function to update the chart size based on the parent container size
    function resize() {
        const newWidth = parseInt(d3.select(selector).style('width')) || width;
        const newHeight = parseInt(d3.select(selector).style('height')) || height;

        // Update the SVG dimensions to match the container size
        svg.attr('viewBox', `0 0 ${newWidth} ${newHeight}`)
            .attr('width', newWidth)
            .attr('height', newHeight);

        // Update the chart dimensions
        chart.attr('transform', `translate(${newWidth / 2}, ${newHeight / 2})`);
    }

    // Listen for window resize events
    window.addEventListener('resize', resize);

    // Initial resize to set the chart size correctly
    resize();

    // Return the chart and SVG elements for further manipulation
    return { chart, svg };
}

// Example usage
try {
    const { chart, svg } = createResponsiveLayout('#chart-container', 800, 600);
    // Add your chart elements here using chart.append()
} catch (error) {
    console.error('Error creating responsive layout:', error);
}