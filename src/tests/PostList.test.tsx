import { describe, expect, it } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import { PostList } from "../components/PostList/PostList";
import type { Post } from "../types/types";

describe("PostList", () => {
  it("should render all posts", () => {
    const posts: Post[] = [
      {
        id: "1",
        title: "First Post",
        author: "MockUser1",
        commentsCount: 10,
        likesCount: 5,
        postDate: "a month ago",
        pictureUrl: "https://via.placeholder.com/150",
      },
      {
        id: "2",
        title: "Second Post",
        author: "MockUser2",
        commentsCount: 20,
        likesCount: 15,
        postDate: "a month ago",
        pictureUrl: "https://via.placeholder.com/150",
      },
      {
        id: "3",
        title: "Third Post",
        author: "MockUser3",
        commentsCount: 30,
        likesCount: 25,
        postDate: "a month ago",
        pictureUrl: "https://via.placeholder.com/150",
      },
    ];
    render(<PostList posts={posts} />);

    const postElements = screen.getAllByRole("post");
    expect(postElements).toHaveLength(posts.length);
    postElements.forEach((post, index) => {
      expect(post).toHaveTextContent(posts[index].title);
      expect(post).toHaveTextContent(posts[index].author);
      expect(post).toHaveTextContent(posts[index].commentsCount.toString());
      expect(post).toHaveTextContent(posts[index].likesCount.toString());
      expect(post).toHaveTextContent(posts[index].postDate);
      expect(post.querySelector("img")).toHaveAttribute(
        "src",
        posts[index].pictureUrl,
      );
    });
  });
});
