import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import config from "./config/config";
import BusinessProvider from "./containers/Business/context";
import {
  EcosystemProvider,
  FAQProvider,
  OrganizationProvider,
  SectorProvider,
} from "./context";
import ScrollToTop from "./components/scrollToTop";
import "./App.less";

const { theme } = config;

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Spin.setDefaultIndicator(antIcon);

function App() {
  return (
    <ThemeProvider theme={{ ...theme }}>
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
    </ThemeProvider>
  );
}

export default App;
