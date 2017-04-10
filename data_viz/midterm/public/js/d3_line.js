// set canvas size and the location of plot
var l_svg = d3.select("#line_svg"),
    l_margin = {top: 20, right: 100, bottom: 30, left: 50},
    l_width = l_svg.attr("width") - l_margin.left - l_margin.right,
    l_height = l_svg.attr("height") - l_margin.top - l_margin.bottom,
    l_g = l_svg.append("g").attr("transform", "translate(" + l_margin.left + "," + l_margin.top + ")");

// set date format
var parseTime = d3.timeParse("%Y");

// set x, y, and z range, z is color of line
var l_x = d3.scaleTime().range([0, l_width]),
    l_y = d3.scaleLinear().range([l_height, 0]),
    l_z = d3.scaleOrdinal(d3.schemeCategory10);

// set x, y value of line
var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return l_x(d.year); })
    .y(function(d) { return l_y(d.cost); });

// load data
d3.csv("data/tuition_graduate.csv", function(error, data){
    if (error) throw error;
    
    // change data format
    data.forEach(function(d) {
        d.year = parseTime(d.year);
        d.cost = +d.cost;
    });
    
    // nest data to split data into groups
    var dataNest = d3.nest()
        .key(function(d) { return d.school; })
        .entries(data);

    // set x, y and z domain
    l_x.domain(d3.extent(data, function(d) { return d.year; }));
    l_y.domain([
        d3.min(data, function(d) { return d.cost; }),
        d3.max(data, function(d) { return d.cost; })
    ]);

    l_z.domain(dataNest.map(function(d) { return d.key; }));

    // set x axis
    l_g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + l_height + ")")
        .call(d3.axisBottom(l_x));
    
    // set y axis
    l_g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(l_y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Cost, $");

    // draw line chart
    var school = l_g.selectAll(".school")
        .data(dataNest)
        .enter().append("g")
          .attr("class", "school");

    school.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return l_z(d.key); });

    // text labels
    school.append("text")
          .datum(function(d) { return {key: d.key, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + l_x(d.value.year) + "," + l_y(d.value.cost) + ")"; })
          .attr("x", 3)
          .attr("dy", "0.35em")
          .style("font", "10px sans-serif")
          .text(function(d) { return d.key; });
});