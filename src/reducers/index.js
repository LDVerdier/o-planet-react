import { combineReducers } from 'redux';

import dumpReducer from './dumps';
import userReducer from './users';
import filterReducer from './filters';

const rootReducer = combineReducers({
  dumps: dumpReducer,
  users: userReducer,
  filters: filterReducer,
});

export default rootReducer;
