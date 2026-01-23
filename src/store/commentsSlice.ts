import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Comment } from "../types/types";
import type { RedditApiResponse } from "../types/responses";

const takeOnlyFewNewestComments = ({ kind }: { kind: string }) => {
  return kind === "t1";
};

const fetchCommentsForPostById = createAsyncThunk(
  "comments/fetchCommentsForPostById",
  async (postId: string) => {
    const response = await fetch(
      `https://www.reddit.com/comments/${postId}.json?limit=20`,
    );
    const data: RedditApiResponse[] = await response.json();
    return {
      [postId]: {
        data: data[1].data.children
          .filter(takeOnlyFewNewestComments)
          .map((child) => {
            const comment = child.data;
            return {
              id: comment.id,
              author: comment.author,
              content: comment.body,
              postDate: new Date(comment.created_utc * 1000).toDateString(),
            };
          }),
      },
    };
  },
);

export type CommentState = {
  comments: { [postId: string]: { data: Comment[] } };
  isLoadingComments: boolean;
  commentError: boolean;
};

const initialState: CommentState = {
  comments: {},
  isLoadingComments: false,
  commentError: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsForPostById.pending, (state) => {
        state.isLoadingComments = true;
        state.commentError = false;
      })
      .addCase(fetchCommentsForPostById.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.comments = { ...state.comments, ...action.payload };
        state.commentError = false;
      })
      .addCase(fetchCommentsForPostById.rejected, (state) => {
        state.isLoadingComments = false;
        state.commentError = true;
      });
  },
});

export { fetchCommentsForPostById };
export default commentSlice.reducer;
