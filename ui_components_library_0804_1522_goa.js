// 代码生成时间: 2025-08-04 15:22:59
 * It aims to be clear, maintainable, and extensible.
 */

// Utility function to create a simple component with error handling
function createComponent(selector, componentFn) {
    try {
        // Check if D3 is available
        if (typeof d3 !== 'object') {
            throw new Error('D3.js is not loaded.');
        }
        
        // Check if the selector is valid
        if (typeof selector !== 'string') {
            throw new Error('Invalid selector provided.');
        }
        
        // Get the SVG or HTML element where the component will be appended
        const element = d3.select(selector);
        if (element.empty()) {
            throw new Error('Selector does not match any element.');
        }
        
        // Create the component
        componentFn(element);
    } catch (error) {
        console.error('Failed to create component:', error.message);
    }
}

// Button component
function createButton(selector, options) {
    // Define default options
    const defaults = {
        label: 'Click Me',
        onClick: () => console.log('Button clicked!')
    };
    
    // Merge options with defaults
    const opts = {...defaults, ...options};
    
    // Create the SVG rectangle for the button
    const button = d3.select(selector).append('rect')
        .attr('width', 100)
        .attr('height', 50)
        .attr('fill', 'lightblue')
        .attr('rx', 8) // Rounded corners
        .attr('ry', 8)
        .attr('class', 'button')
        .on('click', opts.onClick);
    
    // Add text to the button
    button.append('text')
        .attr('x', 50)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text(opts.label);
}

// Slider component
function createSlider(selector, options) {
    // Define default options
    const defaults = {
        min: 0,
        max: 100,
        value: 50,
        onChange: () => console.log('Slider value changed!')
    };
    
    // Merge options with defaults
    const opts = {...defaults, ...options};
    
    // Create the SVG line for the slider track
    const slider = d3.select(selector).append('line')
        .attr('x1', 0)
        .attr('y1', 50)
        .attr('x2', 200)
        .attr('y2', 50)
        .attr('stroke', 'black')
        .attr('stroke-width', 4);
    
    // Create the SVG circle for the slider thumb
    const thumb = slider.append('circle')
        .attr('cx', opts.value * 2) // Scale value to position
        .attr('cy', 50)
        .attr('r', 12)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .call(d3.drag().on('drag', (event) => {
            // Update thumb position based on drag event
            const x = event.x;
            thumb.attr('cx', x);
            // Update slider value and call onChange handler
            const value = Math.min(Math.max(x / 2, opts.min), opts.max);
            opts.onChange(value);
        }));
}

// Example usage
createComponent('#button-container', createButton);
createComponent('#slider-container', createSlider, {onChange: value => console.log('New value:', value)});