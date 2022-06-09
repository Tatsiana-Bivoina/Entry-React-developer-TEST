import { CartActionType } from '../../types/actionsType';
import { CartDataType } from '../../types/productType';

const initialState: CartDataType[] = [];

export function cartReducer(state = initialState, action: CartActionType) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    default:
      return state;
  }
}
