'use strict';

import {wrapStore} from 'react-chrome-redux';
import { reducer } from './reducers/settings';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'


console.log("this is the reducer",reducer)
const store = createStore(reducer, applyMiddleware(createLogger())); // a normal Redux store

window.store = store;
wrapStore(store, {portName: 'GET_FIT_DONE'});

var websites;
chrome.storage.sync.get({
  websites: '',
}, function(items) {
  console.log("test!")
  websites = items.websites;
  console.log(websites);
  var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    urlsArray.forEach(function(url){
      let regexp = new RegExp(url);
      if(regexp.test(tab.url)){
        chrome.tabs.executeScript(tabId, {file: "content/src/bundle.js"});
        chrome.tabs.insertCSS(tabId, {file: "content/src/scripts/style.css"});
      }
    })
  })
});
