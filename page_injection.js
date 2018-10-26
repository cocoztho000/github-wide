githubWideWidthCookieName = "githubWideCookie"

function setWidth(width) {
  var elements = document.querySelectorAll(".container");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = width + "%";
  }
}

function setCookie(name,value) {
  document.cookie = name + "=" + (value || "")  + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  setWidth(request.width);
  setCookie(githubWideWidthCookieName, request.width);
  console.log(request.width);
  return Promise.resolve({ response: "Updated Webpage with new width: " +request.width });
});

console.log("Loaded Github Wide Page Listener");
console.log("here1");

var githubWideWidthDefault = "100";
console.log("here");
var savedValue = getCookie(githubWideWidthCookieName);
console.log("Loaded Github Wide Page Listener");

var localWidth = "";
if (savedValue == "" || savedValue == null) {
  localWidth = githubWideWidthDefault;
} else {
  localWidth = savedValue;
}
setWidth(localWidth);
console.log("Setting width too: " + localWidth);
