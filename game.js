var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).keydown(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextsequence(level);
    started = true;
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  var sz = userClickedPattern.length;
  checkAnswer(sz - 1);
});

function nextsequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  makeSound(randomChosenColour);

  // nextsequence();
}

function checkAnswer(currLevel) {
    if (userClickedPattern[currLevel] == gamepattern[currLevel]) {
      if (currLevel == gamepattern.length - 1) {
        setTimeout(nextsequence(), 100);
      }
    } else {
      makeSound("wrong");
  
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
  
      $("h1").text("Oops!You Lost. Press Any Key to Restart");
      startOver();
    }
  }

  function startOver() {
      level=0;
      gamepattern= [];
      userClickedPattern = [];
      started = false;
    }
function animateFlash(colour) {
  $("#" + colour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
function animatePress(currcolour) {
  $("#" + currcolour).addClass("pressed");
  setTimeout(function () {
    $("#" + currcolour).removeClass("pressed");
  }, 100);
}
function makeSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}
