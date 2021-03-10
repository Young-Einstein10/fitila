import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import config from "./config/config";
import "./App.less";
import BusinessProvider from "./containers/Business/context";
import {
  ApiProvider,
  AuthProvider,
  EcosystemProvider,
  ErrorProvider,
  OrganizationProvider,
} from "./context";

const { theme } = config;

function App() {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <ErrorProvider>
        <ApiProvider>
          <AuthProvider>
            <OrganizationProvider>
              <EcosystemProvider>
                <Router>
                  <BusinessProvider>
                    <Routes />
                  </BusinessProvider>
                </Router>
              </EcosystemProvider>
            </OrganizationProvider>
          </AuthProvider>
        </ApiProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
