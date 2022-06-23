import { combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';
import { currencyReducer } from './reducers/currencyReducer';
import { currentProductIdReducer } from './reducers/currentProductIdReducer';
import { defaultPricesReducer } from './reducers/defaultPricesReducer';
import { modalCartReducer } from './reducers/modalCartReducer';
import { productsDataReducer } from './reducers/productsDataReducer';
import { totalDataCountReducer } from './reducers/totalDataCountReducer';

export const rootReducer = combineReducers({
  productsDataReducer,
  currentProductIdReducer,
  cartReducer,
  currencyReducer,
  modalCartReducer,
  totalDataCountReducer,
  defaultPricesReducer,
});
