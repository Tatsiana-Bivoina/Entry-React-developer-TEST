import { getLocalStorageCartData } from '../../controllers/productController';
import { CartActionType, ClearCartActionType } from '../../types/actionsType';
import { CartDataType } from '../../types/productType';

const initialState: CartDataType[] = getLocalStorageCartData() || [];

type ActionsType = CartActionType | ClearCartActionType;

export function cartReducer(state = initialState, action: ActionsType) {
  let stateCopy = [...state];
  switch (action.type) {
    case 'ADD_TO_CART':
      localStorage.setItem('productsInCart', JSON.stringify([...stateCopy, action.payload]));
      return [...stateCopy, action.payload];
    case 'DELETE_FROM_CART':
      const newState = stateCopy.filter((el: CartDataType) => el !== action.payload);
      localStorage.setItem('productsInCart', JSON.stringify(newState));
      return newState;
    case 'EDIT_CART':
      const currentProductIndex = stateCopy.findIndex(
        (el: CartDataType) => el.generatedId === action.payload.generatedId
      );
      stateCopy.splice(currentProductIndex, 1, action.payload);
      localStorage.setItem('productsInCart', JSON.stringify(stateCopy));
      return stateCopy;
    case 'CLEAR_CART':
      localStorage.removeItem('productsInCart');
      stateCopy = [];
      return stateCopy;
    default:
      return stateCopy;
  }
}
