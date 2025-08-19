// 代码生成时间: 2025-08-20 00:25:36
const width = 960;
const height = 500;

// Function to create a responsive SVG
function createResponsiveSVG(container) {
  const svg = d3.select(container)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .classed('svg-content-responsive', true);

  return svg;
}

// Function to handle window resize
function handleResize() {
  const svg = d3.select('.svg-content-responsive');
  if (!svg.empty()) {
    const bounds = svg.node().getBoundingClientRect();
    if (bounds.width !== width) {
      width = bounds.width;
      svg.attr('width', width);
    }
  }
}

// Attach resize event listener
window.addEventListener('resize', handleResize);

// Initialize the layout
document.addEventListener('DOMContentLoaded', function() {
  try {
    const svg = createResponsiveSVG('#chart');
    // Add your D3 visualization code here

  } catch (error) {
    console.error('Error initializing responsive layout:', error);
  }
});

// Example usage of D3 in the SVG
// This function should be replaced with your actual D3 visualization code
function addSampleVisualization(svg) {
  // For demonstration, let's just add a simple circle
  svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 50)
    .style('fill', 'steelblue');
}

// Uncomment the line below to add the sample visualization when the script is run
// addSampleVisualization(svg);
