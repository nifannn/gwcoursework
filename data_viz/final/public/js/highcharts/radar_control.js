plotRadar('all');

var NintendoSpBtn = document.getElementById("NintendoSpBtn");

NintendoSpBtn.addEventListener("click", function(){
	plotRadar('Nintendo');}, false);


var EAspbtn = document.getElementById("EAspbtn");

EAspbtn.addEventListener("click", function(){
	plotRadar('Electronic Arts');}, false);

var ActSpBtn = document.getElementById("ActSpBtn");

ActSpBtn.addEventListener("click", function(){
	plotRadar('Activision');
}, false);

var SonySpBtn = document.getElementById("SonySpBtn");

SonySpBtn.addEventListener("click", function(){
	plotRadar("Sony Computer Entertainment");
}, false);

var UbiSpBtn = document.getElementById("UbiSpBtn");

UbiSpBtn.addEventListener("click", function(){
	plotRadar('Ubisoft');
}, false);

var AllSpBtn = document.getElementById("AllSpBtn");

AllSpBtn.addEventListener("click", function(){
	plotRadar('all');
}, false);