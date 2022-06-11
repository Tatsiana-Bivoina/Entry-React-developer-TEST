import { CurrencyActionType } from '../../types/actionsType';
import { CurrencyType } from '../../types/productType';

const initialState: CurrencyType = {
  currentCurrency: '$',
};

export function currencyReducer(state = initialState, action: CurrencyActionType) {
  switch (action.type) {
    case 'CHANGE_CURRENCY':
      return Object.assign({}, state, {
        currentCurrency: action.payload,
      });
    default:
      return state;
  }
}
