'use strict';

var websites;
chrome.storage.sync.get({
  websites: '',
}, function(items) {
  websites = items.websites;

  var urlsArray = websites.split(",").map(function(url){return "*://*." + url.trim() + "/*"});

  chrome.webRequest.onBeforeRequest.addListener(
    function () {
      return {redirectUrl: chrome.extension.getURL('background/index.html')};
    },
    {
      urls: urlsArray,
      types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
  );
});


