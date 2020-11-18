import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import config from "./config/config";
import store from "./redux/store";
import "./App.less";
import { setCurrentUser } from "./redux/actions/authActions";

const { theme } = config;

const token = localStorage.getItem("access-token");
const userDetails = localStorage.getItem("userDetails");

const access_token = JSON.parse(token!);
if (access_token !== "undefined" && access_token !== null) {
  const user_Details = JSON.parse(userDetails!);

  // // Set user and isAuthenticated
  store.dispatch(setCurrentUser(user_Details));
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
