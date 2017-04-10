// get svg object
var wsvg = d3.select('#worldmap')
// load json data and draw world map
d3.json('data/world-110m.json', function (error, world) {
            var projection = d3.geo.orthographic()
                .scale(300)
                .translate([wsvg.attr("width") / 2, wsvg.attr("height") / 2])
                .clipAngle(90);
            var path = d3.geo.path().projection(projection);

            var countries = topojson.feature(world, world.objects.countries).features;

            wsvg.selectAll('path')
                .data(countries)
                .enter()
                .append('path')
                .attr('d', path)
                .style({
                    fill: '#00008b',
                    stroke: 'white'
                });
        });