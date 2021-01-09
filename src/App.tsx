import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <div>
      <AppProvider>
        <Router>
          <Routes />
        </Router>
      </AppProvider>

      <GlobalStyle />
    </div>
  );
};

export default App;
