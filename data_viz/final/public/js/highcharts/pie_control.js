plotPie('Global', 'Global');

var GlobalPieBtn = document.getElementById("GlobalPieBtn");

GlobalPieBtn.addEventListener("click", function(){
	plotPie('Global', 'Global');}, false);


var NApiebtn = document.getElementById("NApiebtn");

NApiebtn.addEventListener("click", function(){
	plotPie('NA', 'North America');}, false);

var EUpiebtn = document.getElementById("EUpiebtn");

EUpiebtn.addEventListener("click", function(){
	plotPie('EU', 'Europe');
}, false);

var JPpiebtn = document.getElementById("JPpiebtn");

JPpiebtn.addEventListener("click", function(){
	plotPie("JP", 'Japan');
}, false);

var OtherPieBtn = document.getElementById("OtherPieBtn");

OtherPieBtn.addEventListener("click", function(){
	plotPie("Other", 'Others');
}, false);