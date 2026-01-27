import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import type { Post } from "../types/types";
import { PostCard } from "../components/PostCard/PostCard";
import userEvent from "@testing-library/user-event";
import * as hooks from "../hooks/hooks";

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
  it("should change down vote arrow and likes count color to red on click", async () => {
    const user = userEvent.setup();
    render(<PostCard post={mockPost} />);

    const downVoteArrow = screen.getByTestId("down-vote-arrow");
    const likesCountElement = screen.getByText(/10/i);

    expect(likesCountElement).toBeInTheDocument();
    expect(downVoteArrow).toBeInTheDocument();

    expect(downVoteArrow).not.toHaveClass("text-red-400");

    await user.click(downVoteArrow);
    expect(downVoteArrow).toHaveClass("text-red-400");
    expect(likesCountElement).toHaveClass("text-red-400");
  });
  it("should change up vote arrow and likes count color from green to red on consecutive clicks", async () => {
    const user = userEvent.setup();

    render(<PostCard post={mockPost} />);

    const upVoteArrow = screen.getByTestId("up-vote-arrow");
    const downVoteArrow = screen.getByTestId("down-vote-arrow");
    const likesCountElement = screen.getByText(/10/i);

    expect(likesCountElement).toBeInTheDocument();
    expect(upVoteArrow).toBeInTheDocument();
    expect(downVoteArrow).toBeInTheDocument();

    await user.click(upVoteArrow);
    expect(upVoteArrow).toHaveClass("text-green-400");
    expect(likesCountElement).toHaveClass("text-green-400");

    await user.click(downVoteArrow);
    expect(downVoteArrow).toHaveClass("text-red-400");
    expect(likesCountElement).toHaveClass("text-red-400");
  });
  it("should change color back to default on second click of the same arrow", async () => {
    const user = userEvent.setup();

    render(<PostCard post={mockPost} />);

    const upVoteArrow = screen.getByTestId("up-vote-arrow");
    const likesCountElement = screen.getByText(/10/i);

    expect(likesCountElement).toBeInTheDocument();
    expect(upVoteArrow).toBeInTheDocument();

    await user.click(upVoteArrow);
    expect(upVoteArrow).toHaveClass("text-green-400");
    expect(likesCountElement).toHaveClass("text-green-400");

    await user.click(upVoteArrow);
    expect(upVoteArrow).not.toHaveClass("text-green-400");
    expect(likesCountElement).not.toHaveClass("text-green-400");
  });
  it("should display comments section when comments button is clicked", async () => {
    const user = userEvent.setup();

    render(<PostCard post={mockPost} />);

    const commentsButton = screen.getByRole("button");

    expect(commentsButton).toBeInTheDocument();

    await user.click(commentsButton);
  });
  it("should hide comments section when comments button is clicked again", async () => {
    const user = userEvent.setup();

    render(<PostCard post={mockPost} />);

    const commentsButton = screen.getByRole("button");

    expect(commentsButton).toBeInTheDocument();

    await user.click(commentsButton);
    await user.click(commentsButton);

    const commentsSection = screen.queryByTestId("comments-section");
    expect(commentsSection).not.toBeInTheDocument();
  });
  it("should dispatch fetchCommentsForPostById when comments button is clicked and list is empty", async () => {
    const user = userEvent.setup();
    const dispatchMock = vi.fn();

    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      comments: {},
      isLoadingComments: false,
    });

    render(<PostCard post={mockPost} />);
    await user.click(screen.getByRole("button"));

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it("should NOT dispatch fetchCommentsForPostById when comments button is clicked but comments already exist", async () => {
    const user = userEvent.setup();
    const dispatchMock = vi.fn();

    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      comments: {
        [mockPost.id]: { data: [{ id: "c1", author: "bot", content: "hi" }] },
      },
      isLoadingComments: false,
    });

    render(<PostCard post={mockPost} />);
    await user.click(screen.getByRole("button"));

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
