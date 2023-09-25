/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum StatusENUM {
  user = 'user',
  author = 'author',
  admin = 'admin',
}

export interface IUserType {
  id: number;
  fullname: string;
  email: string;
  photoFilePath: string;
  status: StatusENUM;
}

const initialState: INewsPortalState = {
  user: {
    id: 0,
    fullname: '',
    email: '',
    photoFilePath: '',
    status: StatusENUM.user,
  },
};

interface INewsPortalState {
  user: IUserType;
}

export const newsPortalSlice = createSlice({
  name: 'newsPortal',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserType>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
} = newsPortalSlice.actions;

export default newsPortalSlice.reducer;
