import React from 'react';

import NewsItem from '../NewsItem/NewsItem';
import ListWrapper from './NewsList.styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import 'react-quill/dist/quill.snow.css';
import { deleteNews } from '../../api/newsApi';
import { setCurrentNewsList } from '../../store/newsPortalSlice';

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const newsList = useAppSelector(({ newsPortal }) => newsPortal.news);

  const deteteNews = async (newsId: number) => {
    await deleteNews(newsId);
    if (newsList) {
      const upddatedNewsList = newsList.filter((news) => news.newsId !== newsId);
      dispatch(setCurrentNewsList(upddatedNewsList));
    }
  };

  return (
    <ListWrapper>
      {newsList?.map((news) => (
        <NewsItem
          key={news.newsId}
          news={news}
          deteteNews={deteteNews}
        />
      ))}
    </ListWrapper>
  );
};

export default NewsList;
