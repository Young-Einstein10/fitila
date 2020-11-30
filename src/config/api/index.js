import axios from "axios";
import store from "../../redux/store";
import { GET_ERRORS, RESET_ERROR } from "../../redux/constants";
import Auth from "./auth";
import Business from "./business";

//Staging endpoint
const axiosInstance = axios.create({
  baseURL: "https://fitilla.pythonanywhere.com/api/v1",
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImRhdmlkQHdlc3QuY28iLCJleHAiOjE2MDY4NTgxMzAsImVtYWlsIjoiZGF2aWRAd2VzdC5jbyJ9.7iAndTuaU2Ifkm5WHGlMyKYWzgCUL9FwSZoa8sZkqiA`,
  },
});

//Intercept For Error reset
axiosInstance.interceptors.request.use(
  function(config) {
    // Reset error state before make a fresh API call
    store.dispatch({
      type: RESET_ERROR,
    });

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//Intercept For Errors
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    console.log(error.response);
    // Do something with response error
    const errorResponse = error.response;
    const errorRequest = error.request;

    errorResponse &&
      store.dispatch({
        type: GET_ERRORS,
        payload: {
          message:
            typeof errorResponse.data.error === "string"
              ? errorResponse.data.error
              : typeof errorResponse.data.error === "object"
              ? Object.entries(errorResponse.data.error)[0][1]
              : null,
          // message:
          //   errorResponse && Object.values(errorResponse.data.errors).length > 0
          //     ? Object.values(errorResponse.data.errors).flat()[0]
          //     : errorResponse.data.error,

          // fullMessage: errorResponse
          //   ? errorResponse.data &&
          //     Array.isArray(errorResponse.data.full_messages)
          //     ? errorResponse.data.full_messages[0]
          //     : errorResponse.data.full_messages
          //   : error.message,
          detail: errorResponse && errorResponse.data.detail,
          statusText: errorResponse && errorResponse.statusText,
        },
      });

    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth: new Auth(axiosInstance),
  business: new Business(axiosInstance),
  HttpClient: axiosInstance,
};
