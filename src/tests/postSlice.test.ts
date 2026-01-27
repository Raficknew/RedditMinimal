import { describe, it, expect } from "vitest";
import postReducer, { fetchPosts, type PostState } from "../store/postSlice";
import { type Post } from "../types/types";

describe("postSlice", () => {
  const initialState: PostState = {
    posts: [],
    isLoadingPosts: false,
    postError: false,
  };

  it("should return the initial state when an unknown action is dispatched", () => {
    const result = postReducer(undefined, { type: "unknown" });
    expect(result).toEqual(initialState);
  });

  it("should handle fetchPosts.pending", () => {
    const action = { type: fetchPosts.pending.type };
    const state = postReducer(initialState, action);

    expect(state.isLoadingPosts).toBe(true);
    expect(state.postError).toBe(false);
  });

  it("should handle fetchPosts.fulfilled", () => {
    const mockPosts: Post[] = [
      {
        id: "1",
        author: "user1",
        title: "Post 1",
        likesCount: 10,
        commentsCount: 5,
        pictureUrl: "url",
        postDate: "date",
      },
    ];

    const action = {
      type: fetchPosts.fulfilled.type,
      payload: mockPosts,
    };
    const state = postReducer(
      { ...initialState, isLoadingPosts: true },
      action,
    );

    expect(state.isLoadingPosts).toBe(false);
    expect(state.posts).toEqual(mockPosts);
    expect(state.postError).toBe(false);
  });

  it("should handle fetchPosts.rejected", () => {
    const action = { type: fetchPosts.rejected.type };
    const state = postReducer(
      { ...initialState, isLoadingPosts: true },
      action,
    );

    expect(state.isLoadingPosts).toBe(false);
    expect(state.postError).toBe(true);
    expect(state.posts).toEqual([]);
  });
  it("shoud replace state posts when fetchPosts.fulfilled is called multiple times", () => {
    const mockPosts: Post[] = [
      {
        id: "1",
        author: "user1",
        title: "Post 1",
        likesCount: 10,
        commentsCount: 5,
        pictureUrl: "url",
        postDate: "date",
      },
    ];

    const action = {
      type: fetchPosts.fulfilled.type,
      payload: mockPosts,
    };
    let state = postReducer({ ...initialState, isLoadingPosts: true }, action);

    expect(state.isLoadingPosts).toBe(false);
    expect(state.posts).toEqual(mockPosts);
    expect(state.postError).toBe(false);

    const newMockPosts: Post[] = [
      {
        id: "2",
        author: "user2",
        title: "Post 2",
        likesCount: 20,
        commentsCount: 10,
        pictureUrl: "url2",
        postDate: "date2",
      },
    ];

    const newAction = {
      type: fetchPosts.fulfilled.type,
      payload: newMockPosts,
    };

    state = postReducer({ ...initialState, isLoadingPosts: true }, newAction);

    expect(state.isLoadingPosts).toBe(false);
    expect(state.posts).toEqual(newMockPosts);
    expect(state.postError).toBe(false);
  });
});
