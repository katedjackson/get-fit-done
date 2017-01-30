import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/App';

if (!document.getElementById('rcr-anchor')) {
  const anchor = document.createElement('div');
  anchor.id = 'rcr-anchor';
  //what is react-chrome-redux doing for you in the long run? what is going to be on the store
  document.body.insertBefore(anchor, document.body.childNodes[0]);
  const proxyStore =  new Store({
    state: {},
    portName: 'example'
  });

  render(
    <Provider store={proxyStore}>
      <App/>
    </Provider>
    , document.getElementById('rcr-anchor'));
}
