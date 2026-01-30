import { describe, expect, it } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import { PostList } from "../components/PostList/PostList";
import { posts } from "./mockResponses";

describe("PostList", () => {
  it("should render all posts", () => {
    render(<PostList posts={posts} />);

    const postElements = screen.getAllByTestId("post-card");
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
