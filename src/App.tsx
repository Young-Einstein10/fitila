import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import config from "./config/config";
import store from "./redux/store";
import "./App.less";
import { setCurrentUser } from "./redux/actions/authActions";
import BusinessProvider from "./containers/Business/context";
import api from "./config/api";

const { theme } = config;

const userData = JSON.parse(localStorage.getItem("userData"));

const access_token = userData && userData.token;
if (access_token) {
  store.dispatch(setCurrentUser(userData));

  api.HttpClient.defaults.headers.common.authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImRhdmlkQHdlc3QuY28iLCJleHAiOjE2MDY4NTgxMzAsImVtYWlsIjoiZGF2aWRAd2VzdC5jbyJ9.7iAndTuaU2Ifkm5WHGlMyKYWzgCUL9FwSZoa8sZkqiA`;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <Router>
          <BusinessProvider>
            <Routes />
          </BusinessProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
