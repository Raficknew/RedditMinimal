import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import commentReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
