import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';

import api from 'src/middlewares/api';
import auth from 'src/middlewares/auth';
import filters from 'src/middlewares/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(api, auth, filters),
);

const store = createStore(reducer, enhancers);

export default store;
