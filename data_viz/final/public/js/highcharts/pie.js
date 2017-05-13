function plotPie(region_id, region_name){
	$.getJSON("/api/genrebyregion?region="+region_id, function(result){

    // Build the chart
    Highcharts.chart('piechart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Video Game Sales Proportion by Genre in ' + region_name
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Sales',
            colorByPoint: true,
            data: result
        }]
    });
	});
}