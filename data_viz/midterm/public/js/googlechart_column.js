function drawColumnChart() {
   $.get("dataset/undergraduate_total.csv", function(csvString) {
      // transform the CSV string into a 2-dimensional array
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

      // this new DataTable object holds all the data
      var data = new google.visualization.arrayToDataTable(arrayData);
      // configure the column chart
      var columnChart = new google.visualization.ChartWrapper({
         chartType: 'ColumnChart',
         containerId: 'columnchart',
         dataTable: data,
         options:{
            width: window.innerWidht, height: window.innerHeight*0.61,
            title: 'Total Harvard Undergraduate Package',
            titleTextStyle : {color: 'grey', fontSize: 11},
         }
      });
      columnChart.draw();
   });
}
google.setOnLoadCallback(drawColumnChart)