import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import { Container, Navigation, Main } from './styles/page';

import Routes from './routes';
import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Router>
          <Container>
            <Navigation>
              <Menu />
            </Navigation>
            <Main>
              <p>Header</p>
              <Routes />
            </Main>
          </Container>
        </Router>
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
