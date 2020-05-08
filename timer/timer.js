var cdt = new Date; // cdt stands for current date time. The current date time is reset later in the program.
var countTil; //this is the time set by the user to have the timer count down until.
var timeToAdd; //this is a temporary variable used to check if the amount of time between the time
//the user submitted, and the current time is negative

var masterTime = 0; //this is the value, in secconds, of the timer
var secs = 0; //These three variables are used to make refreshing the text more intuitive
var mins = 0;
var hors = 0;
var timeTemp = 0; //Used when refershing the text that serves as the output of the timer
var textTemp = ""; //Used when refreshing the text on the buttons
var adder = 1; //Used to increment/decrement the timer by a set value.

//These variables are to control when the timer goes off, the sound it makes, and how many times it makes it
var timerRunning = false;
var audio = new Audio('ring.mp3');
var countdownTimeout; //used as placeholders for the timeout/interval for each of these
var ringTimeout;

//This has to be in a variable because event listeners for the page closing are weird
var savedChangesPopup = function (e) {e.preventDefault(); e.returnValue = ''; };

//setup for the page. Puts initial values in the date and time boxes next to the "countdown until" button
refreshTime();

function $(id) {
	return document.getElementById(id);
}

function toggleAddSub() {
	adder *= -1;
	// console.log("adder is now " + adder);
	refreshButtons();
}

function toggleMagnitude() {
	adder = (-0.1*(adder * adder * adder)) + (10.1*adder);
	/*f(x)=-0.1(x^3)+10.1x
	x   f(x)
	1   10
	10  1
	-1  -10
	-10 -1
	*/
	// console.log("adder is now " + adder);
	refreshButtons();
}

function refreshButtons(){
	// updates the buttons to reflect the changes made to the internal values
	// in toggleAddSub() and toggleMagnitude()
	// console.log("refreshing buttons")
	textTemp = "";
	if (adder > 0) {
		textTemp += "Add ";
	} else {
		textTemp += "Subtract ";
	}
	if (adder == 10 || adder == -10){
		textTemp += "10 ";
	} else {
		textTemp += "1 ";
	}

	$("secButton").textContent = textTemp + "second";
	$("minButton").textContent = textTemp + "minute";
	$("horButton").textContent = textTemp + "hour";

	if (adder == 10 || adder == -10){
		$("secButton").textContent += "s";
		$("minButton").textContent += "s";
		$("horButton").textContent += "s";
	}

	textTemp = "";
}

function refreshText(){
	// updates the text that serves as the timer's output.
	timeTemp = masterTime;
	hors = Math.floor(timeTemp/3600);
	timeTemp = timeTemp - (hors * 3600);
	mins = Math.floor(timeTemp/60);
	timeTemp = timeTemp - (mins * 60);
	secs = timeTemp;

	textTemp = "";
	if(hors < 10){
		textTemp = textTemp + "0" + hors + ":";
	} else {
		textTemp = textTemp + hors + ":";
	}
	//console.log(textTemp);
	if(mins < 10){
		textTemp = textTemp + "0" + mins + ":";
	} else {
		textTemp = textTemp + mins + ":";
	}

	if(secs < 10){
		textTemp = textTemp + "0" + secs;
	} else {
		textTemp = textTemp + secs;
	}

	$("output").textContent = textTemp;
	textTemp = "";
}

function refreshTime(){
	// This line sets the date in the default field, but it has to shift it by the current timezone offset in
	// order for toISOString() to work correctly
	$("dateInput").value = new Date(cdt.valueOf() - (cdt.getTimezoneOffset() * 60 * 1000)).toISOString().substring(0, 10);
	// The same can be said of the time setting
	$("timeInput").value = new Date(cdt.valueOf() - (cdt.getTimezoneOffset() * 60 * 1000)).toISOString().substring(11, 16);
	
	// This was the old code for separating the time
	// $("dateInput").value = cdt.toISOString().substring(0, 10); //this separates the date
	// $("timeInput").value = cdt.toISOString().substring(11, 16); //this separates the time
}

function sec(){
	masterTime += adder;
	if (masterTime < 0) {masterTime = 0;}
	refreshText();
}

function min() {
	masterTime += 60 * adder;
	if (masterTime < 0) {masterTime = 0;}
	refreshText();
}

function hor() {
	masterTime += 3600 * adder;
	if (masterTime < 0) {masterTime = 0;}
	refreshText();
}

function toggleStartStop() {
	if(timerRunning){
		console.log("stopping the timer");
		clearInterval(ringTimeout);
		clearTimeout(countdownTimeout);
		timerRunning = false;
		$("startButton").textContent = "Start";
		$("secButton").disabled = false;
		$("minButton").disabled = false;
		$("horButton").disabled = false;
		$("countdownTilButton").disabled = false;

		window.removeEventListener('beforeunload', savedChangesPopup);
	} else {
		console.log("starting the timer");
		countdown();
		timerRunning = true;
		$("startButton").textContent = "Stop";
		$("secButton").disabled = true;
		$("minButton").disabled = true;
		$("horButton").disabled = true;
		$("countdownTilButton").disabled = true;

		window.addEventListener('beforeunload', savedChangesPopup);
	}
}

function countdownTil() {
	// This function allows you to have the timer count down until a certian time
	cdt = new Date;
	console.log($("timeInput").value);
	console.log($("dateInput").value);
	countTil = Date.parse($("dateInput").value + " " + $("timeInput").value);
	cdt = cdt.valueOf();
	timeToAdd = countTil - cdt;
	if (timeToAdd > 0) {
		masterTime = Math.floor(timeToAdd/1000);
		refreshText();
	}
	toggleStartStop();
}

function countdown() {
	if(masterTime > 0){
		masterTime --;
		countdownTimeout = setTimeout(function(){countdown();}, 1000);
		refreshText();
	} else {
		ring();
	}
}

function ring() {
	// This will cause the timer to ring until it is stopped by line 174 "clearInterval(ringTimeout);"
	// in toggleStartStop()
	console.log("The timer is done.");
	ringTimeout = setInterval(function(){audio.play();}, 900);
	$("secButton").disabled = false;
	$("minButton").disabled = false;
	$("horButton").disabled = false;
	$("countdownTilButton").disabled = false;
}