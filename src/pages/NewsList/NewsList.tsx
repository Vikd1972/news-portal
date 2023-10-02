import React from 'react';
import dayjs from 'dayjs';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListWrapper from './NewsList.styles';
import { useAppSelector } from '../../store/hooks';

const NewsList: React.FC = () => {
  const newsList = useAppSelector(({ newsPortal }) => newsPortal.news);

  return (
    <ListWrapper>
      {newsList?.map((news) => (
        <div
          key={news.newsId}
          className="item-news"
        >
          <div className="personal-info">
            <AccountCircleIcon />
            {`${news?.user?.firstName} ${news?.user?.lastName}`}
          </div>

          <div className="personal-info">
            <MailOutlineIcon />
            {news?.user?.email}
          </div>

          <div className="personal-info">
            <CalendarMonthIcon />
            {dayjs(news.dateOfPublication).toString()}
          </div>

          <div className="personal-info">
            {news.title.toUpperCase()}

            {news?.topics?.length ? ', Topics:' : null}

            {news?.topics && news.topics.map((topic) => (
              <div key={topic.topicId}>
                {topic.topic}
              </div>
            ))}
          </div>

          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>
      ))}
    </ListWrapper>
  );
};

export default NewsList;
