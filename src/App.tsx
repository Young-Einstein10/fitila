import React, { FC } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import config from "./config/config";
import NonAuthLayout from "./containers/NonAuthLayout";
import store from "./redux/store";
import "./App.less";
import AuthRoute from "./utils";
import Dashboard from "./containers/Admin/containers/Dashboard";
import Organizations from "./containers/Admin/containers/Organizations";
import Business from "./containers/Business";
import ListOrganization from "./containers/Business/_partials/ListOrganization";
import Preview from "./containers/Business/_partials/Preview";
import Success from "./containers/Business/_partials/Success";
import Uploads from "./containers/Business/_partials/Uploads";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const { theme } = config;

const NotFound = () => {
  return <Redirect to="/" />;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <Router>
          <Switch>
            <AuthRoute exact path="/d" component={Dashboard} />
            <AuthRoute
              exact
              path="/d/organizations"
              component={Organizations}
            />
            <NonAuthLayout>
              <Route exact path="/" component={Landing} />
              <Route exact path="/business" component={Business} />
              <Route
                exact
                path={`/business/listorg`}
                component={ListOrganization}
              />
              <Route exact path={`/business/uploads`} component={Uploads} />
              <Route exact path={`/business/preview`} component={Preview} />
              <Route exact path={`/business/success`} component={Success} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="*" component={NotFound} />
            </NonAuthLayout>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
