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
  FAQProvider,
  OrganizationProvider,
  SectorProvider,
} from "./context";
import ScrollToTop from "./components/scrollToTop";

const { theme } = config;

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Spin.setDefaultIndicator(antIcon);

function App() {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <ErrorProvider>
        <ApiProvider>
          <AuthProvider>
            <OrganizationProvider>
              <EcosystemProvider>
                <SectorProvider>
                  <Router>
                    <BusinessProvider>
                      <FAQProvider>
                        <ScrollToTop>
                          <Routes />
                        </ScrollToTop>
                      </FAQProvider>
                    </BusinessProvider>
                  </Router>
                </SectorProvider>
              </EcosystemProvider>
            </OrganizationProvider>
          </AuthProvider>
        </ApiProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
