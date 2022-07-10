import { QuickShopActionType } from '../../types/actionsType';

const initialState = {
  isQuickShopModalOpen: false,
};

export function quickShopReducer(state = initialState, action: QuickShopActionType) {
  switch (action.type) {
    case 'TOGGLE_QUICK_SHOP_MODAL':
      return Object.assign({}, state, {
        isQuickShopModalOpen: action.payload,
      });
    default:
      return state;
  }
}
