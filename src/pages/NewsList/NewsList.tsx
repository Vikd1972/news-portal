/* eslint-disable no-console */
import React from 'react';

import ListWrapper from './NewsList.styles';
import { useAppSelector } from '../../store/hooks';

const NewsList: React.FC = () => {
  const newsList = useAppSelector(({ newsPortal }) => newsPortal.news);
  console.log('newsList', newsList);

  return (
    <ListWrapper>
      {newsList?.map((news) => (
        <div
          key={news.newsId}
          className="item-news"
        >
          {news.title}
          {news.content}
        </div>
      ))}
    </ListWrapper>
  );
};

export default NewsList;
