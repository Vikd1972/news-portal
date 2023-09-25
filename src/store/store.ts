import { configureStore } from '@reduxjs/toolkit';
import newsPortalReducer from './newsPortalSlice';

const store = configureStore({
  reducer: {
    newsPortal: newsPortalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export { store };
