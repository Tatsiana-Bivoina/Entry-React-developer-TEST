import { ModalCartActionType } from '../../types/actionsType';

const initialState = {
  isCartModalOpen: false,
};

export function modalCartReducer(state = initialState, action: ModalCartActionType) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return Object.assign({}, state, {
        isCartModalOpen: action.payload,
      });
    default:
      return state;
  }
}
