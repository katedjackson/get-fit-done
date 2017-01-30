'use strict';

var websites;
chrome.storage.sync.get({
  websites: '',
}, function(items) {
  websites = items.websites;

  var urlsArray = websites.split(",").map(function(url){return "*://*." + url.trim() + "/*"});

  chrome.webRequest.onBeforeRequest.addListener(
    function () {
      chrome.tabs.executeScript(null, {file: "content/src/bundle.js"});
      chrome.tabs.insertCSS(null, {file: "content/src/scripts/style.css"});
    },
    {
      urls: urlsArray,
      types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    }
  );
});


