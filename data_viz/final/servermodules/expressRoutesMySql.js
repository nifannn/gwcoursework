var mysql      = require('mysql');
var fs = require('fs');
module.exports = function(app) {

  //Read mysql connection values from a JSON file.
  var config = fs.readFileSync('./servermodules/mysql.json', 'utf8');
  config = JSON.parse(config);

// sum of sales by year across region
app.get('/api/salesbyregion', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var region = req.query.region;
   console.log('Region : ', region);

   if(region == 'all') {
    sql = 'SELECT Year, SUM(NA_Sales) AS NA, SUM(EU_Sales) AS EU, SUM(JP_Sales) AS JP, SUM(Other_Sales) AS Other, SUM(Global_Sales) AS Global FROM vgsale GROUP BY Year';
     connection.query(sql,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }else {
       sql = 'SELECT Year, SUM('+region+'_Sales) AS '+region+' FROM vgsale GROUP BY Year';
       connection.query(sql,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }

  connection.end();

 });

// sales by genre across year
 app.get('/api/genrebyyear', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var year = req.query.year;
   console.log('Year : ', year);

   sql = 'select Genre, SUM(Global_Sales) AS Sales from vgsale Where Year = ' +year+' GROUP BY Genre ORDER BY Sales desc';
   connection.query(sql,
       function(err, rows, fields) {

         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });

  connection.end();

 });

// proportion by region across publisher
 app.get('/api/proportionbypublisher', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var publisher = req.query.publisher;
   console.log('Publisher : ', publisher);
   sql = 'select SUM(NA_Sales)/SUM(Global_Sales) AS NA, SUM(EU_Sales)/SUM(Global_Sales) AS EU, SUM(JP_Sales)/SUM(Global_Sales) AS JP, SUM(Other_Sales)/SUM(Global_Sales) AS Other from vgsale'
   
   // change format of data
   function preprocess(rows){
    var result = [];
    var regions = ['NA', 'EU', 'JP', 'Other'];
    for (var i = 0; i < regions.length; i++) {
      result.push({Region:regions[i], Proportion:rows[0][regions[i]]});

    };
    return result
   }

    if(publisher == 'all') {
       connection.query(sql,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', preprocess(rows));
        else
           console.log('Error while performing Query.', err);
        res.send(preprocess(rows));

      });
   }else {
       connection.query(sql + " WHERE Publisher=?",publisher,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', preprocess(rows));
        else
           console.log('Error while performing Query.', err);
        res.send(preprocess(rows));

      });
   }

  connection.end();

 });

// proportion by genre across regions
 app.get('/api/genrebyregion', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var region = req.query.region;
   console.log('Region : ', region);
   sql = 'select Genre AS name, SUM('+region+'_Sales) AS y from vgsale group by Genre'
   connection.query(sql,
    function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });

  connection.end();

 });


// sales by platform across year
 app.get('/api/platformbyyear', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var year = req.query.year;
   console.log('Year : ', year);

   sql = 'select Platform, SUM(NA_Sales) AS `North America`, SUM(EU_Sales) AS Europe, SUM(JP_Sales) AS Japan, SUM(Other_Sales) AS Others from vgsale WHERE Year = '+year+' GROUP BY Platform';
   connection.query(sql,
       function(err, rows, fields) {

         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });

  connection.end();

 });

 // sum of sales by year across region
app.get('/api/genrebypublisher', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var publisher = req.query.publisher;
   console.log('Publisher : ', publisher);

   if(publisher == 'all') {
    sql = "select Publisher, Genre, SUM(Global_Sales) AS Sales from vgsale where Publisher in ('Nintendo', 'Electronic Arts', 'Activision', 'Sony Computer Entertainment', 'Ubisoft') group by Publisher, Genre";
     connection.query(sql,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }else {
       sql = "select Genre, SUM(Global_Sales) AS Sales from vgsale where Publisher = '"+publisher+"' group by Genre";
       connection.query(sql,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }

  connection.end();

 });



 // application -------------------------------------------------------------
 app.get('*', function(req, res) {
   res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 });

 }
