import instance from '.';

import type { INewsType, ITopic } from '../store/newsPortalSlice';

class NewsEndpoints {
  static getTopics = () => '/news/topics';

  static getNewsList = () => '/news';

  static setNews = () => '/news';

  static deleteNews = (newsId: number) => `/news/${newsId}?hardDelete=true`;

  static updateNews = (newsId: number) => `/news/${newsId}`;
}

type TopicsResponseType = {
  data: {
    data: ITopic[];
  } ;
};

export const getTopics = (): Promise<TopicsResponseType> => {
  return instance.get(
    NewsEndpoints.getTopics(),
  );
};

type NewsListResponseType = {
  data: {
    data: INewsType[];
  };
};

type NewsResponseType = {
  data: {
    data: INewsType;
  };
};

export const getNewsList = (): Promise<NewsListResponseType> => {
  return instance.get(
    NewsEndpoints.getNewsList(),
  );
};

type NewsRequesrType = {
  title: string;
  content: string;
  dateOfPublication: Date;
  topics: number[];
};

export const setNews = (news: NewsRequesrType): Promise<NewsResponseType> => {
  return instance.post(
    NewsEndpoints.setNews(),
    news,
  );
};

export const deleteNews = (newsId: number): Promise<NewsResponseType> => {
  return instance.delete(
    NewsEndpoints.deleteNews(newsId),
  );
};

export const updateNews = (newsId: number, news: NewsRequesrType): Promise<NewsResponseType> => {
  return instance.patch(
    NewsEndpoints.updateNews(newsId),
    news,
  );
};
