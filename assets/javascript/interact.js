var isLinkShowing = false;
document.getElementById("repo-icon").onclick = function() {
  var repoLink = document.getElementById("repo-link");
  if (!isLinkShowing) {
    repoLink.innerHTML = 'https://github.com/ejhalpin/word-guess.git <i class="fas fa-clipboard" id="copy" onclick="copy()"></i>';
  } else {
    repoLink.innerHTML = "";
  }
  isLinkShowing = !isLinkShowing;
};

function copy() {
  var area = document.createElement("textarea");
  area.value = "https://github.com/ejhalpin/word-guess.git";
  area.select();
  document.execCommand("copy");
}
