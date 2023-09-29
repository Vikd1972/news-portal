/* eslint-disable no-console */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './ui/container/Header/Header';
import NewsList from './pages/NewsList/NewsList';
import AppContainer from './App.styles';
import newsPortalTheme from './newsPortalTheme';
import { useAppDispatch } from './store/hooks';
import { setTopics, setNews } from './store/newsPortalSlice';
import { getTopics, getNewsList } from './api/newsApi';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const topicsrResult = await getTopics();
      dispatch(setTopics(topicsrResult.data.data));

      const newsResult = await getNewsList();
      dispatch(setNews(newsResult.data.data));
      // console.log('newsResult', newsResult);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={newsPortalTheme}>
      <Router>
        <AppContainer>
          <Header />
          <NewsList />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
