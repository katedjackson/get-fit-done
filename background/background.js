'use strict';

// import rg from 'rangen'

//Retrieve user preferences, then execute a callback function that redirects to the "Stop wasting time page" if user navigates to a specified website during specified time.
var startTime, endTime, startDay, endDay, websites, always;
chrome.storage.sync.get({
  // startTime: '',
  // endTime: '',
  // startDay: '',
  // endDay: '',
  // websites: '',
  // always: ''
}, function(items) {
  // startTime = Number(items.startTime);
  // endTime = Number(items.endTime);
  // startDay = Number(items.startDay);
  // endDay = Number(items.endDay);
  // websites = items.websites;
  // always = items.always;

  //var urlsArray = websites.split(",").map(function(url){return "*://*." + url.trim() + "/*"});
  var urlsArray = ["*://*.facebook.com/*"]

  chrome.webRequest.onBeforeRequest.addListener(
    function () {
      // var currentTime = new Date();
      // var hour = currentTime.getHours();
      // var day = currentTime.getDay();

      //if (always) {
        return {redirectUrl: chrome.extension.getURL('background/src/index.html')};
      // }

      // if (startTime < endTime && startDay <= endDay){
      //   if ((hour >= startTime && hour < endTime) && (day >= startDay  && day <= endDay)) {
      //     return {redirectUrl: chrome.extension.getURL('index.html')};
      //   }
      // }

      // if (startTime > endTime && startDay <= endDay){
      //   if ((hour >= startTime || hour < endTime) && (day >= startDay  && day <= endDay)) {
      //     return {redirectUrl: chrome.extension.getURL('index.html')};
      //   }
      // }

      // if (startTime < endTime && startDay > endDay){
      //   if ((hour >= startTime && hour < endTime) && (day >= startDay || day <= endDay)) {
      //     return {redirectUrl: chrome.extension.getURL('index.html')};
      //   }
      // }

      // if (startTime > endTime && startDay > endDay){
      //   if ((hour >= startTime || hour < endTime) && (day >= startDay || day <= endDay)) {
      //     return {redirectUrl: chrome.extension.getURL('index.html')};
      //   }
      // }

    },

    {
      urls: urlsArray,
      types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },

    ["blocking"]
  );

});
