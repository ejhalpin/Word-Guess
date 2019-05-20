document.onkeyup = function() {
  play(event);
};
var start = false;

function play(event) {
  if (!start) {
    start = true;
    updateMessage(1);
    loadWord();
    return;
  }
  var key = event.key;
  //check to see if key has been guessed...
  if (lettersGuessed.indexOf(key) == -1) {
    lettersGuessed = lettersGuessed + " " + key; //clean this up so it displays nicely
    guessed.textContent = lettersGuessed;
  } else {
    updateMessage(2);
    return;
  }

  if (currentWord.toLowerCase().includes(key)) {
    var newDisplay = "";
    for (var j = 0; j < currentWord.length; j++) {
      var l = currentWord[j];
      if (l.toLowerCase() == key) {
        newDisplay = newDisplay + l;
      } else {
        newDisplay = newDisplay + displayWord[j];
      }
    }
    displayWord = newDisplay;
    wordElement.textContent = displayWord;
  } else {
    guessesRemaining--;
  }
  if (guessesRemaining == 0) {
    updateMessage(3);
    displayWord = "";
    start = false;
  }
  //check the endgame condition
  if (!displayWord.includes("_")) {
    updateMessage(messages.length - 1);
    displayWord = "";
    start = false;
  }
}

function loadWord() {
  var remain = words.filter(check); //make an array of unused words
  if (remain.length == 0) {
    updateMessage(4);
    return;
  }

  currentWord = remain[Math.floor(Math.random() * (remain.length - 1))];

  for (var i = 0; i < currentWord.length; i++) {
    var l = currentWord[i];
    if (l == " ") {
      displayWord = displayWord + l;
    } else {
      displayWord = displayWord + "_";
    }
  }
  wordElement.textContent = displayWord;
  remain.push(currentWord);
}

function check(word) {
  return used.indexOf(word) == -1;
}

var messages = [
  "Press any key to get started",
  "Nothing you do matters. Your existence is a lie.",
  "Pay attention. This isn't school. This is life. Okay, fine - this is a game. But come on.",
  "Game Over. Press any key to start over.",
  "You got em all.",
  "Nice job, I guess. That's something you need to hear right? Fine. Nice Job. Press a key to play again."
];

var wordElement = document.getElementById("word");
var lettersGuessed = "";
var guessed = document.getElementById("letters-guessed");
var guessesRemaining = 12;
