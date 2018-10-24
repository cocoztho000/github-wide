console.log("Hi");

window.onload = function(e) {
  /*
Just draw a border round the document.body.
*/
  console.log("onload");

  var githubWideWidthCookieName = "githubWideWidthCookie";

  function setCookie(value) {
    var githubWideCookie = {
      name: githubWideWidthCookieName,
      value: value
    };
    browser.storage.local.set(githubWideCookie);
  }

  function getCookie(name) {
    var githubWideCookie = browser.storage.local.get("githubWideCookie");
    if (githubWideCookie != null) {
      return githubWideCookie.value;
    }
    return "";
  }

  function insertCSS(width) {
    var css = "body { border: 20px dotted pink; }";
    browser.tabs.insertCSS({ code: css });
  }

  function sendMessag(width) {
    function send(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        width: width
      });
    }
    function onError(error) {
      console.error(`Error: ${error}`);
    }
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(send)
      .catch(onError);
  }

  var githubWideWidthDefault = "100";
  var savedValue = getCookie(githubWideWidthCookieName);

  var localWidth = "";
  if (savedValue == "") {
    localWidth = githubWideWidthDefault;
  } else {
    localWidth = savedValue;
  }
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
  output.innerHTML = output.innerHTML + "%";

  slider.oninput = function() {
    console.log(this.value);
    output.innerHTML = this.value;
    output.innerHTML = output.innerHTML + "%";
    // updateWidth(this.value);
    setCookie(this.value);
    sendMessag(this.value);
  };

  // Use this to detect when the css was update to override it
  // // var observer = new MutationObserver(function(mutations) {
  //     mutations.forEach(function(mutationRecord) {
  //         console.log('style changed!');
  //     });
  // });

  // var target = document.getElementById('myId');
  // observer.observe(target, { attributes : true, attributeFilter : ['style'] });
};
