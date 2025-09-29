// 代码生成时间: 2025-09-30 01:42:28
 * Features:
 *   - Tokenization
 *   - Sentence splitting
 *   - Stopword removal
 *   - Frequency distribution
 *
 * Usage:
 *   var nlpTool = new NaturalLanguageTool();
 *   nlpTool.tokenize(text);
 *   nlpTool.splitIntoSentences(text);
 *   nlpTool.removeStopwords(text);
 *   nlpTool.calculateFrequency(text);
 */

class NaturalLanguageTool {

  constructor() {
    // Define a list of stopwords
    this.stopwords = ['the', 'and', 'a', 'an', 'is', 'in', 'it', 'of', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'or'];
  }

  // Tokenize the input text
  tokenize(text) {
    try {
      const tokens = text.split(/\s+/); // Split text into tokens based on whitespace
      return tokens;
    } catch (error) {
      console.error('Error tokenizing text:', error);
      return [];
    }
  }

  // Split the input text into sentences
  splitIntoSentences(text) {
    try {
      const sentences = text.split(/\.(?=\s)/); // Split text into sentences based on period followed by whitespace
      return sentences;
    } catch (error) {
      console.error('Error splitting text into sentences:', error);
      return [];
    }
  }

  // Remove stopwords from the input text
  removeStopwords(text) {
    try {
      const tokens = this.tokenize(text);
      return tokens.filter(token => !this.stopwords.includes(token.toLowerCase()));
    } catch (error) {
      console.error('Error removing stopwords:', error);
      return [];
    }
  }

  // Calculate the frequency distribution of words in the input text
  calculateFrequency(text) {
    try {
      const words = this.removeStopwords(text);
      const frequency = {};
      words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
      });
      return frequency;
    } catch (error) { {
      console.error('Error calculating frequency:', error);
      return {};
    }
  }

  // Visualize the frequency distribution using D3
  visualizeFrequency(data) {
    try {
      const svg = d3.select('body').append('svg')
        .attr('width', 800)
        .attr('height', 600);

      const xScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, 800])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([600, 0]);

      svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
          .attr('x', d => xScale(d.name))
          .attr('y', d => yScale(d.value))
          .attr('width', xScale.bandwidth())
          .attr('height', d => 600 - yScale(d.value))
          .attr('fill', 'steelblue');

      svg.append('g')
        .attr('transform', 'translate(0,600)')
        .call(d3.axisBottom(xScale));

      svg.append('g')
        .call(d3.axisLeft(yScale));

    } catch (error) {
      console.error('Error visualizing frequency:', error);
    }
  }
}

// Example usage
const nlpTool = new NaturalLanguageTool();
const text = 'This is an example sentence. Another sentence for tokenization.';
const tokens = nlpTool.tokenize(text);
console.log('Tokens:', tokens);
const sentences = nlpTool.splitIntoSentences(text);
console.log('Sentences:', sentences);
const filteredTokens = nlpTool.removeStopwords(text);
console.log('Tokens without stopwords:', filteredTokens);
const frequency = nlpTool.calculateFrequency(text);
console.log('Frequency distribution:', frequency);

// Prepare data for visualization
const data = Object.entries(frequency).map(([name, value]) => ({ name, value }));
nlpTool.visualizeFrequency(data);