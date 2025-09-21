// 代码生成时间: 2025-09-22 06:46:40
 * This tool utilizes D3.js to create a drag-and-drop interface for batch renaming files.
 * The user can specify a new name pattern and the tool will rename files accordingly.
 */

// Require necessary packages
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Function to read directory contents
const readDirectory = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
};

// Function to rename a single file
const renameFile = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Batch rename function
const batchRenameFiles = async (dirPath, newNamePattern) => {
  try {
    const files = await readDirectory(dirPath);
    for (const file of files) {
      const oldPath = path.join(dirPath, file);
      const stats = fs.statSync(oldPath);
      if (stats.isFile()) {
        const newName = newNamePattern.replace(/\{index\}/g, files.indexOf(file) + 1);
        const newPath = path.join(dirPath, newName);
        await renameFile(oldPath, newPath);
        console.log(`Renamed ${file} to ${newName}`);
      }
    }
  } catch (error) {
    console.error('Error occurred during batch rename:', error);
  }
};

// Main function to handle user input
const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Get directory path from user
  rl.question('Enter the directory path: ', async (dirPath) => {
    try {
      const dirStats = fs.statSync(dirPath);
      if (!dirStats.isDirectory()) {
        throw new Error('The provided path is not a directory.');
      }
    } catch (error) {
      console.error(error.message);
      return rl.close();
    }

    // Get new name pattern from user
    rl.question('Enter the new name pattern (e.g., file-{index}.txt): ', async (newNamePattern) => {
      await batchRenameFiles(dirPath, newNamePattern);
      rl.close();
    });
  });
};

// Run the tool
main();