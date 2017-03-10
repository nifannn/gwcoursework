var width2 = 1000,
    height2 = 500,
    radius = Math.min(width2, height2 - 40) / 2;

// set color
var color2 = d3.scale.category10();

// set radius
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// set label radius
var labelArc = d3.svg.arc()
    .outerRadius(radius - 110)
    .innerRadius(radius - 100);

// set pie chart
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d['Participants (Course Content Accessed)']; });

// add graph canvas
var svg2 = d3.select("#pie").append("svg")
    .attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

// load data
d3.csv("dataset/pie.csv", type, function(error, data2) {
  if (error) throw error;

  // add graph
  var g = svg2.selectAll(".arc")
      .data(pie(data2))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color2(d.data['Course Subject']); });

  // add content
  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data['Participants (Course Content Accessed)']; });

  // add subject
  g.append("text")
      .attr("transform", function(d) { 
            var x = arc.centroid(d)[0] * 3.3 - 30;
            var y = arc.centroid(d)[1] * 2.3 ;
            return "translate(" + x + "," + y + ")";
      })
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-size", "14px")
      .style("fill", "#ffffff")
      .text(function(d){ return d.data['Course Subject']; });
});

function type(d) {
  d['Participants (Course Content Accessed)'] = +d['Participants (Course Content Accessed)'];
  return d;
}