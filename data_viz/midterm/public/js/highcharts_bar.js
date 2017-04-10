    $(function () {

    // load data
    $.get('data/tuition_graduate_5_years_trans.csv', function(data) {
        console.log('data ... ', data);
        
        // configure bar chart
        $('#bar').highcharts({
            chart: {
                type: 'bar'
            },
          data: {
                csv: data
            },
           
           series: [{
            name: 'Random data',
            data: data
            }],
            title: {
                text: 'Harvard Graduate Tuition of Different School in Recent 5 years'
            },
            yAxis: {
                title: {
                    text: '$'
                }
            }
        });
    });

});