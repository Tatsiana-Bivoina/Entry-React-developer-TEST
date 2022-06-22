import { ResetTotalDataCountActionType, TotalDataCountActionType } from '../../types/actionsType';
import { TotalDataCount } from '../../types/productType';

const initialState: TotalDataCount = {
  totalPrice: 0,
  totalProductsCount: 0,
  tax: 0,
};

type ActionsType = TotalDataCountActionType | ResetTotalDataCountActionType;

export function totalDataCountReducer(state = initialState, action: ActionsType) {
  const stateCopy = { ...state };
  switch (action.type) {
    case 'COUNT_TOTAL_PRICE':
      const initialValue = 0;
      const sumTotalPrice = action.payload.data.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.prices[action.payload.currencyIndex].amount,
        initialValue
      );
      const taxCount = Math.round(sumTotalPrice * 0.21 * 100) / 100;
      return {
        ...stateCopy,
        totalPrice: sumTotalPrice,
        tax: taxCount,
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
