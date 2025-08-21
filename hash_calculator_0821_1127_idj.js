// 代码生成时间: 2025-08-21 11:27:50
 * It calculates the hash of input strings using various algorithms.
 *
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

// Import necessary modules
const crypto = require('crypto'); // Node.js core module for cryptographic functions

/**
 * Calculates the hash of a given input string using the specified algorithm.
 *
 * @param {string} input - The string to calculate the hash of.
 * @param {string} algorithm - The hash algorithm to use. (e.g., 'sha256', 'md5', etc.)
 * @returns {string} The hash of the input string.
 */
function calculateHash(input, algorithm) {
  // Check if input and algorithm are provided
  if (!input || !algorithm) {
    throw new Error('Input and algorithm are required');
  }

  // Use crypto module to calculate the hash
  return crypto.createHash(algorithm).update(input).digest('hex');
}

/**
 * Sets up the D3-based UI for the hash calculator.
 * This function initializes the DOM elements and binds event handlers.
 */
function setupUI() {
  // Assuming the existence of a div with id 'hashInput' and 'hashOutput' in the HTML
  const inputElement = d3.select('#hashInput');
  const outputElement = d3.select('#hashOutput');
  const algorithmSelect = d3.select('#algorithmSelect');

  // Populate the algorithm select with available algorithms
  const algorithms = ['sha256', 'md5', 'sha1'];
  algorithmSelect.selectAll('option')
    .data(algorithms)
    .enter().append('option')
    .text(d => d);

  // Event handler for the calculate button
  d3.select('#calculateButton').on('click', () => {
    try {
      const input = inputElement.property('value');
      const selectedAlgorithm = algorithmSelect.property('value');
      const hash = calculateHash(input, selectedAlgorithm);
      outputElement.text(hash);
    } catch (error) {
      outputElement.text(error.message);
    }
  });
}

// Call setupUI when the script loads
setupUI();