import { CartActionType, ClearCartActionType } from '../../types/actionsType';
import { CartDataType } from '../../types/productType';

const initialState: CartDataType[] = [];

type ActionsType = CartActionType | ClearCartActionType;

export function cartReducer(state = initialState, action: ActionsType) {
  const stateCopy = [...state];
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...stateCopy, action.payload];
    case 'DELETE_FROM_CART':
      const newState = stateCopy.filter((el: CartDataType) => el !== action.payload);
      return newState;
    case 'EDIT_CART':
      const currentProductIndex = stateCopy.findIndex(
        (el: CartDataType) => el.generatedId === action.payload.generatedId
      );
      stateCopy.splice(currentProductIndex, 1, action.payload);
      return stateCopy;
    case 'CLEAR_CART':
      return initialState;
    default:
      return stateCopy;
  }
}
