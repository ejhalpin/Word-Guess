//global variables
isLaid = false;
var isPlaying = false;
var complete = false;
var currentClue;

var pageObjects = {
  container: $("#container"),
  introLayer: $("#intro-layer"),
  header: $("#header"),
  box: $("#box"),
  messages: $("#messages"),
  tv: $("#tv"),
  introMessage: $(".h2"),
  introBox: $("#intro-box"),
  lettersGuessed: $("#letters-guessed"),
  guessesRemaining: $("#guesses-remaining"),
  wins: $("#wins"),
  word: $("#word"),
  frame: $("#frame")
};

var message = {
  message: [
    "Use the keyboard keys to guess a letter.",
    "Guess a letter",
    "You've already guessed that letter.",
    "Nice job. You Won. Press any key to play again.",
    "Too bad. You Lost. Press any key to play again.",
    "Way to go. You solved all of the puzzles. Refresh the page to play again."
  ],
  post: function(n) {
    pageObjects.messages.text(this.message[n]);
    if (n === 2) {
      this.revert(1);
    }
  },
  revert: function(m) {
    window.setTimeout(function() {
      pageObjects.messages.text(this.message[m]);
    }, 1500);
  }
};

var clues = [
  {
    clue: "Rick Sanchez",
    clip: "assets/videos/rick.mp4",
    solved: false
  },
  {
    clue: "Morty",
    clip: "assets/videos/morty.mp4",
    solved: false
  },
  {
    clue: "Jerry Smith",
    clip: "assets/videos/jerry.mp4",
    solved: false
  },
  {
    clue: "Beth Smith",
    clip: "assets/videos/beth.mp4",
    solved: false
  },
  {
    clue: "Summer",
    clip: "assets/videos/summer.mp4",
    solved: false
  },
  {
    clue: "Jan Michael Vincent",
    clip: "assets/videos/jan.mp4",
    solved: false
  },
  {
    clue: "Mr poopy Butthole",
    clip: "assets/videos/butthole.mp4",
    solved: false
  },
  {
    clue: "Stealy",
    clip: "assets/videos/stealy.mp4",
    solved: false
  },
  {
    clue: "Babylegs",
    clip: "assets/videos/babylegs.mp4",
    solved: false
  },
  {
    clue: "Lil Bits",
    clip: "assets/videos/lilbits.mp4",
    solved: false
  },
  {
    clue: "Two Brothers",
    clip: "assets/videos/2brothers.mp4",
    solved: false
  },
  {
    clue: "Pickle Rick",
    clip: "assets/videos/pickle.mp4",
    solved: false
  },
  {
    clue: "Jaguar",
    clip: "assets/videos/jaguar.mp4",
    solved: false
  }
];

function fetch() {
  wipe();
  var cluesRemaining = clues.filter(function(element) {
    return !element.solved;
  });

  var dex = Math.floor(Math.random() * cluesRemaining.length);
  currentClue = cluesRemaining[dex];
  var text = "";
  for (var i = 0; i < currentClue.clue.length; i++) {
    var char = currentClue.clue[i];
    if (char === " ") {
      text = text + " ";
    } else {
      text = text + "_";
    }
  }
  pageObjects.word.text(text);
  message.post(1);
}

function wipe() {
  currentClue = new Object();
  pageObjects.tv.empty();
  pageObjects.tv.append(pageObjects.frame);
  pageObjects.lettersGuessed.empty();
  pageObjects.word.empty();
  pageObjects.guessesRemaining.text(12);
}

function parse(l) {
  if (pageObjects.lettersGuessed.text().includes(l) || pageObjects.word.text().includes(l)) {
    message.post(2);
    return;
  }
  var word = pageObjects.word.text();
  var target = currentClue.clue;
  console.log(target);
  var text = "";
  if (target.toLowerCase().includes(l)) {
    for (var i = 0; i < target.length; i++) {
      if (target[i].toLowerCase() === l) {
        text = text + target[i];
      } else {
        text = text + word[i];
      }
    }
    pageObjects.word.text(text);
  } else {
    pageObjects.lettersGuessed.append(l);
    var rem = parseInt(pageObjects.guessesRemaining.text());
    rem--;
    pageObjects.guessesRemaining.text(rem);
  }

  check();
}

function check() {
  if (parseInt(pageObjects.guessesRemaining.text()) === 0) {
    message.post(4);
    isPlaying = false;
    //play an audioclip
    return;
  }

  if (!pageObjects.word.text().includes("_")) {
    clues[clues.indexOf(currentClue)].solved = true;
    message.post(3);
    var w = parseInt(pageObjects.wins.text());
    w++;
    pageObjects.wins.text(w);
    pageObjects;
    var video = $('<video id="video" width="100%" height="100%" autoplay controls>');
    video.attr("src", currentClue.clip);
    pageObjects.frame.detach();
    pageObjects.tv.append(video);

    //see if there are any more clues left...
    var cluesRemaining = this.clues.filter(function(element) {
      return !element.solved;
    });
    if (cluesRemaining.length === 0) {
      complete = true;
      return;
    }

    isPlaying = false;
  }
}

$(document).ready(function() {
  //set the background image size based on the load screen height
  //the magic width to height ratio is 1.78 - but I'm going to fudge it to 1.5
  checkScreenRatio();
  //do the same check when the window is resized
  $(window).resize(function() {
    checkScreenRatio();
  });

  $(document).on("click", function() {
    if (!isLaid) {
      playIntro();
      isLaid = true;
      fetch();
      isPlaying = true;
    }
  });

  $(document).on("keyup", function(event) {
    if (!isLaid) {
      playIntro();
      isLaid = true;
    }
    if (complete) {
      message.post(5);
      return;
    }
    var code = event.keyCode;
    if (code < 65 || code > 90) {
      message.post(0);
      return;
    }
    var letter = event.key.toLowerCase();
    if (isPlaying) {
      parse(letter);
    } else {
      fetch();
      isPlaying = true;
    }
  });
});

function playIntro() {
  pageObjects.introLayer.animate(
    {
      width: "0",
      height: "0",
      left: "50%",
      top: "50%",
      fontSize: "0"
    },
    "slow",
    function() {
      pageObjects.introLayer.remove();
      pageObjects.container.toggleClass("visible");
      pageObjects.header.animate({ opacity: "1" }, "fast");
      pageObjects.box.animate({ opacity: "1" }, "slow");
      fetch();
      isPlaying = true;
    }
  );
}

function checkScreenRatio() {
  // if (isLaid) {
  //   return;
  // }
  var width = $(window).width();
  var height = $(window).height();
  var ratio = width / height;
  if (ratio >= 1.78) {
    pageObjects.introLayer.css("background-size", "100vw 56.18vw");
  } else {
    pageObjects.introLayer.css("background-size", "178vh 100vh");
  }
}
