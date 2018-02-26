import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import { getLocally } from './actions/index';
import { initiateLoginFromCallback } from './actions/users';
const store = configureStore();
const userData = getLocally('userdata');
if (userData) store.dispatch(initiateLoginFromCallback(userData));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
