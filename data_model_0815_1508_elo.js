// 代码生成时间: 2025-08-15 15:08:51
function DataModel(data) {
  // Initialize the model with data
  this.data = data || [];
}

/**
 * Adds a new data point to the model.
 *
 * @param {object} newData - The new data point to add.
 * @returns {void}
 */
DataModel.prototype.addData = function(newData) {
  if (!newData) {
    throw new Error('newData is required');
  }
  this.data.push(newData);
};

/**
 * Removes a data point from the model by index.
 *
 * @param {number} index - The index of the data point to remove.
 * @returns {void}
 */
DataModel.prototype.removeData = function(index) {
  if (index < 0 || index >= this.data.length) {
    throw new Error('Index out of bounds');
  }
  this.data.splice(index, 1);
};

/**
 * Updates a data point in the model.
 *
 * @param {number} index - The index of the data point to update.
 * @param {object} updatedData - The updated data point.
 * @returns {void}
 */
DataModel.prototype.updateData = function(index, updatedData) {
  if (index < 0 || index >= this.data.length) {
    throw new Error('Index out of bounds');
  }
  if (!updatedData) {
    throw new Error('updatedData is required');
  }
  this.data[index] = updatedData;
};

/**
 * Retrieves a data point from the model by index.
 *
 * @param {number} index - The index of the data point to retrieve.
 * @returns {object|null} - The data point or null if index is out of bounds.
 */
DataModel.prototype.getData = function(index) {
  if (index < 0 || index >= this.data.length) {
    return null;
  }
  return this.data[index];
};

/**
 * Retrieves all data from the model.
 *
 * @returns {array} - The array of all data points.
 */
DataModel.prototype.getAllData = function() {
  return this.data;
};

// Export the DataModel for use in other modules
module.exports = DataModel;
