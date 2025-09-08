// 代码生成时间: 2025-09-08 13:00:58
// Import necessary modules
const fs = require('fs');
const d3 = require('d3-dsv');

/**
 * Process a single CSV file
 * @param {string} filePath - The path to the CSV file
 * @param {function} callback - A callback function to handle processed data
 */
function processCSVFile(filePath, callback) {
  try {
    // Read the CSV file
    const data = d3.csvParse(fs.readFileSync(filePath, 'utf8'));
    // Perform any processing on the data
    // (This is a placeholder; actual processing logic goes here)
    const processedData = data;
    // Execute the callback with the processed data
    callback(processedData);
  } catch (error) {
    console.error(`Error processing file: ${filePath}, Error: ${error.message}`);
  }
}

/**
 * Batch process multiple CSV files
 * @param {string[]} filePaths - An array of paths to CSV files
 * @param {function} onAllDone - A callback function to execute once all files are processed
 */
function batchProcessCSVFiles(filePaths, onAllDone) {
  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    throw new Error('filePaths must be a non-empty array');
  }

  const processedData = [];
  let processedCount = 0;
  const totalFiles = filePaths.length;

  filePaths.forEach((filePath) => {
    processCSVFile(filePath, (data) => {
      processedData.push(data);
      processedCount++;

      if (processedCount === totalFiles) {
        // All files have been processed
        onAllDone(processedData);
      }
    });
  });
}

// Example usage
const csvFiles = ['./data/file1.csv', './data/file2.csv'];
batchProcessCSVFiles(csvFiles, (allData) => {
  console.log('All CSV files have been processed:', allData);
});