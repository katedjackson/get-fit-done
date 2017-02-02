//--------Fitbit OAuth2 Integration--------//
const axios = require('axios');

const redirect_uri = chrome.identity.getRedirectURL();
const client_id = "2284D2";
const auth_url = "https://www.fitbit.com/oauth2/authorize/?" +
    "response_type=token&" +
    "client_id=" + client_id + "&" +
    "redirect_uri=" + encodeURIComponent(redirect_uri) +
    "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight" +
    "&expires_in=120";

export const fitbitAuth = () => {
  chrome.identity.launchWebAuthFlow({'url':auth_url, 'interactive': true},
  function(redirect_url) {
     // extract the token from this url and use it for future requests
     const accessToken = redirect_url.substring(redirect_url.indexOf("=") + 1, redirect_url.indexOf("&user_id"));

     axios.get('https://api.fitbit.com/1/user/-/activities/date/2017-01-26.json', { headers: {'Authorization': 'Bearer ' + accessToken}})
     .then(response => {
       console.log(response.data.summary.steps);
     })
  });
};
