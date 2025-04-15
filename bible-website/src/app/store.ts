import { configureStore } from "@reduxjs/toolkit";
import bibleReducer from "../features/bible/bibleSlice";

export const store = configureStore({
  reducer: {
    bible: bibleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
