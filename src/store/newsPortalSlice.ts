/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum StatusENUM {
  user = 'user',
  admin = 'admin',
}

export interface IUserType {
  firstName: string;
  lastName: string;
  email: string;
  photoFilePath: string;
}

export interface INewsType {
  newsId: number;
  title: string;
  content: string;
  dateOfPublish: Date;
  user: IUserType;
  topics: ITopic[];
}

export interface ITopic {
  topicId: number;
  topic: string;
}

const user: IUserType = {
  firstName: 'Иван',
  lastName: 'Иванов',
  email: 'ivan@examle.com',
  photoFilePath: '',
};

const initialState: INewsPortalState = {
  topics: null,
  user,
  news: null,
};

interface INewsPortalState {
  topics: ITopic[] | null;
  user: IUserType | null;
  news: INewsType[] | null;
}

export const newsPortalSlice = createSlice({
  name: 'newsPortal',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserType>) => {
      state.user = action.payload;
    },
    setNews: (state, action: PayloadAction<INewsType[]>) => {
      state.news = action.payload;
    },
    setTopics: (state, action: PayloadAction<ITopic[]>) => {
      state.topics = action.payload;
    },
  },
});

export const {
  setUser,
  setNews,
  setTopics,
} = newsPortalSlice.actions;

export default newsPortalSlice.reducer;
