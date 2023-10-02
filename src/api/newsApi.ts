import instance from '.';

import type { INewsType, ITopic } from '../store/newsPortalSlice';

class NewsEndpoints {
  static getTopics = () => '/news/topics';

  static getNewsList = () => '/news';

  static setNews = () => '/news';
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

type NewsResponseType = {
  data: {
    data: INewsType[];
  };
};

export const getNewsList = (): Promise<NewsResponseType> => {
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
