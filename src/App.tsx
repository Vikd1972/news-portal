import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';

import Navigation from './ui/container/Navigations';
import AppContainer from './App.styles';
import newsPortalTheme from './newsPortalTheme';
import { useAppDispatch } from './store/hooks';
import { setTopics, setNews, setUser } from './store/newsPortalSlice';
import { getTopics, getNewsList } from './api/newsApi';
import { getMe } from './api/userApi';
import showToast from './validation/showToast';

function App() {
  const dispatch = useAppDispatch();
  const [isInit, setIsInit] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsInit(true);
      return;
    }
    (async () => {
      try {
        const result = await getMe();
        dispatch(setUser(result.user));
      } catch (err) {
        if (err instanceof AxiosError) {
          showToast(err.message);
        }
      } finally {
        setIsInit(true);
      }
    })();
  }, [dispatch]);

  React.useEffect(() => {
    (async () => {
      try {
        const topicsrResult = await getTopics();
        dispatch(setTopics(topicsrResult.data.data));

        const newsResult = await getNewsList();
        dispatch(setNews(newsResult.data.data));
      } catch (err) {
        if (err instanceof AxiosError) {
          showToast(err.message);
        }
      }
    })();
  }, [dispatch]);

  if (!isInit) {
    return null;
  }

  return (
    <ThemeProvider theme={newsPortalTheme}>
      <Router>
        <AppContainer>
          <Navigation />
          <ToastContainer
            className="toast"
            bodyClassName="toast-body"
          />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
