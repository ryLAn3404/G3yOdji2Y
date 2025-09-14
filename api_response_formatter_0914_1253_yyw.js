// 代码生成时间: 2025-09-14 12:53:20
 * This tool formats API responses into a more readable format.
 * @version 1.0.0
 */

const apiResponseFormatter = (response) => {

  // Check if the response is valid
  if (!response) {
    throw new Error('Invalid response');
  }

  // Check if the response has a valid status code
  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  // Parse the JSON from the response
  return response.json()
    .then(data => {
      // Format the data into a more readable format
      return formatData(data);
    }).catch(error => {
      // Handle JSON parsing errors
      throw new Error('Failed to parse JSON response');
    });

  // Function to format the data into a more readable format
  const formatData = (data) => {
    // Here you can add custom formatting logic based on the data structure
    // For example, you can add indentation or sorting

    // Convert the data to a string with a specific format
    return JSON.stringify(data, null, 2);
  };

};

// Example usage of the API Response Formatter
// Assuming 'fetchResponse' is a promise that resolves with a fetch API response object
let fetchResponse = fetch('https://api.example.com/data');

fetchResponse.then(response => {
  try {
    apiResponseFormatter(response).then(formattedData => {
      console.log('Formatted API Response:', formattedData);
    }).catch(error => {
      console.error('Error formatting API response:', error);
    });
  } catch (error) {
    console.error('Error handling API response:', error);
  }
}).catch(error => {
  console.error('Error fetching data:', error);
});