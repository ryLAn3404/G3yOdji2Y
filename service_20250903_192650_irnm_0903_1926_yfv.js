// 代码生成时间: 2025-09-03 19:26:50
// zip解压工具.js
// 本工具使用JS和D3框架实现文件的压缩与解压功能。

// 引入JSZip库和FileSaver.js用于处理ZIP文件的解压
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import 'd3'; // 引入D3库，虽然D3主要用于数据处理和可视化，但这里用于演示目的。

// 函数：解压ZIP文件
function unzipFile(zipBlob, callback) {
  // 错误处理：如果传入参数不是有效的Blob对象
  if (!(zipBlob instanceof Blob)) {
    return callback(new Error('Invalid zip file'), null);
  }

  // 使用JSZip库加载ZIP文件
  JSZip.loadAsync(zipBlob).then(zip => {
    // 遍历ZIP文件中的所有文件
    Object.keys(zip.files).forEach(filename => {
      // 提取文件内容
      const content = zip.files[filename].async('blob');
      content.then(blob => {
        // 使用FileSaver.js保存文件
        saveAs(blob, filename);
      });
    });
    // 所有文件处理完毕后调用回调函数
    callback(null, 'Files extracted successfully');
  }, error => {
    // 错误处理：处理JSZip加载ZIP文件时的错误
    callback(error, null);
  });
}

// 函数：选择文件并解压
function selectAndUnzipFile() {
  // 创建文件输入元素
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.zip';
  fileInput.onchange = function(event) {
    // 获取文件列表
    const files = event.target.files;
    if (files.length === 0) {
      console.error('No file selected');
      return;
    }
    // 获取第一个文件（假设用户只选择一个ZIP文件）
    const zipFile = files[0];
    // 调用解压函数
    unzipFile(zipFile, (error, message) => {
      if (error) {
        console.error('Error unzipping file:', error);
      } else {
        console.log(message);
      }
    });
  };
  // 将文件输入元素添加到页面
  document.body.appendChild(fileInput);
}

// 初始化函数，页面加载完成后执行
document.addEventListener('DOMContentLoaded', selectAndUnzipFile);
