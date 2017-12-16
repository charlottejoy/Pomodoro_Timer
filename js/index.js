//nice tohave: change colour as time elapses?
// nice to have, set a random quote?
//Done-User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
//Done-User Story: I can reset the clock for my next pomodoro.
//Done-User Story: I can customize the length of each pomodoro.

var type;
var minutes;
var totalTime;
var audio = new Audio("http://www.buddhanet.net/filelib/audio/tinsha.wav");

$("#help-container").hide();
$("#work-time").click(function() {
  type = "work";
});
$("#break-time").click(function() {
  type = "break";
});

$("#work-time-div").click(function() {
  $("#work-minutes").focus();
});
$("#break-time-div").click(function() {
  $("#break-minutes").focus();
});

$("#work-minutes").keypress(function(e) {
  if (e.keyCode == 13) { //if the key is ascii 13= enter
    type = "work";
    initialize('work');
  }
  if (e.keyCode == 32) {
    start();
  }
});

$("#break-minutes").keypress(function(e) {
  if (e.keyCode == 13) { //if the key is ascii 13= enter
    type = "break";
    initialize('break');
  }
  if (e.keyCode == 32) {
    start();
  }
});

function helpModal() {

  $("#help-container").slideDown();
  $("#help").slideUp();

};

function closeModal() {
  $("#help-container").slideUp();
  $("#help").slideDown();

};

function initialize(type) {

  minutes = Number(document.getElementById(type + "-minutes").value);

  totalTime = minutes * 60;
  seconds = 00;
  if (minutes < 0) {
    alert("only positive numbers please");
    reset();
  }

  document.getElementById("type-display").innerText = type;

  document.getElementById("timer").innerText = minutes.toString() + " : " + ("00" + seconds.toString()).slice(-2);
  document.getElementById("starter").innerText = "Start";

  clearInterval(myCounter);

};

function countdown() {
  if (minutes === 0 && seconds === 0) {
    audio.play();
  setTimeout(function() {
     $("#starter").hide();
      reset();
    }, 10000);
   
  } else {

    if (seconds > 0) {
      seconds--;
      document.getElementById("timer").innerText = minutes.toString() + " : " + ("00" + seconds.toString()).slice(-2);
    } else if (seconds === 0 && minutes > 0) {
      minutes--;
      seconds = 59;
      document.getElementById("timer").innerText = minutes.toString() + " : " + ("00" + seconds.toString()).slice(-2);
    }
  }
  //changeColor();?
};

function start() {
  $("#reset").show();

  if (document.getElementById("starter").innerText === "Start" && document.getElementById("timer").innerText.indexOf("25:00") != -1) {
    minutes = 25;
    seconds = 0;
    document.getElementById("timer").innerText = minutes.toString() + " : " + ("00" + seconds.toString()).slice(-2);
    $("#time-setting, #help").slideUp();

    myCounter = setInterval(countdown, 1000);
    //give button "pause" text
    document.getElementById("starter").innerText = "Pause";

  } else if (document.getElementById("starter").innerText === "Start" || document.getElementById("starter").innerText === "Resume") {
    //every second call countdown
    $("#time-setting, #help").slideUp();
    myCounter = setInterval(countdown, 1000);
    //give button "pause" text
    document.getElementById("starter").innerText = "Pause";

  } else if (document.getElementById("starter").innerText === "Pause") {
    $("#time-setting, #help").slideDown();
    document.getElementById("starter").innerText = "Resume";
    clearInterval(myCounter); //stops the timer from running at the interval set above

  }

};

function reset() {
  $("#time-setting, #help").slideDown();
  if (document.getElementById("starter").innerText === "Pause") {
    document.getElementById("starter").innerText = "Start";
  };
  clearInterval(myCounter);

  initialize(document.getElementById("type-display").innerText);

  $("#starter").show();
  $("#reset").hide();

};