import { getLocalStorageDefaultPrices } from '../../controllers/productController';
import { DefaultPriceActionType } from '../../types/actionsType';
import { DefaultPricesType } from '../../types/productType';

const initialState: DefaultPricesType[] = getLocalStorageDefaultPrices() || [];

export function defaultPricesReducer(state = initialState, action: DefaultPriceActionType) {
  const stateCopy = [...state];
  switch (action.type) {
    case 'ADD_DEFAULT_PRICES':
      const currentProductIndex = stateCopy.findIndex(
        (el: DefaultPricesType) => el.id === action.payload.id
      );
      if (currentProductIndex !== -1) return stateCopy;
      localStorage.setItem('defaultPrices', JSON.stringify([...stateCopy, action.payload]));
      return [...stateCopy, action.payload];
    default:
      return stateCopy;
  }
}
