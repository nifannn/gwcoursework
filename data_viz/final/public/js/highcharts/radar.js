function plotRadar(publisher){

	$.getJSON('/api/genrebypublisher?publisher='+publisher,
		function(result){

	var publisher_abbr = {
		'Nintendo': 'Nintendo',
		'Electronic Arts': 'EA',
		'Activision': 'Activision',
		'Sony Computer Entertainment': 'Sony',
		'Ubisoft': 'Ubisoft'
	}

	function preprocessAll(result){
		var title = 'Video Game Sales by Genre Published by All 5 Publishers',
		    genres = ['Action', 'Adventure', 'Fighting', 'Misc',
		              'Platform', 'Puzzle', 'Racing', 'Role-Playing',
		              'Shooter', 'Simulation', 'Sports', 'Strategy'],
		    publisher_order = ['Nintendo', 'EA', 'Activision', 'Sony', 'Ubisoft'],
		    series = []

		for (var i = 0; i < publisher_order.length; i++) {
			series.push({name: publisher_order[i],
                         data: [],
                         pointPlacement: 'on'});
		}

		for (var i = 0; i < result.length; i++) {
			pubIdx = publisher_order.indexOf(publisher_abbr[result[i].Publisher]);
			series[pubIdx].data.push(result[i].Sales);
		}
		return {title: title, genres: genres, series: series}
	}

	function preprocessSingle(result){
		var title = 'Video Game Sales by Genre Published by '+publisher_abbr[publisher],
		    genres = [],
		    series = [{name: publisher_abbr[publisher], data: [], pointPlacement: 'on'}]

		for (var i = 0; i < result.length; i++) {
			genres.push(result[i].Genre)
			series[0].data.push(result[i].Sales)
		}

		return {title: title, genres: genres, series: series}

	}

	if (publisher == 'all') {
		result = preprocessAll(result);
	}else {
		result = preprocessSingle(result);
	}
	
	Highcharts.chart('radarchart', {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: result.title,
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: result.genres,
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}m</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: result.series
});
});

}