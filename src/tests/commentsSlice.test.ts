import { describe, expect, it } from "vitest";
import commentsReducer, { type CommentState } from "../store/commentsSlice";

const mockInitialState: CommentState = {
  comments: {},
  isLoadingComments: false,
  commentError: false,
};

describe("commentsSlice", () => {
  it("should handle initial state", () => {
    const state = commentsReducer(mockInitialState, { type: "@@INIT" });

    expect(state).toEqual({
      comments: {},
      isLoadingComments: false,
      commentError: false,
    });
  });
  it("should handle fetchCommentsForPostById.pending", () => {
    const action = { type: "comments/fetchCommentsForPostById/pending" };
    const state = commentsReducer(mockInitialState, action);

    expect(state).toEqual({
      comments: {},
      isLoadingComments: true,
      commentError: false,
    });
  });
  it("should handle fetchCommentsForPostById.fulfilled", () => {
    const action = {
      type: "comments/fetchCommentsForPostById/fulfilled",
      payload: {
        post1: {
          data: [
            {
              id: "c1",
              author: "user1",
              content: "Great post!",
              postDate: "2024-01-01",
            },
          ],
        },
      },
    };
    const state = commentsReducer(mockInitialState, action);

    expect(state).toEqual({
      comments: {
        post1: {
          data: [
            {
              id: "c1",
              author: "user1",
              content: "Great post!",
              postDate: "2024-01-01",
            },
          ],
        },
      },
      isLoadingComments: false,
      commentError: false,
    });
  });
  it("should add another key for comments when fetchCommentsForPostById.fulfilled is called again", () => {
    const initialState = {
      ...mockInitialState,
      comments: {
        post1: {
          data: [
            {
              id: "c1",
              author: "user1",
              content: "Great post!",
              postDate: "2024-01-01",
            },
          ],
        },
      },
    };

    const action = {
      type: "comments/fetchCommentsForPostById/fulfilled",
      payload: {
        post2: {
          data: [
            {
              id: "c2",
              author: "user2",
              content: "Nice article!",
              postDate: "2024-01-02",
            },
          ],
        },
      },
    };
    const state = commentsReducer(initialState, action);

    expect(Object.keys(state.comments)).toHaveLength(2);
    expect(state.comments).toHaveProperty("post1");
    expect(state.comments).toHaveProperty("post2");
    expect(state.comments).toEqual({
      post1: {
        data: [
          {
            id: "c1",
            author: "user1",
            content: "Great post!",
            postDate: "2024-01-01",
          },
        ],
      },
      post2: {
        data: [
          {
            id: "c2",
            author: "user2",
            content: "Nice article!",
            postDate: "2024-01-02",
          },
        ],
      },
    });
  });
  it("should handle fetchCommentsForPostById.rejected", () => {
    const action = { type: "comments/fetchCommentsForPostById/rejected" };
    const state = commentsReducer(mockInitialState, action);

    expect(state).toEqual({
      comments: {},
      isLoadingComments: false,
      commentError: true,
    });
  });
});
