import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/App';

const store = new Store({
  portName: 'GET_FIT_DONE' // communication port name
});

const unsubscribe = store.subscribe(() => {
  unsubscribe();
  render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('app'));

})
