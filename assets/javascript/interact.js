//global variables
var isLaidOut = false;
$(document).on("keyup", function(ev) {
  if (!isLaidOut) {
    doLayout();
  }
});

function doLayout() {
  $("#rm-logo").animate(
    {
      width: "300px",
      height: "127.5px"
    },
    "fast"
  );
  $("#title").animate({
    fontSize: "3rem",
    marginTop: "-50px",
    height: "50px",
    marginBottom: "0"
  });
  $("#subText").animate(
    {
      opacity: "0"
    },
    "fast"
  );
  $("#banner").animate(
    {
      height: "140px"
    },
    "slow",
    function() {
      $("#banner").attr("class", "header");
    }
  );
  $("body").animate(
    {
      backgroundColor: "#d9d9d9"
    },
    "fast",
    function() {
      $("#title").toggleClass("active");
    }
  );
  $("#subText").remove();
  var container = $("#container");
  //append the message (accessible by .message)
  container.append('<div id="message" >guess a letter</div>');
  //append the clue (accessible by .clue)
  container.append('<div id="clue">____________</div>');
  //append the guesses remaining and letters guessed divs within a flex-row
  var flexRow = $("<div>");
  container.append(flexRow);
  flexRow.attr("class", "flex-row");
  flexRow.append('<div style="padding:10px">Guesses Remaining: <span id="guesses-remaining">12</span></div>');
  flexRow.append('<div style="padding:10px">Letters Guessed: <span id="letters-guessed">...</span></div>');
  //append a tv
  var tv = $("<img>");
  tv.attr("src", "assets/images/rick-tv.png").attr("class", "tv-screen");

  container.append(tv);
  isLaidOut = true;
}
