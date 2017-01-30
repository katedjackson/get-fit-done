'use strict';

// why are there node modules in this folder?

var websites;
chrome.storage.sync.get({
  websites: '',
}, function(items) {
  websites = items.websites;

  var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});


  urlsArray.forEach(function(url){
    var regexp = new RegExp(url);
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
      // adding - if (tab.active && changeInfo.status === 'loading') - may speed up the loading of the scripts but lets find the best solution
      if(regexp.test(tab.url)){
        chrome.tabs.executeScript(tabId, {file: "content/src/bundle.js"});
        chrome.tabs.insertCSS(tabId, {file: "content/src/scripts/style.css"});
      }
    })
  })

});
