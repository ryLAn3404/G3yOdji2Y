// 代码生成时间: 2025-09-03 08:35:20
// D3.js is required for this script to work. It should be included before this script.
// You can include it via CDN or as a module if you're using a module bundler.

(function() {
  // Define the SVG dimensions and margins
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Define the order processing stages
  const stages = ['Place Order', 'Process Order', 'Ship Order', 'Delivered'];

  // Create the SVG container
  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create the stage rectangles
  const stageRects = svg.selectAll('rect')
    .data(stages)
    .enter().append('rect')
    .attr('x', (d, i) => i * (width / stages.length))
    .attr('y', height / 2 - 20)
    .attr('width', width / stages.length)
    .attr('height', 40)
    .attr('fill', 'lightgray');

  // Create the stage labels
  const stageLabels = svg.selectAll('text')
    .data(stages)
    .enter().append('text')
    .attr('x', (d, i) => i * (width / stages.length) + (width / stages.length) / 2)
    .attr('y', height / 2 + 10)
    .text(d => d)
    .attr('text-anchor', 'middle');

  // Function to process an order
  function processOrder(order) {
    try {
      // Simulate order processing with a simple loop
      let currentStage = 0;
      const process = setInterval(() => {
        if (currentStage < stages.length) {
          stageRects.transition().duration(1000)
            .attr('fill', (d, i) => i <= currentStage ? 'green' : 'lightgray');
          stageLabels.transition().duration(1000)
            .attr('fill', (d, i) => i <= currentStage ? 'white' : 'black');
          currentStage++;
        } else {
          clearInterval(process);
          console.log('Order processed successfully:', order);
        }
      }, 1500);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  }

  // Example usage: Process an order
  const order = { id: 123, details: 'Example order' };
  processOrder(order);

  // Expose the processOrder function to allow external calls
  window.processOrder = processOrder;

})();