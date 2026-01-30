import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { Subreddit } from "../components/SubredditsList/SubredditsList";
import { StarFaceIcon } from "@hugeicons/core-free-icons";

const mockSubreddit = {
  name: "r/test",
  endpoint: "/r/test",
  icon: StarFaceIcon,
};

describe("Subreddit", () => {
  it("should render subreddit", () => {
    render(
      <Subreddit
        onClick={() => {}}
        selected={false}
        subreddit={mockSubreddit}
      />,
    );

    const subredditElement = screen.getByTestId("subreddit");

    expect(subredditElement).toBeInTheDocument();
    expect(subredditElement).toHaveTextContent(/r\/test/i);
    expect(subredditElement.querySelector("svg")).toBeInTheDocument();
    expect(subredditElement).not.toHaveClass("bg-indigo-400");
  });
  it("should apply selected styles when selected", () => {
    render(
      <Subreddit
        onClick={() => {}}
        selected={true}
        subreddit={mockSubreddit}
      />,
    );

    const subredditElement = screen.getByTestId("subreddit");

    expect(subredditElement).toHaveClass(
      "bg-indigo-400",
      "border-l-5",
      "text-indigo-700",
      "border-indigo-700",
      "pl-3",
    );
  });
  it("should handle click event once", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(
      <Subreddit
        onClick={onClickMock}
        selected={false}
        subreddit={mockSubreddit}
      />,
    );

    const subredditElement = screen.getByTestId("subreddit");

    await user.click(subredditElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
