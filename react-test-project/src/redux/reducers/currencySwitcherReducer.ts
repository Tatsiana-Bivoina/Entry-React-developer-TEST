import { CurrencySwitcherActionType } from '../../types/actionsType';

const initialState = {
  isCurrencySwitcherOpen: false,
};

export function currencySwitcherReducer(state = initialState, action: CurrencySwitcherActionType) {
  switch (action.type) {
    case 'TOGGLE_CURRENCY_SWITCHER':
      return Object.assign({}, state, {
        isCurrencySwitcherOpen: action.payload,
      });
    default:
      return state;
  }
}
