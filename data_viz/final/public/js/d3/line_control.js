plotAllLine();

var GlobalBtn = document.getElementById("GlobalBtn");

GlobalBtn.addEventListener("click", function(){
	plotLine('Global', 'steelblue', 'Global');}, false);


var NAbtn = document.getElementById("NAbtn");

NAbtn.addEventListener("click", function(){
	plotLine('NA', 'red', 'North America');}, false);

var EUbtn = document.getElementById("EUbtn");

EUbtn.addEventListener("click", function(){
	plotLine('EU', 'green', 'Europe');
}, false);

var JPbtn = document.getElementById("JPbtn");

JPbtn.addEventListener("click", function(){
	plotLine("JP", 'orange', 'Japan');
}, false);

var OtherBtn = document.getElementById("OtherBtn");

OtherBtn.addEventListener("click", function(){
	plotLine("Other", 'grey', 'Other');
}, false);

var AllLineBtn = document.getElementById("AllLineBtn");

AllLineBtn.addEventListener("click", function(){
	plotAllLine();
}, false);
