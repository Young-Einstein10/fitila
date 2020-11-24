import { SET_CURRENT_USER } from "../constants";

const initialState = {
  isAuthenticated: false,
  user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: payload.token ? true : false,
        user: payload,
      };
    default:
      return state;
  }
};
