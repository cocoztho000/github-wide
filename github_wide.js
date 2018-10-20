
console.log("Hi")
/*
Just draw a border round the document.body.
*/
var elements = document.querySelectorAll('.container');
for(var i=0; i<elements.length; i++){
    elements[i].style.width = "100%";
}

var githubWideWidthCookieName = "githubWideWidthCookie"


function setCookie(name, value, days) {
    var githubWideCookie = {
        name: githubWideWidthCookieName,
        value: value
    }
    browser.storage.local.set(value)
}
function getCookie(name) {
    return browser.storage.local.get("githubWideCookie")
}

function insertCSS(width) {
    var css = "body { border: 20px dotted pink; }";
    browser.tabs.insertCSS({ code: css });
}

var githubWideWidthDefault = "100"
var savedValue = getCookie(githubWideWidthCookieName)

var localWidth = ""
if (savedValue == "") {
    localWidth = githubWideWidthDefault
} else {
    localWidth = savedValue
}
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
output.innerHTML = output.innerHTML + "%"

slider.oninput = function () {
    console.log(this.value)
    output.innerHTML = this.value;
    output.innerHTML = output.innerHTML + "%"
    setCookie(githubWideWidthCookieName, this.value, 1000)
}

var elements = document.querySelectorAll('.container');
for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = localWidth + "%";
}

// Use this to detect when the css was update to override it
// // var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutationRecord) {
//         console.log('style changed!');
//     });    
// });

// var target = document.getElementById('myId');
// observer.observe(target, { attributes : true, attributeFilter : ['style'] });

