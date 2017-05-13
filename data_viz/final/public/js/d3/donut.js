function plotDonut(publisher){

d3.select("#donutchart").select("svg").remove();

var width = window.innerWidth*0.62,
    height = window.innerHeight*0.62,
    radius = (Math.min(width, height) - 10) / 2,
    donutWidth = 80;

var color = d3.scaleOrdinal()
            .range(["red", "green", "orange", "grey"]);

var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - donutWidth);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Proportion; });

var svg = d3.select("#donutchart").append("svg")
    .attr("width", width)
    .attr("height", height+30)
    .attr("class", "center-block")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 +30) + ")");

d3.json("/api/proportionbypublisher?publisher="+publisher, function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.Region = d.Region;
    d.Proportion = +d.Proportion;
  })
  
  var region_name = {
    NA: 'North America',
    EU: 'Europe',
    JP: 'Japan',
    Other: 'Other'
  };

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) { return color(d.data.Region); });

  g.append("text")
      .attr("transform", function(d) { 
        centroidloc = arc.centroid(d);
        centroidloc[0] = centroidloc[0] - region_name[d.data.Region].length * 3.5;
        return "translate(" + centroidloc + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return region_name[d.data.Region]; });});

}
