let keys = "abcdefghijklmnopqrstuvwxyz";
//numeric keyboard codes for letter range from a=65 to z=90. to get the codes, simply querry the index of the letter
//in the letters array and add 65.
var keyboard = document.getElementById("keyboard");
var notepad = document.getElementById("notepad");

function doLayout() {
  if (document.getElementById("keyboard").children.length < 2) {
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
    for (var i = 0; i < keys.length; i++) {
      var key = document.getElementById([keys[i]]);
      keyboard.removeChild(key);
    }
  }
}
