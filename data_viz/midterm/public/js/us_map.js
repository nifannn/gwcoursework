
function usmap(){
// get the svg object
var width = window.innerWidth * 0.67,
    height = window.innerHeight * 0.61;

var svg = d3.select('#usmap')
            .attr("width", width)
            .attr("height", height);

// load json data and draw US map
d3.json('dataset/usstates.json', function (error, data) {
    var projection = d3.geo.albersUsa()
        .translate([svg.attr("width") / 2, svg.attr("height") / 2])
        .scale([svg.attr("width")]);
    var path = d3.geo.path()
        .projection(projection);

    svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style({ fill: '#5f9ea0', stroke: 'black' });
});}

usmap();