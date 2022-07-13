import { CurrencyActionType } from '../../types/actionsType';
import { CurrencyType } from '../../types/productTypesList';

const initialState: CurrencyType = {
  currentCurrency: localStorage.getItem('currentCurrency') || '$',
};

export function currencyReducer(state = initialState, action: CurrencyActionType) {
  switch (action.type) {
    case 'CHANGE_CURRENCY':
      localStorage.setItem('currentCurrency', action.payload);
      return Object.assign({}, state, {
        currentCurrency: action.payload,
      });
    default:
      return state;
  }
}
