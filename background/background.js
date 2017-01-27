//ACTUAL PROJECT INFO
// const redirect_uri = chrome.identity.getRedirectURL();
// const client_id = "2284D2";
// const auth_url = "https://www.fitbit.com/oauth2/authorize/?" +
//     "response_type=code&" +
//     "client_id=" + client_id + "&" +
//     "redirect_uri=" + encodeURIComponent(redirect_uri) +
//     "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight" +
//     "&expires_in=604800";

//TEST APP INFO
const redirect_uri = chrome.identity.getRedirectURL();
const client_id = "22849Z";
const auth_url = "https://www.fitbit.com/oauth2/authorize/?" +
    "response_type=code&" +
    "client_id=" + client_id + "&" +
    "redirect_uri=" + encodeURIComponent(redirect_uri) +
    "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight" +
    "&expires_in=604800";

const fitbitAuth = () => {
  chrome.identity.launchWebAuthFlow({'url':auth_url, 'interactive': true},
  function(redirect_url) {
     // extract the token from this url and use it for future requests
     const accessToken = redirect_url.substring(redirect_url.indexOf("=") + 1);
  });
};

console.log(accessToken);
