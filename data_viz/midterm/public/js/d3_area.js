// set canvas size
var a_svg = d3.select("#area_svg"),
    a_margin = {top: 20, right: 20, bottom: 30, left: 50},
    a_width = window.innerWidth * 0.67 - a_margin.left - a_margin.right,
    a_height = window.innerHeight * 0.61 - a_margin.top - a_margin.bottom;

// set date format
var parseDate = d3.timeParse("%Y");

// set x, y, z range
var x = d3.scaleTime().range([0, a_width]),
    y = d3.scaleLinear().range([a_height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

// initial stack
var stack = d3.stack();

// set x, y0, y1 value
var area = d3.area()
    .x(function(d, i) { return x(d.data.year); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

// set the chart location
var a_g = a_svg.attr("width", a_width + a_margin.left + a_margin.right)
               .attr("height", a_height + a_margin.top + a_margin.bottom)
               .append("g")
               .attr("transform", "translate(" + a_margin.left + "," + a_margin.top + ")");

// load data
d3.csv("dataset/undergraduate.csv", function(error, data) {
  if (error) throw error;
 
     // change the data format
     data.forEach(function(d) {
        d.year = parseDate(d.year);
        for (var i = 1, n = 6; i < n; ++i) d[i] = +d[i];
    });
  
  // get column name of data except column year
  var keys = data.columns.slice(1);

  // set x and z domain, and keys of stack
  x.domain(d3.extent(data, function(d) { return d.year; }));
  z.domain(keys);
  stack.keys(keys);
  
  // create layer of area chart
  var layer = a_g.selectAll(".layer")
    .data(stack(data))
    .enter().append("g")
      .attr("class", "layer");
  
  // draw the stacked area chart
  layer.append("path")
      .attr("class", "area")
      .style("fill", function(d) { return z(d.key); })
      .attr("d", area);

  layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
    .append("text")
      .attr("x", a_width - 6)
      .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
      .attr("dy", ".35em")
      .style("font", "10px sans-serif")
      .style("text-anchor", "end")
      .text(function(d) { return d.key; });
  
  // set x axis
  a_g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + a_height + ")")
      .call(d3.axisBottom(x));
  // set y axis
  a_g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"));
});


