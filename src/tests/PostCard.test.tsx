import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import { PostCard } from "../components/PostCard/PostCard";
import userEvent from "@testing-library/user-event";
import * as hooks from "../hooks/hooks";
import { mockPost } from "./mockResponses";
import * as thunks from "../store/commentsSlice";

describe("PostCard", () => {
  const setupRender = () => {
    const user = userEvent.setup();
    render(<PostCard post={mockPost} />);
    return {
      user,
      upVoteArrow: screen.getByTestId("up-vote-arrow"),
      downVoteArrow: screen.getByTestId("down-vote-arrow"),
      likesCountElement: screen.getByText(/10/i),
    };
  };

  const testVoteColorChange = async (
    colorClass: string,
    arrowName: "upVoteArrow" | "downVoteArrow",
  ) => {
    const elements = setupRender();
    const arrow = elements[arrowName];
    const { user, likesCountElement } = elements;

    expect(likesCountElement).toBeInTheDocument();
    expect(arrow).toBeInTheDocument();
    expect(arrow).not.toHaveClass(colorClass);

    await user.click(arrow);

    expect(arrow).toHaveClass(colorClass);
    expect(likesCountElement).toHaveClass(colorClass);
  };

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
  it("should change up vote arrow and likes count color to green on click", async () => {
    await testVoteColorChange("text-green-400", "upVoteArrow");
  });

  it("should change down vote arrow and likes count color to red on click", async () => {
    await testVoteColorChange("text-red-400", "downVoteArrow");
  });
  it("should change up vote arrow and likes count color from green to red on consecutive clicks", async () => {
    const { user, upVoteArrow, downVoteArrow, likesCountElement } =
      setupRender();

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
    const { user, upVoteArrow, likesCountElement } = setupRender();

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

    const commentsSection = screen.getByTestId("comments-section");
    expect(commentsSection).toBeInTheDocument();
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

    const thunkMock = vi.fn();
    vi.spyOn(thunks, "fetchCommentsForPostById").mockReturnValue(thunkMock);

    render(<PostCard post={mockPost} />);

    await user.click(screen.getByRole("button"));

    expect(thunks.fetchCommentsForPostById).toHaveBeenCalledWith(mockPost.id);
    expect(dispatchMock).toHaveBeenCalledWith(thunkMock);
  });

  it("should NOT dispatch fetchCommentsForPostById when comments button is clicked but comments already exist", async () => {
    const user = userEvent.setup();
    const dispatchMock = vi.fn();

    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      comments: {
        [mockPost.id]: {
          data: [
            {
              id: "c1",
              author: "bot",
              content: "hi",
              created_utc: 1700000000,
            },
          ],
        },
      },
      isLoadingComments: false,
      commentError: null,
    });

    render(<PostCard post={mockPost} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(dispatchMock).not.toHaveBeenCalled();
  });
  it("should show CommentSkeletons when comments are loading", async () => {
    const user = userEvent.setup();

    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      comments: {},
      isLoadingComments: true,
    });

    render(<PostCard post={mockPost} />);
    await user.click(screen.getByRole("button"));

    const skeletons = await screen.findAllByTestId("comment-skeleton");
    expect(skeletons.length).toBe(5);
  });
  it("should show error message when commentError is true", async () => {
    const user = userEvent.setup();

    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      comments: {},
      isLoadingComments: false,
      commentError: true,
    });

    render(<PostCard post={mockPost} />);
    await user.click(screen.getByRole("button"));

    const errorMessage = await screen.findByText(/Failed to load comments./i);
    expect(errorMessage).toBeInTheDocument();
  });
});
