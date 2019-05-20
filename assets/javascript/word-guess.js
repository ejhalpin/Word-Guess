document.onkeyup = function(event) {
  if (complete) {
    message.post(5);
    return;
  }
  var keys = "abcdefghijklmnopqrstuvwxyz";
  var l = event.key.toLowerCase();
  if (!keys.includes(l)) {
    message.post(6);
    if (isPlaying) {
      message.revert(1);
    } else {
      message.revert(0);
    }
    return;
  }
  play(l);
};

var isPlaying = false;
var complete = false;

var message = {
  message: [
    "Press any key to begin.",
    "Guess a letter",
    "You've already guessed that letter.",
    "Nice job. You Won. Press any key to play again.",
    "Too bad. You Lost. Press any key to play again.",
    "Way to go. You solved all of the puzzles. Refresh the page to play again.",
    "Use only the letter keys when playing this game."
  ],
  post: function(n) {
    document.getElementById("message").textContent = this.message[n];
    if (n === 2) {
      this.revert(1);
    }
  },
  revert: function(m) {
    window.setTimeout(function() {
      document.getElementById("message").textContent = message.message[m];
    }, 700);
  }
};

var game = {
  clue: [
    {
      clue: "Rick Sanchez",
      clip: "https://www.youtube.com/embed/MVwv26Q1pVU?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Morty",
      clip: "https://www.youtube.com/embed/-tGL-buZ94Y?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Jerry Smith",
      clip: "https://www.youtube.com/embed/DuqMg2MkXKE?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Beth Smith",
      clip: "https://www.youtube.com/embed/-eB09QMZ2OQ?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Summer",
      clip: "https://www.youtube.com/embed/UBzQA9gn3UY?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Jan Michael Vincent",
      clip: "https://www.youtube.com/embed/nLB4dU3Yc6M?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Mr poopy Butthole",
      clip: "https://www.youtube.com/embed/JfQ7t6IbF_A?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Stealy",
      clip: "https://www.youtube.com/embed/34WL_07WEIs?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Babylegs",
      clip: "https://www.youtube.com/embed/XFtEcbEOwR0?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Lil Bits",
      clip: "https://www.youtube.com/embed/Gj4-E5Hs3Kc?controls=0&amp;autoplay=1",
      solved: false
    },
    {
      clue: "Two Brothers",
      clip: "https://www.youtube.com/embed/ba9k5SWwE38?controls=0&amp;autoplay=1",
      solved: false
    }
  ],
  currentClue: "",
  currentObject: new Object(),
  displayText: "",
  lettersGuessed: "",
  site: "",
  wordElement: document.getElementById("word"),
  lettersGuessedElement: document.getElementById("letters-guessed"),
  guessesRemainingElement: document.getElementById("guesses-remaining"),
  winsElement: document.getElementById("wins"),

  fetch: function() {
    var clues = this.clue.filter(function(element) {
      return !element.solved;
    });

    var dex = Math.floor(Math.random() * (clues.length - 1));
    this.currentClue = clues[dex].clue;
    console.log(this.currentClue);
    this.currentObject = clues[dex];
    this.site = clues[dex].clip;

    var text = "";
    for (var i = 0; i < this.currentClue.length; i++) {
      var l = this.currentClue[i];
      if (l === " ") {
        text = text + " ";
      } else {
        text = text + "_";
      }
    }
    this.displayText = text;
    this.wordElement.textContent = this.displayText;
  },

  wipe: function() {
    this.currentClue = "";
    this.displayText = "";
    this.lettersGuessed = "";
    this.wordElement.textContent = "";
    this.lettersGuessedElement.textContent = "";
    this.site = "";
    this.guessesRemainingElement.textContent = "12";
    this.currentObject = new Object();
  },

  parse: function(l) {
    if (this.lettersGuessed.includes(l) || this.displayText.toLowerCase().includes(l)) {
      message.post(2);
      return;
    }
    var text = "";
    if (this.currentClue.toLowerCase().includes(l)) {
      for (var i = 0; i < this.currentClue.length; i++) {
        if (this.currentClue[i].toLowerCase() === l) {
          text = text + this.currentClue[i];
        } else {
          text = text + this.displayText[i];
        }
      }
      this.displayText = text;
      this.wordElement.textContent = this.displayText;
    } else {
      this.lettersGuessed = this.lettersGuessed + " " + l;
      this.lettersGuessedElement.textContent = this.lettersGuessed;
      var rem = parseInt(this.guessesRemainingElement.textContent);
      rem--;
      this.guessesRemainingElement.textContent = rem.toString();
    }
  },

  check: function() {
    if (parseInt(this.guessesRemainingElement.textContent) === 0) {
      message.post(4);
      this.wipe();
      isPlaying = false;
      return;
    }

    if (!this.displayText.includes("_")) {
      this.clue[this.clue.indexOf(this.currentObject)].solved = true;
      message.post(3);
      var w = parseInt(this.winsElement.innerHTML);
      w++;
      this.winsElement.textContent = w.toString();
      document.getElementById("solution").innerHTML = this.displayText;
      document.getElementById("video").src = this.site;
      //see if there are any more clues left...
      var clues = this.clue.filter(function(element) {
        return !element.solved;
      });
      if (clues.length === 0) {
        complete = true;
        return;
      }

      this.wipe();
      isPlaying = false;
    }
  },

  load: function() {}
};

function play(l) {
  if (!isPlaying) {
    game.fetch();
    message.post(1);
    isPlaying = true;
    return;
  }
  game.parse(l);
  game.check();
}

var keyboard_display = false;
let keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
//numeric keyboard codes for letter range from a=65 to z=90. to get the codes, simply querry the index of the letter
//in the letters array and add 65.
var keyboard = document.getElementById("keyboard");
var notepad = document.getElementById("notepad");

function doLayout() {
  if (document.getElementById("keyboard").children.length == 0) {
    for (var i = 0; i < keys.length; i++) {
      var key = document.createElement("div");
      key.id = keys[i];
      key.style.gridArea = keys[i];
      key.textContent = keys[i];
      key.className = "key";
      key.onclick = function() {
        var event_name = "keyup";
        var event = document.createEvent("HTMLEvents");
        event.initEvent(event_name, true, false);
        event.key = this.id;
        document.dispatchEvent(event);
      };
      keyboard.appendChild(key);
    }
    return;
  } else {
    //var keyboard = document.getElementById("keyboard");
    for (var i = 0; i < keys.length; i++) {
      var key = document.getElementById([keys[i]]);
      keyboard.removeChild(key);
    }
  }
}
