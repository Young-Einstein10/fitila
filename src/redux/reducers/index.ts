import { combineReducers } from "redux";
import authReducer from "./authReducer";
import businessReducer from "./businessReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  business: businessReducer,
});
