'use strict';

import {wrapStore} from 'react-chrome-redux';
import { reducer } from './reducers/settings';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import chromeStorage, { loadFromStorage } from './redux/chromeStorage';
import { middleware } from 'redux-async-initial-state';


const keysToPersistInChrome = ['websites'];

// load values for keys to persist from storage into redux store
// perform any initial server requests that are independent
// from login state
const loadStore = (currentState) => {
  const chromeStoragePromise = loadFromStorage(keysToPersistInChrome);

  return Promise.all([
    chromeStoragePromise,
  ])
    .then(([
      loadedChromeStorage,
    ]) => ({
      ...currentState,
      ...loadedChromeStorage,
    }));
};

const store = createStore(reducer, applyMiddleware(createLogger(), chromeStorage(keysToPersistInChrome), thunk, middleware(loadStore))); // a normal Redux store

window.store = store;
wrapStore(store, {portName: 'GET_FIT_DONE'});

var websites;
chrome.storage.sync.get({
  websites: '',
}, function(items) {
  console.log("test!")
  websites = items.websites;
  console.log('background websites: ', websites);
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
