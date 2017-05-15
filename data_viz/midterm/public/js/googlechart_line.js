function drawVisualization() {
   $.get("dataset/graduate_avg.csv", function(csvString) {
      // transform the CSV string into a 2-dimensional array
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

      // this new DataTable object holds all the data
      var data = new google.visualization.arrayToDataTable(arrayData);
      // configure line chart
      var tuition_avg = new google.visualization.ChartWrapper({
         chartType: 'LineChart',
         containerId: 'linechart',
         dataTable: data,
         options:{
            width: window.innerWidht, height: window.innerHeight*0.61,
            title: 'Average Harvard Graduate Tuition',
            titleTextStyle : {color: 'grey', fontSize: 11},
         }
      });
      tuition_avg.draw();
   });
}
google.setOnLoadCallback(drawVisualization)