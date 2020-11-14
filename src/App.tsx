import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import config from './config/config';
import NonAuthLayout from './containers/NonAuthLayout';
import store from './redux/store';
import { PrivateRoutes, PublicRoutes } from './routes';
import './App.less';

const { theme } = config;

const AuthLayout: FC = ({ children }) => <section>{children}</section>;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <Router>
          <AuthLayout>
            <PrivateRoutes />
          </AuthLayout>

          <NonAuthLayout>
            <PublicRoutes />
          </NonAuthLayout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
