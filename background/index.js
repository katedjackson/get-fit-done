'use strict';

import {wrapStore} from 'react-chrome-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import chromeStorage, { loadFromStorage } from './redux/chromeStorage';
import { middleware } from 'redux-async-initial-state';


const keysToPersistInChrome = ['settings', 'users' , 'block'];

// load values for keys to persist from storage into redux store
// perform any initial server requests that are independent
// from login state
const loadStore = (currentState) => {
  const chromeStoragePromise = loadFromStorage(keysToPersistInChrome);
  console.log('current state: ', currentState)
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

const store = createStore(rootReducer, applyMiddleware(createLogger(), chromeStorage(keysToPersistInChrome), thunk, middleware(loadStore)));
// a normal Redux store

window.store = store;
wrapStore(store, {portName: 'GET_FIT_DONE'});

/* doesn't block page that was added until extension reloaded */






// var websites;
// chrome.storage.sync.get({
//   settings: {},
// }, function(items) {
//   console.log("test!")
//   websites = items.settings.websites;
//   console.log('background websites: ', websites);
//   var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});

//   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     urlsArray.forEach(function(url){
//       let regexp = new RegExp(url);
//       if(regexp.test(tab.url)){
//         chrome.tabs.executeScript(tabId, {file: "build/content.js"});
//         chrome.tabs.insertCSS(tabId, {file: "content/style.css"});
//       }
//     })
//   })
// });

/*Code above is grabbing websites from chrome storage
  websites is an empty string because the chrome storage hasn't loaded the values yet.

  Code below is trying to grab websites from the state, but the state doesn't have anything yet because loading isn't completed */

  // console.log('background websites: ', store.getState().settings);
  // var websites = store.getState().settings.websites
  // if (websites.length) {
  //   var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});

  //   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  //     urlsArray.forEach(function(url){
  //       console.log('url: ', url);
  //       let regexp = new RegExp(url);
  //       if(regexp.test(tab.url)){
  //         chrome.tabs.executeScript(tabId, {file: "content/src/bundle.js"});
  //         chrome.tabs.insertCSS(tabId, {file: "content/src/scripts/style.css"});
  //       }
  //     })
  //   })
  // }


