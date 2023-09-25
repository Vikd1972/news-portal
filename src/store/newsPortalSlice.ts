/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum StatusENUM {
  user = 'user',
  author = 'author',
  admin = 'admin',
}

export interface IUserType {
  fullname: string;
  email: string;
  photoFilePath: string;
  status: StatusENUM;
}

export interface INewsType {
  author: IUserType;
  title: string;
  dateOfPublish: Date;
  content: string;
}

const user: IUserType = {
  fullname: 'Иван Иванов',
  email: 'ivan@examle.com',
  photoFilePath: '',
  status: StatusENUM.user,
};

const news: INewsType = {
  author: user,
  title: '',
  dateOfPublish: new Date(),
  content: '',
};

const initialState: INewsPortalState = {
  user,
  news: [news],
};

interface INewsPortalState {
  user: IUserType;
  news: INewsType[];
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
  },
});

export const {
  setUser,
} = newsPortalSlice.actions;

export default newsPortalSlice.reducer;
