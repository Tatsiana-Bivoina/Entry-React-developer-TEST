import { CurrentProductActionType } from '../../types/actionsType';

const initialState = {
  id: localStorage.getItem('currentProductId') || '',
};

export function currentProductIdReducer(state = initialState, action: CurrentProductActionType) {
  switch (action.type) {
    case 'GET_CURRENT_PRODUCT_ID':
      localStorage.setItem('currentProductId', action.payload);
      return Object.assign({}, state, {
        id: action.payload,
      });
    default:
      return state;
  }
}
