
      // chrome.tabs.executeScript(null, {file: "content/src/bundle.js"});
      // chrome.tabs.insertCSS(null, {file: "content/src/scripts/style.css"});


'use strict';

var websites;
chrome.storage.sync.get({
  websites: '',
}, function(items) {
  websites = items.websites;

  var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});

  urlsArray.forEach(function(url){
    var regexp = new RegExp(url);
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
      if(regexp.test(tab.url)){
        chrome.tabs.executeScript(tabId, {file: "content/src/bundle.js"});
        chrome.tabs.insertCSS(tabId, {file: "content/src/scripts/style.css"});
      }
    })
  })

});
