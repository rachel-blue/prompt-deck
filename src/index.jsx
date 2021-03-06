import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import 'bootstrap/scss/bootstrap.scss';
import App from './app/App';
import storeInit from './redux/store';

/* istanbul ignore file */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInit()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
