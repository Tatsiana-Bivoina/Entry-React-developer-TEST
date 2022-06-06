import { combineReducers } from 'redux';
import { currentProductIdReducer } from './reducers/currentProductIdReducer';
import { productsDataReducer } from './reducers/productsDataReducer';

export const rootReducer = combineReducers({
  productsDataReducer,
  currentProductIdReducer,
});
