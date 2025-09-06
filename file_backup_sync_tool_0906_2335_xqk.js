// 代码生成时间: 2025-09-06 23:35:02
// file_backup_sync_tool.js
// This is a program that utilizes JS and D3 to create a file backup and synchronization tool.

/**
 * @module FileBackupSyncTool
 * @description A tool for backing up and synchronizing files.
 */

// Import required libraries
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // For executing shell commands

/**
 * Synchronizes a directory by copying files from source to destination.
 * @param {string} sourcePath - The path to the source directory.
 * @param {string} destPath - The path to the destination directory.
 * @param {Function} callback - A callback function to handle results.
 */
function syncDirectory(sourcePath, destPath, callback) {
  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      return callback(err);
    }
    files.forEach(file => {
      const sourceFile = path.join(sourcePath, file);
      const destFile = path.join(destPath, file);
      fs.copyFile(sourceFile, destFile, (err) => {
        if (err) {
          return callback(err);
        }
        // If this is the last file, call the callback with no error.
        if (files.length === 1) {
          callback(null, `Sync complete: ${destPath}`);
        }
      });
    });
  });
}

/**
 * Backs up a directory by creating a compressed archive.
 * @param {string} sourcePath - The path to the source directory.
 * @param {string} backupPath - The path to the backup file.
 * @param {Function} callback - A callback function to handle results.
 */
function backupDirectory(sourcePath, backupPath, callback) {
  const command = `tar -czf ${backupPath} -C ${path.dirname(sourcePath)} ${path.basename(sourcePath)}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return callback(err);
    }
    if (stderr) {
      return callback(new Error(stderr));
    }
    callback(null, `Backup created at: ${backupPath}`);
  });
}

// Example usage
const sourceDir = '/path/to/source/directory';
const destDir = '/path/to/destination/directory';
const backupFile = '/path/to/backup.tar.gz';

// Sync the directory
syncDirectory(sourceDir, destDir, (err, message) => {
  if (err) {
    console.error('Error syncing directory:', err);
  } else {
    console.log(message);
  }
});

// Backup the directory
backupDirectory(sourceDir, backupFile, (err, message) => {
  if (err) {
    console.error('Error backing up directory:', err);
  } else {
    console.log(message);
  }
});
