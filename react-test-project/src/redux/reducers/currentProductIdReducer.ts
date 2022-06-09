import { CurrentProductActionType } from '../../types/actionsType';

const initialState = {
  id: localStorage.getItem('currentProductId') || '',
};

export function currentProductIdReducer(state = initialState, action: CurrentProductActionType) {
  switch (action.type) {
    case 'GET_CURRENT_PRODUCT_ID':
      localStorage.setItem('currentProductId', action.payload);
      state.id = action.payload;
      return state;
    default:
      return state;
  }
}
