import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "../types/types";
import type { ApiPostResponse } from "../types/responses";

const fetchPosts = createAsyncThunk(
  "posts/fetchSearchedPosts",
  async ({ subreddit, query }: { subreddit: string; query: string }) => {
    const response = await fetch(
      `https://www.reddit.com/${subreddit}/search.json?q=${query}&restrict_sr=1&limit=20`,
    );

    const data: ApiPostResponse = await response.json();
    return data.data.children
      .map((child) => child.data)
      .map((post) => ({
        id: post.id,
        author: post.author,
        title: post.title,
        likesCount: post.score,
        commentsCount: post.num_comments,
        pictureUrl: post.url_overridden_by_dest,
        postDate: new Date(post.created_utc * 1000).toDateString(),
      }));
  },
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
      .addCase(fetchPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.postError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.posts = action.payload;
        state.postError = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.postError = true;
      });
  },
});

export const postSelector = (state: { posts: PostState }) => state.posts;

export { fetchPosts };
export default postSlice.reducer;
