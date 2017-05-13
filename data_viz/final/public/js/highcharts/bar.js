function plotBar(year){
	
	$.getJSON('/api/platformbyyear?year='+year, function(result){

		function preprocess(result) {
			var platforms = [],
			    regions = ['Others', 'Japan', 'Europe', 'North America'],
			    region_sales = [];

			for (var i = 0; i < regions.length; i++) {
				region_sales.push({name: regions[i], data:[]});
			}

			for (var i = 0; i < result.length; i++) {
				platforms.push(result[i].Platform);

				for (var j = 0; j < regions.length; j++) {
					region_sales[j].data.push(result[i][regions[j]]);
				}
			}

			return {platforms: platforms, region_sales: region_sales}
		}

	var results = preprocess(result);

	Highcharts.chart('barchart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Video Game Sales by Platform in '+year
    },
    xAxis: {
        categories: results.platforms
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Sales'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: results.region_sales
        
    }); 
	});
}