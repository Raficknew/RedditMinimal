import { describe, expect, it } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import type { Post } from "../types/types";
import { PostCard } from "../components/PostCard/PostCard";
import userEvent from "@testing-library/user-event";

const mockPost: Post = {
  id: "p1",
  author: "post_user",
  title: "Test Post Title",
  commentsCount: 5,
  likesCount: 10,
  pictureUrl: "https://example.com/image.jpg",
  postDate: "a month ago",
};

describe("PostCard", () => {
  it("should render PostCard and display author, title, comments count, likes count, picture and post date", () => {
    render(<PostCard post={mockPost} />);

    const authorElement = screen.getByText(/post_user/i);
    const titleElement = screen.getByText(/Test Post Title/i);
    const commentsCountElement = screen.getByText(/5/i);
    const likesCountElement = screen.getByText(/10/i);
    const pictureElement = screen.getByAltText(/image for post/i);
    const postDateElement = screen.getByText(/a month ago/i);

    expect(authorElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(commentsCountElement).toBeInTheDocument();
    expect(likesCountElement).toBeInTheDocument();
    expect(pictureElement).toBeInTheDocument();
    expect(postDateElement).toBeInTheDocument();
    expect(pictureElement).toHaveAttribute(
      "src",
      "https://example.com/image.jpg",
    );
  });
  it("should not render an image when pictureUrl is empty", () => {
    const postWithoutPicture = { ...mockPost, pictureUrl: "" };

    render(<PostCard post={postWithoutPicture} />);

    const pictureElement = screen.queryByAltText(/image for post/i);

    expect(pictureElement).not.toBeInTheDocument();
  });
  it("should change up vote arrow and likes count color to green  on click", async () => {
    const user = userEvent.setup();
    render(<PostCard post={mockPost} />);

    const upVoteArrow = screen.getByTestId("up-vote-arrow");
    const likesCountElement = screen.getByText(/10/i);

    expect(likesCountElement).toBeInTheDocument();
    expect(upVoteArrow).toBeInTheDocument();

    expect(upVoteArrow).not.toHaveClass("text-green-400");

    await user.click(upVoteArrow);

    expect(upVoteArrow).toHaveClass("text-green-400");
    expect(likesCountElement).toHaveClass("text-green-400");
  });
  it("should change down vote arrow and likes count color to red on click", async () => {});
});
