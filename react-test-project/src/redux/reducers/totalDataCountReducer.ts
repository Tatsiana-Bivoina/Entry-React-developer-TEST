import {
  ResetTotalDataCountActionType,
  TotalproductsCountActionType,
  TotalProductsPriceActionType,
} from '../../types/actionsType';
import { TotalDataCount } from '../../types/productType';

const initialState: TotalDataCount = {
  totalPrice: '0',
  totalProductsCount: 0,
  tax: '0',
};

type ActionsType =
  | TotalProductsPriceActionType
  | TotalproductsCountActionType
  | ResetTotalDataCountActionType;

export function totalDataCountReducer(state = initialState, action: ActionsType) {
  const stateCopy = { ...state };
  switch (action.type) {
    case 'COUNT_TOTAL_PRICE':
      const initialValue = 0;
      const sumTotalPrice = action.payload.data.reduce(
        (previousValue, currentValue) =>
          previousValue +
          currentValue.prices[action.payload.currencyIndex].amount * currentValue.amount,
        initialValue
      );
      return {
        ...stateCopy,
        totalPrice: sumTotalPrice.toFixed(2),
        tax: (sumTotalPrice * 0.21).toFixed(2),
      };
    case 'COUNT_TOTAL_PRODUCTS_COUNT':
      const initial = 0;
      const sumTotalProductsCount = action.payload.data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.amount,
        initial
      );
      return {
        ...stateCopy,
        totalProductsCount: sumTotalProductsCount,
      };
    case 'RESET_TOTAL_DATA_COUNT':
      return initialState;
    default:
      return stateCopy;
  }
}
