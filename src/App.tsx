import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import config from "./config/config";
import store from "./redux/store";
import "./App.less";
import { logout, setCurrentUser } from "./redux/actions/authActions";
import BusinessProvider from "./containers/Business/context";
import setAuthToken from "./utils/setAuthToken";

const { theme } = config;

const userData = JSON.parse(localStorage.getItem("userData"));

const access_token = userData && userData.token;

if (access_token !== "undefined" && access_token !== null) {
  setAuthToken(access_token);

  store.dispatch(setCurrentUser(userData));

  const currentTime = Date.now() / 1000;

  // Check for token expiration
  if (access_token.expiry < currentTime) {
    // Sign out user
    store.dispatch(logout() as any);
  }
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
