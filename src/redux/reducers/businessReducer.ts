import {
  GET_ALL_ECOSYSTEM,
  GET_ALL_ORGANIZATION,
  GET_ALL_SUB_ECOSYSTEM,
} from "../constants";

const initialState = {
  ecosystem: [],
  subEcosystem: [],
  organization: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ECOSYSTEM:
      return {
        ...state,
        ecosystem: payload,
      };

    case GET_ALL_SUB_ECOSYSTEM:
      return {
        ...state,
        subEcosystem: payload,
      };

    case GET_ALL_ORGANIZATION:
      return {
        ...state,
        organization: payload,
      };

    default:
      return state;
  }
};
