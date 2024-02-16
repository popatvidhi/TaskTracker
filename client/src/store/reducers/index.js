import { combineReducers } from 'redux';
import exampleReducer from './ExampleReducer';
import loaderReducer from './loaderReducer';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
import globalReducer from './globalReducer';

/**
 * List of all the reducers
 */

const rootReducer = combineReducers({
  exampleReducer,
  loaderReducer,
  projectReducer,
  userReducer,
  globalReducer,
});

export default rootReducer;
