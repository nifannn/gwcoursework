// setup category
var institus = ["MITx", "HarvardX"];

// setup time format
var parseDate = d3.time.format("%Y-%m").parse;

// setup graph size
var margin3 = {top: 20, right: 20, bottom: 30, left: 30},
    width3 = window.innerWidth * 0.67 - margin3.left - margin3.right,
    height3 = window.innerHeight * 0.61 - margin3.top - margin3.bottom;

// setup x 
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width3]);

// setup y 
var y = d3.scale.linear()
    .rangeRound([height3, 0]);

// setup color
var z = d3.scale.category10();

// setup x axis
var xAxis3 = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%y%b"));

// setup y axis 
var yAxis3 = d3.svg.axis()
    .scale(y)
    .orient("left");

// add graph canvas
var svg3 = d3.select("#bar_chart")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

// load data
d3.csv("dataset/bar.csv", type, function(error, data3) {

  if (error) throw error;

  // process data
  var layers = d3.layout.stack()(institus.map(function(c) {
    return data3.map(function(d) {
      return {x: d.date, y: d[c]};
    });
  }));

  // set x, y
  x.domain(layers[0].map(function(d) { return d.x; }));
  y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]).nice();

  // fill color
  var layer = svg3.selectAll(".layer")
      .data(layers)
    .enter().append("g")
      .attr("class", "layer")
      .style("fill", function(d, i) { return z(i); });

  // draw bar chart
  layer.selectAll("rect")
      .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y + d.y0); })
      .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
      .attr("width", x.rangeBand() - 1);

  // draw x axis
  svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height3 + ")")
      .call(xAxis3)
    .append("text")
      .attr("class", "label")
      .attr("x", width3+10)
      .attr("y", 30)
      .style("text-anchor", "end")
      .text("Date");

  // change x axis tick font size
  svg3.select(".x")
    .selectAll("text")
    .style("font-size","8.5px");

  svg3.select(".x")
    .select(".label")
    .style("font-size", "14px");

  // draw y axis
  svg3.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxis3)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Courses");

  // setup legend
  var legend3 = svg3.selectAll(".legend")
      .data(layers)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend3.append("rect")
      .attr("x", width1 - 68)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return z(i); });

  // draw legend text
  legend3.append("text")
      .attr("x", width1 - 74)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d, i) { return institus[i];});
});

function type(d) {
  d.date = parseDate(d['Launch Date']);
  institus.forEach(function(c) { d[c] = +d[c]; });
  return d;
}
