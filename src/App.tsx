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

const { theme } = config;

const userData = JSON.parse(localStorage.getItem("userData"));

const access_token = userData && userData.token;
if (access_token) {
  store.dispatch(setCurrentUser(userData));
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
