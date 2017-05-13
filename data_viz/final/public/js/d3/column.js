function plotColumn(year){
d3.select("#columnchart").select("svg").remove();

// set the dimensions of the canvas
var margin = {top: 30, right: 20, bottom: 30, left: 60},
    width = window.innerWidth*0.67 - margin.left - margin.right,
    height = window.innerHeight*0.61 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

// add the SVG element
var svg = d3.select("#columnchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "center-block")
  
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.json('/api/genrebyyear?year='+year, function(error, data) {

    data.forEach(function(d) {
        d.Genre = d.Genre;
        d.Sales = +d.Sales;
    });

    if (error) throw error;
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Genre; }));
  y.domain([0, d3.max(data, function(d) { return d.Sales; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Sales");

  g.selectAll(".column")
    .data(data)
    .enter().append("rect")
      .attr("class", "column")
      .attr("x", function(d) { return x(d.Genre); })
      .attr("y", function(d) { return y(d.Sales); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.Sales); });

});
}
