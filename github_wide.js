window.onload = function(e) {
  console.log("Loaded Github Wide Addon");

  var githubWideWidthCookieName = "githubWideWidthCookie";
  var githubWideWidthDefault = "100";
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  var err = document.getElementById("err");
  var githubUrlRegex = ".*\:\/\/.*github\.com\/.*";

  // Save value user defines with the slider
  function setSavedData(newValue) {
    var githubWideCookie = {
      name: githubWideWidthCookieName,
      value: newValue
    };
    console.log("Setting Saved Data: " + newValue);
    browser.storage.local.set(githubWideCookie);
  }

  // Update addon ui id="demo" with the new width
  function updateAddonUIPercent(width) {
    console.log("Setting slider width too: " + width);
    output.innerHTML = width + "%";
  }

  // Update slider with a new width
  function updateAddonUISlider(width) {
    console.log("Setting slider width too: " + width);
    slider.value = width;
  }

  function isGithubURL(tempURL) {
    var patt = new RegExp(githubUrlRegex);
    return patt.test(tempURL);
  }

  // Sends data to the listener running in the webpage
  function sendMessageToWebpage(newWidth) {
    console.log("Sending new width to webpage: " + newWidth);

    function onError(error) {
      if (error !== null){
        console.error("Error: " + error);
      }
    }

    function send(tabs) {
      // We can't save the preference if there is no github page open since
      // the preference is stored as a cookie in the webpage
      var foundGithubTab = false;

      // Loop through all the tabs looking for an open github tab
      for (let tab of tabs) {

        // Update github webpages that are open with new width
        if (isGithubURL(tab.url)) {
          foundGithubTab = true;
          browser.tabs
            .sendMessage(tab.id, {
              width: newWidth
            })
            .then(response => {
              setSavedData(newWidth);

              console.log("Succesfully Set width to: " + newWidth + "! :)");
              console.log(response.response);
            })
            .catch(onError);
        }
      }

      if (!foundGithubTab) {
        console.log("Failed to set new width! :(")
        err.innerHTML = "Failed to save your new width. Open a github page";
      }
    }

    // Gather all the open tabs
    browser.tabs
      .query({})
      .then(send)
      .catch(onError);
  }

  // Load the previously stored width from storage
  browser.storage.local.get().then(function(options) {
    console.log("Loaded Storage");
    console.log(options);

    var localWidth = "";
    if (options.value === undefined) {
      localWidth = githubWideWidthDefault;
    } else {
      localWidth = options.value;
    }
    updateAddonUIPercent(localWidth);
    updateAddonUISlider(localWidth);
  });

  // Define listener for when the user moves the slider
  slider.oninput = function() {
    console.log("Atempting to set new width: " + this.value);
    sendMessageToWebpage(this.value);
    updateAddonUIPercent(this.value);
  };
};
