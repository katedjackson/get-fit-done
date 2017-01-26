var redirect_uri = chrome.identity.getRedirectURL("get-fit-done");
var client_id = "2284DM";
var auth_url = "https://www.fitbit.com/oauth/authorize/?" +
    "client_id=" + client_id + "&" +
    "response_type=token&" +
    "redirect_uri=" + encodeURIComponent(redirect_uri) +
    "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight";


const signIn = document.getElementById('sign-in');
const signInFitbit.addEventListener('click', chrome.identity.launchWebAuthFlow({'url':auth_url, 'interactive': true},
  function(redirect_url) {
     // extract the token from this url and use it for future requests
     var accessToken = redirect_url.substring(redirect_url.indexOf("=") + 1);
  }
}));
