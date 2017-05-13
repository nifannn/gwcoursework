plotDonut('all');

var NintendoBtn = document.getElementById("NintendoBtn");

NintendoBtn.addEventListener("click", function(){
	plotDonut('Nintendo');}, false);


var EAbtn = document.getElementById("EAbtn");

EAbtn.addEventListener("click", function(){
	plotDonut('Electronic Arts');}, false);

var ActBtn = document.getElementById("ActBtn");

ActBtn.addEventListener("click", function(){
	plotDonut('Activision');
}, false);

var SonyBtn = document.getElementById("SonyBtn");

SonyBtn.addEventListener("click", function(){
	plotDonut("Sony Computer Entertainment");
}, false);

var UbiBtn = document.getElementById("UbiBtn");

UbiBtn.addEventListener("click", function(){
	plotDonut('Ubisoft');
}, false);

var AllDonutBtn = document.getElementById("AllDonutBtn");

AllDonutBtn.addEventListener("click", function(){
	plotDonut('all');
}, false);
