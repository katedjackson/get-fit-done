var fitbitAuth = new OAuth2('fitbit', {
  client_id: '2284DM',
  client_secret: '0f49bce2bd562b7f43657fc7431c8642',
  api_scope: 'activity, heartrate, location, nutrition, profile, settings, sleep, social, weight'
});


fitbitAuth.authorize(function() {
  const signIn = document.getElementById('sign-in');

  signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'OAuth ' + fitbitAuth.getAccessToken());
  });

});


