//--------Fitbit OAuth2 Integration--------//
const redirect_uri = chrome.identity.getRedirectURL();
const client_id = '2284D2';
const auth_url = 'https://www.fitbit.com/oauth2/authorize/?' +
    'response_type=token&' +
    'client_id=' + client_id + '&' +
    'redirect_uri=' + encodeURIComponent(redirect_uri) +
    '&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight' +
    '&expires_in=31536000'//+
    //'&prompt=consent';

export const fitbitAuth = () => {
  return new Promise(function (resolve, reject) {
    chrome.identity.launchWebAuthFlow({ 'url': auth_url, 'interactive': true},
      function(redirect_url) {
        console.log('redirectURL:',redirect_url);
         // extract the token from this url and use it for future requests
         let accessToken = redirect_url.substring(redirect_url.indexOf('=') + 1, redirect_url.indexOf('&user_id'));
         resolve(accessToken);
      });
  });
};
