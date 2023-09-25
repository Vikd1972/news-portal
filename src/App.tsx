import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './ui/container/Header/Header';
import AppContainer from './App.styles';
import newsPortalTheme from './newsPortalTheme';

function App() {
  return (
    <ThemeProvider theme={newsPortalTheme}>
      <Router>
        <AppContainer>
          <Header />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
