import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './App.styles';
import newsPortalTheme from './newsPortalTheme';

function App() {
  return (
        <ThemeProvider theme={newsPortalTheme}>
            <Router>
                <AppContainer>
                    <div>
            NEWS PORTAL
                    </div>
                </AppContainer>
            </Router>
        </ThemeProvider>
  );
}

export default App;
