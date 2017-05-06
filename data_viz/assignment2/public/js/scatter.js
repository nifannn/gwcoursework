var margin1 = {top: 20, right: 20, bottom: 30, left: 40},
    width1 = window.innerWidth * 0.67 - margin1.left - margin1.right,
    height1 = window.innerHeight * 0.61 - margin1.top - margin1.bottom;

// setup x 
var xValue = function(d) { return d["Median Age"];}, // data -> value
    xScale = d3.scale.linear().range([0, width1]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis1 = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d["% Audited"];}, // data -> value
    yScale = d3.scale.linear().range([height1, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis1 = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d.Institution;},
    color1 = d3.scale.category10();

// add the graph canvas
var svg1 = d3.select("#scatter_chart")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

// load data
d3.csv("dataset/appendix.csv", function(error, data1) {

  // change string (from CSV) into number format
  data1.forEach(function(d) {
    d["Median Age"] = +d["Median Age"];
    d["% Audited"] = +d["% Audited"];
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data1, xValue)-1, d3.max(data1, xValue)+1]);
  yScale.domain([d3.min(data1, yValue)-1, d3.max(data1, yValue)+1]);

  // x-axis
  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis1)
    .append("text")
      .attr("class", "label")
      .attr("x", width1)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Median Age");

  // y-axis
  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("% Audited");

  // draw dots
  svg1.selectAll(".dot")
      .data(data1)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color1(cValue(d));});

  // draw legend
  var legend1 = svg1.selectAll(".legend")
      .data(color1.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend1.append("rect")
      .attr("x", width1 - 68)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color1);

  // draw legend text
  legend1.append("text")
      .attr("x", width1 - 74)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;});
});