import { SET_CURRENT_USER } from '../constants';
import { ActionType } from '../constants/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: payload.id ? true : false,
        user: payload.id ? payload : {},
      };
    default:
      return state;
  }
};
