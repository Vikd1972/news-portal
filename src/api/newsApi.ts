import instance from '.';

import type { INewsType, ITopic } from '../store/newsPortalSlice';

class NewsEndpoints {
  static getTopics = () => '/news/topics';

  static getNewsList = () => '/news';
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
