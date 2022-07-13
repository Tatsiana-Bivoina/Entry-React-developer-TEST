import { CategoryProductsActionType } from '../../types/actionsType';
import { CategoryProductsMinResponse } from '../../types/productTypesList';

const initialState: CategoryProductsMinResponse[] = [];

export function productsDataReducer(state = initialState, action: CategoryProductsActionType) {
  switch (action.type) {
    case 'GET_PRODUCTS_DATA':
      return (state = action.payload);
    default:
      return state;
  }
}
