import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchCommentsForPostById = createAsyncThunk(
  "comments/fetchCommentsForPostById",
  async (postId: string, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/comments/${postId}.json?limit=20`,
    );
    const data = await response.json();
    console.log({
      [postId]: {
        data: data[1].data.children
          .filter((child) => child.kind === "t1")
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
    });
    return;
  },
);

export type CommentState = {
  comments: Comment[];
  isLoadingComments: boolean;
  commentError: boolean;
};

const initialState = {
  comments: [],
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
        state.comments = action.payload;
        state.commentError = false;
      })
      .addCase(fetchCommentsForPostById.rejected, (state) => {
        state.isLoadingComments = false;
        state.commentError = true;
      });
  },
});

export const commentSelector = (state: { comments: CommentState }) =>
  state.comments;

export { fetchCommentsForPostById };
export default commentSlice.reducer;
