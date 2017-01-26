const axios = require('axios');

var fitbitAuth = new OAuth2('fitbit', {
  client_id: '2284DM',
  client_secret: '0f49bce2bd562b7f43657fc7431c8642',
  api_scope: 'activity, heartrate, location, nutrition, profile, settings, sleep, social, weight'
});

fitbitAuth.authorize(function() {
  axios.head('https://api.fitbit.com/oauth2/token' + fitbitAuth.getAccessToken());
});
