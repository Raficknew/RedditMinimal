import { describe, expect, it } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import { CommentCard } from "../components/CommentCard/CommentCard";
import type { Comment } from "../types/types";

const mockComment: Comment = {
  id: "c1",
  author: "test_user",
  content: "This is a test comment.",
  postDate: "Sat Jun 01 2024",
};

const veryLongContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

describe("CommentCard", () => {
  it("should render commentCard and display author, formatted date and content", () => {
    render(<CommentCard comment={mockComment} />);

    const commentElement = screen.getByText(/This is a test comment./i);
    const authorElement = screen.getByText(/test_user/i);
    const dateElement = screen.getByText(/Sat Jun 01 2024/i);
    const contentElement = screen.getByText(/This is a test comment./i);

    expect(commentElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });
  it("should display long comment content correctly", () => {
    render(
      <CommentCard
        comment={{
          ...mockComment,
          content: veryLongContent,
        }}
      />,
    );

    const longContentElement = screen.getByText(veryLongContent);

    expect(longContentElement).toBeInTheDocument();
    expect(longContentElement).toHaveClass("break-all");
  });
});
