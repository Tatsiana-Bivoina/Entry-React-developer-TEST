import { QuickShopActionType } from '../../types/actionsType';

const initialState = {
  isQuickShopPDPModalOpen: false,
  isQuickShopPLPModalOpen: false,
};

export function quickShopReducer(state = initialState, action: QuickShopActionType) {
  switch (action.type) {
    case 'TOGGLE_QUICK_SHOP_PDP_MODAL':
      return Object.assign({}, state, {
        isQuickShopPDPModalOpen: action.payload,
      });
    case 'TOGGLE_QUICK_SHOP_PLP_MODAL':
      return Object.assign({}, state, {
        isQuickShopPLPModalOpen: action.payload,
      });
    default:
      return state;
  }
}
