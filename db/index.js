var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// Leave out Storage
//require("firebase/storage");

var config = {
  apiKey: "AIzaSyB19ahpVY8WsJOZf1Yxzd8Y5wTaWX7Myls",
  authDomain: "get-fit-done.firebaseapp.com",
  databaseURL: "https://get-fit-done.firebaseio.com",
  storageBucket: "get-fit-done.appspot.com",
  messagingSenderId: "847708992152"
};
firebase.initializeApp(config);
