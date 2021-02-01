import api from "../config/api/index";

const setAuthToken = token => {
  if (token) {
    api.HttpClient.defaults.headers.common.authorization = `Bearer ${token}`;
    api.HttpClient.defaults.headers.common["Content-Type"] = "application/json";
  } else {
    api.HttpClient.defaults.headers.common = {};
  }
};

export default setAuthToken;
