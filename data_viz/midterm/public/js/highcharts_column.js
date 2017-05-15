$(function () {

    // load data
    $.get('dataset/undergraduate_5years.csv', function(csv) {
        // configure column chart
        $('#column').highcharts({
            chart: {
                type: 'column'
            },
            data: {
                csv: csv
            },
            title: {
                text: 'Different Components of Harvard Undergraduate Package in Recent 5 Years'
            },
            yAxis: {
                title: {
                    text: '$'
                }
            }
        });
    });

});