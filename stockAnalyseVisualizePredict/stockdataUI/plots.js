var ticker = ['AAPL', 'MSFT', 'TSLA', 'DELL', 'DIS'];
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

buildPlot('AAPL');

function buildPlot(stock) {
  var apiKey = "TG5XV6MAKKAIRCTT";

  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${apiKey}`;
  console.log(url);
  const loadData = d3.json(url).then(data => {

    var datedstock = Object.keys(data["Time Series (Daily)"]);
    var stockValue = Object.values(data["Time Series (Daily)"])
    var openingPrices = [];
    var dates = [];
    var highPrices = [];
    var lowPrices = [];
    var closingPrices = [];
    var volume = [];

    for (oneDayValue of stockValue) {
      var name = "Stock PLot";
      var stock = "AAPL";
      var startDate = '2019-09-16';
      var endDate = '2019-04-28';
      dates = datedstock;
      openingPrices.push(oneDayValue['1. open']);
      highPrices.push(oneDayValue['2. high']);
      lowPrices.push(oneDayValue['3. low']);
      closingPrices.push(oneDayValue['4. close']);
      volume.push(oneDayValue['5. volume']);
    }

    const chartResultsData = {};

    // Grab values from the response json object to build the plots

    // console.log(datedstock)
    // console.log(openingPrices)
    // console.log(highPrices)
    // console.log(lowPrices)
    // console.log(closingPrices)
    // console.log(volume)

    // console.log(loadData)
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    const initialiseChart = data => {

      // add SVG to the page
      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', width + margin['left'] + margin['right'])
        .attr('height', height + margin['top'] + margin['bottom'])
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin['left']},  ${margin['top']})`)
    };

    const xMin = d3.min(data, d => {
      return d['dates'];
    });
    const xMax = d3.max(data, d => {
      return d['dates'];
    });
    const yMin = d3.min(data, d => {
      return d['closingPrices'];
    });
    const yMax = d3.max(data, d => {
      return d['closingPrices'];
    });
    // scales for the charts
    const xScale = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([yMin - 5, yMax])
      .range([height, 0]);

    svg
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    svg
      .append('g')
      .attr('id', 'yAxis')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(yScale));

// generates close price line chart when called
const line = d3
  .line()
  .x(d => {
    return xScale(d['dates']);
  })
  .y(d => {
    return yScale(d['closingPrices']);
  });
// Append the path and bind data
svg
 .append('path')
 .data([data])
 .style('fill', 'none')
 .attr('id', 'priceChart')
 .attr('stroke', 'steelblue')
 .attr('stroke-width', '1.5')
 .attr('d', line);

    return chartResultsData => ({
      date: datedstock,
      high: highPrices.push(oneDayValue['2. high']),
      low: lowPrices.push(oneDayValue['3. low']),
      open: openingPrices.push(oneDayValue['1. open']),
      close: closingPrices.push(oneDayValue['4. close']),
      volume: volume.push(oneDayValue['5. volume'])
    });

  });
}



