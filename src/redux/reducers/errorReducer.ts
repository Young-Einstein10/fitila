import { GET_ERRORS, RESET_ERROR } from "../constants";
import { message } from "antd";
import { ActionType } from "../constants/types";

const toastMessageDuration = 5; //sec
const initialState = null;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: ActionType) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ERRORS:
      if (payload && payload.message) {
        // message.error(payload.message, toastMessageDuration);
        return payload.message;
      } else if (payload && payload.fullMessage) {
        message.error(payload.fullMessage, toastMessageDuration);
        return payload.fullMessage;
      } else if (payload && payload.errors) {
        message.error(payload.errors, toastMessageDuration);
        return payload.errors;
      } else if (payload && payload.statusText) {
        message.error(payload.statusText, toastMessageDuration);
        return payload.statusText;
      }
      break;
    case RESET_ERROR:
      return null;
    default:
      return state;
  }
};
