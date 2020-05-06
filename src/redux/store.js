import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(
  reducers,
  // setup of the redux console dev tools
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
