import React from 'react';
import dayjs from 'dayjs';
import type { NavigateOptions } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';
import NewsItemWrapper from './NewsItem.styles';
import type { INewsType } from '../../store/newsPortalSlice';
import { useAppSelector } from '../../store/hooks';

type CustomNavigateOptionsType = NavigateOptions & {
  news?: INewsType;
};

type PropsType = {
  news: INewsType | null;
  deteteNews?: (newsId: number) => Promise<void>;
};

const NewsItem: React.FC<PropsType> = ({ news, deteteNews }) => {
  const user = useAppSelector(({ newsPortal }) => newsPortal.user);

  const navigate = useNavigate();

  if (!news) {
    return null;
  }

  const onEdit = () => {
    navigate('/write-news', { state: { news } } as CustomNavigateOptionsType);
  };

  return (
    <NewsItemWrapper>
      <div className="header-container">
        <div className="header-news">
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
        </div>

        {user?.userId === news?.user?.userId && (
          <div className="button-container">
            <Button
                className="button"
                variant="outlined"
                onClick={onEdit}
              >
                Редактировать
            </Button>

            <Button
                className="button"
                variant="outlined"
                onClick={() => deteteNews && deteteNews(news.newsId)}
              >
                Удалить
            </Button>
          </div>
        )}
      </div>

      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: news.content }} />
    </NewsItemWrapper>
  );
};

export default NewsItem;
