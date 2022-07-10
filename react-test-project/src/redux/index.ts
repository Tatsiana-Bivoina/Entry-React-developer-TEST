import { combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';
import { currencyReducer } from './reducers/currencyReducer';
import { currencySwitcherReducer } from './reducers/currencySwitcherReducer';
import { currentProductIdReducer } from './reducers/currentProductIdReducer';
import { modalCartReducer } from './reducers/modalCartReducer';
import { productsDataReducer } from './reducers/productsDataReducer';
import { quickShopReducer } from './reducers/quickShopReducer';
import { totalDataCountReducer } from './reducers/totalDataCountReducer';

export const rootReducer = combineReducers({
  productsDataReducer,
  currentProductIdReducer,
  cartReducer,
  currencyReducer,
  modalCartReducer,
  totalDataCountReducer,
  currencySwitcherReducer,
  quickShopReducer,
});
