'use strict';

import React from 'react';

export default () => {
  return (
    <div>
      <h3>Firebase Authentication</h3>
      <div class="quickstart-user-details-container">
        <button id="quickstart-button">Sign-in with Google</button>
        <p>
          Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
          <div>Firebase auth <code>currentUser</code> object value:</div>
          <pre><code id="quickstart-account-details">null</code></pre>
        </p>
      </div>
    </div>
  );
}
