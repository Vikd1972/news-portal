/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum StatusENUM {
  user = 'user',
  admin = 'admin',
}

export interface IUserType {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  photoFilePath: string;
}

export interface INewsType {
  newsId: number;
  title: string;
  content: string;
  dateOfPublication: Date;
  user: IUserType;
  topics: ITopic[];
}

export interface ITopic {
  topicId: number;
  topic: string;
}

const initialState: INewsPortalState = {
  topics: null,
  user: null,
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
    setCurrentUser: (state, action: PayloadAction<IUserType>) => {
      state.user = action.payload;
    },
    resetCurrentUser: (state) => {
      state.user = null;
    },
    setCurrentNewsList: (state, action: PayloadAction<INewsType[]>) => {
      state.news = action.payload;
    },
    setCurrentTopics: (state, action: PayloadAction<ITopic[]>) => {
      state.topics = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  resetCurrentUser,
  setCurrentNewsList,
  setCurrentTopics,
} = newsPortalSlice.actions;

export default newsPortalSlice.reducer;
