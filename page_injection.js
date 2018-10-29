var githubWideWidthCookieName = "githubWideCookie";
var githubWideWidthDefault = "100";
var targetNode = document.querySelector("body");

function setWidth(width) {
  var elements = document.querySelectorAll(".container");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = width + "%";
  }
}

function setCookie(name, value) {
  document.cookie = name + "=" + (value || "") + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function loadWidthFromCookie() {
  var savedValue = getCookie(githubWideWidthCookieName);

  var localWidth = "";
  if (savedValue == "" || savedValue == null) {
    localWidth = githubWideWidthDefault;
  } else {
    localWidth = savedValue;
  }
  setWidth(localWidth);
  console.log("Setting width too: " + localWidth);
}

function callback(mutationList, observer) {
  mutationList.forEach(mutation => {
    switch (mutation.type) {
      case "attributes":
        /* An attribute value changed on the element in
           mutation.target; the attribute name is in
           mutation.attributeName and its previous value is in
           mutation.oldValue */
        console.log("Updating width since child attributes updated");
        loadWidthFromCookie();
        break;
    }
  });
}

// Set an observer for when the page changes (github is a single page app so it doesn't reload the page
// when a user is navagating around)
var observerOptions = {
  childList: true,
  attributes: true,
  subtree: true
};
var observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);

// When page loads add a listener for when the addon sends a new width request
browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  setWidth(request.width);
  setCookie(githubWideWidthCookieName, request.width);
  console.log(request.width);
  return Promise.resolve({
    response: "Updated Webpage with new width: " + request.width
  });
});

// On the first time the page is loaded update the width to the previous set width, or the default
loadWidthFromCookie();
console.log("Loaded Github Wide Page Listener");
