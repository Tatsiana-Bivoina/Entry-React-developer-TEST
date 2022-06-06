import { CurrentProductActionType } from '../../types/actionsType';

const initialState = {
  id: '',
};

export function currentProductIdReducer(state = initialState, action: CurrentProductActionType) {
  switch (action.type) {
    case 'GET_CURRENT_PRODUCT_ID':
      return (state.id = action.payload);
    default:
      return state;
  }
}
