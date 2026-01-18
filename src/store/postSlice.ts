import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "../types/types";

const fetchInitialPosts = createAsyncThunk(
  "posts/fetchInitialPosts",
  async () => {
    const response = await fetch(
      "https://www.reddit.com/r/Polska/hot.json?limit=20"
    );

    const data = await response.json();

    return data.data.children
      .map((child) => child.data)
      .map((post) => ({
        author: post.author,
        title: post.title,
        likesCount: post.score,
        commentsCount: post.num_comments,
        pictureUrl: post.thumbnail,
        postDate: new Date(post.created_utc * 1000).toDateString(),
      }));
  }
);

const fetchSearchedPosts = createAsyncThunk(
  "posts/fetchSearchedPosts",
  async ({ subreddit, query }, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/${subreddit}/search.json?q=${query}&restrict_sr=1&limit=20`
    );

    const data = await response.json();
    return data.data.children
      .map((child) => child.data)
      .map((post) => ({
        author: post.author,
        title: post.title,
        likesCount: post.score,
        commentsCount: post.num_comments,
        pictureUrl: post.thumbnail,
        postDate: new Date(post.created_utc * 1000).toDateString(),
      }));
  }
);

export type PostState = {
  posts: Post[];
  isLoadingPosts: boolean;
  postError: boolean;
};

const initialState: PostState = {
  posts: [],
  isLoadingPosts: false,
  postError: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.postError = false;
      })
      .addCase(fetchInitialPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.posts = action.payload;
        state.postError = false;
      })
      .addCase(fetchInitialPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.postError = true;
      })
      .addCase(fetchSearchedPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.postError = false;
      })
      .addCase(fetchSearchedPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.posts = action.payload;
        state.postError = false;
      })
      .addCase(fetchSearchedPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.postError = true;
      });
  },
});

export const postSelector = (state: { posts: PostState }) => state.posts;

export { fetchInitialPosts, fetchSearchedPosts };
export default postSlice.reducer;
