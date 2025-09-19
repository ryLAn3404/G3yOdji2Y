// 代码生成时间: 2025-09-19 14:29:58
 * interactiveChartGenerator.js
 *
 * @description 交互式图表生成器，使用D3框架实现。
 * @author Your Name
 * @version 1.0
 */

// 引入D3库
const d3 = require('d3');

/**
 * ChartGenerator类，用于生成交互式图表。
 * @constructor
 */
class ChartGenerator {
  constructor() {
    // 构造函数
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  /**
   * 初始化SVG画布
   * @param {string} selector - SVG容器的选择器
   */
  initSVG(selector) {
    try {
      this.svg = d3.select(selector)
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    } catch (error) {
      console.error('Error initializing SVG:', error);
    }
  }

  /**
   * 绘制数据图表
   * @param {Array} data - 数据数组
   * @param {string} type - 图表类型，如'line', 'bar'等
   */
  drawChart(data, type) {
    try {
      // 根据图表类型选择不同的绘制方法
      switch (type) {
        case 'line':
          this.drawLineChart(data);
          break;
        case 'bar':
          this.drawBarChart(data);
          break;
        // 可以扩展更多的图表类型
        default:
          console.warn('Unsupported chart type:', type);
      }
    } catch (error) {
      console.error('Error drawing chart:', error);
    }
  }

  /**
   * 绘制折线图
   * @param {Array} data - 数据数组
   */
  drawLineChart(data) {
    // X轴比例尺
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, this.width]);
    
    // Y轴比例尺
    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([this.height, 0]);
    
    // X轴
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));
    
    // Y轴
    this.svg.append('g')
      .call(d3.axisLeft(y));
    
    // 折线图路径
    this.svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y))
      );
  }

  /**
   * 绘制条形图
   * @param {Array} data - 数据数组
   */
  drawBarChart(data) {
    // X轴比例尺
    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.width])
      .padding(0.1);
    
    // Y轴比例尺
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([this.height, 0]);
    
    // X轴
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));
    
    // Y轴
    this.svg.append('g')
      .call(d3.axisLeft(y));
    
    // 条形图
    this.svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.value))
      .attr('height', d => this.height - y(d.value));
  }
}

// 示例用法
const chartGenerator = new ChartGenerator();
chartGenerator.initSVG('#chart');
const sampleData = [{x: 1, y: 3}, {x: 2, y: 7}, {x: 3, y: 6}, {x: 4, y: 4}, {x: 5, y: 5}];
chartGenerator.drawChart(sampleData, 'line');
// 可以替换sampleData和图表类型来绘制不同的图表
