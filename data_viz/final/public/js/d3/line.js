function plotLine(region_id, line_color, region_name) {
d3.select("#linechart").select("svg").remove();

var svg = d3.select("#linechart").append("svg"),
    margin = {top: 30, right: 20, bottom: 30, left: 60},
    width = window.innerWidth * 0.67 - margin.left - margin.right,
    height = window.innerHeight * 0.61 - margin.top - margin.bottom,
    g = svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "center-block")
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d[region_id]); });

d3.json("/api/salesbyregion?region="+region_id, function(error, data) {
  data.forEach(function(d){
    d.Year = parseTime(d.Year);
    d[region_id] = +d[region_id];
  });

  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain(d3.extent(data, function(d) { return d[region_id]; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  
  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Sales");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", line_color)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  legend = g.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(0,0)")

  legend.append('rect')
        .attr("x", width - 100)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", line_color);

  legend.append("text")
        .attr("x", width - 35 + region_name.length*3.5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(region_name)
});}

function plotAllLine(){

d3.select("#linechart").select("svg").remove();

var svg = d3.select("#linechart").append("svg"),
    margin = {top: 30, right: 20, bottom: 30, left: 60},
    width = window.innerWidth * 0.67 - margin.left - margin.right,
    height = window.innerHeight * 0.61 - margin.top - margin.bottom,
    g = svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "center-block")
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);

var line1 = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Global); });

var line2 = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.NA); });

var line3 = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.EU); });

var line4 = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.JP); });

var line5 = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Other); });

function drawLine(data, line_var, color, region_name, line_id) {
  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line_var)
      .attr("data-legend", region_name);

    legend = g.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(0,"+line_id*20+")")

    legend.append('rect')
        .attr("x", width - 100)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 35 + region_name.length*3.5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(region_name)

}

d3.json("/api/salesbyregion?region=all", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
      d.Year = parseTime(d.Year);
      d.Global = +d.Global;
      d.NA = +d.NA;
      d.EU = +d.EU;
      d.JP = +d.JP;
      d.Other = +d.Other;
  });

  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain(d3.extent(data, function(d) { return d.Global; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Sales");

  drawLine(data, line1, 'steelblue', 'Global', 0);
  drawLine(data, line2, 'red', 'North America', 1);
  drawLine(data, line3, 'green', 'Europe', 2);
  drawLine(data, line4, 'orange', 'Japan', 3);
  drawLine(data, line5, 'grey', 'Other', 4);

});

}
