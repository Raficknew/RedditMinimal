import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import type { Subreddit } from "../types/types";
import { SubredditsList } from "../components/SubredditsList/SubredditsList";
import { StarFaceIcon } from "@hugeicons/core-free-icons";

const subreddits: Subreddit[] = [
  {
    name: "r/MockSubreddit1",
    endpoint: "/r/MockSubreddit1",
    icon: StarFaceIcon,
  },
  {
    name: "r/MockSubreddit2",
    endpoint: "/r/MockSubreddit2",
    icon: StarFaceIcon,
  },
];

describe("SubredditList", () => {
  it("should render all subreddits", () => {
    render(
      <SubredditsList
        subreddits={subreddits}
        selectedSubreddit={null}
        onSubredditClick={() => {}}
      />,
    );

    expect(screen.getByText("Subreddits")).toBeInTheDocument();
    const subredditElements = screen.getAllByRole("subreddit");
    expect(subredditElements).toHaveLength(subreddits.length);
    subredditElements.forEach((subreddit, index) => {
      expect(subreddit).toHaveTextContent(subreddits[index].name);
      expect(subreddit.querySelector("svg")).toBeInTheDocument();
    });
  });
  it("should highlight the selected subreddit", async () => {
    const onSubbredditSelect = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <SubredditsList
        subreddits={subreddits}
        selectedSubreddit={null}
        onSubredditClick={onSubbredditSelect}
      />,
    );

    const firstSubreddit = screen.getByText(subreddits[0].name);

    await user.click(firstSubreddit);

    expect(onSubbredditSelect).toHaveBeenCalledWith(subreddits[0].endpoint);

    rerender(
      <SubredditsList
        subreddits={subreddits}
        selectedSubreddit={subreddits[0].endpoint}
        onSubredditClick={onSubbredditSelect}
      />,
    );

    expect(firstSubreddit).toHaveClass("bg-indigo-400");
  });
  it("should dishighlight first subreddit and highlightSecond", async () => {
    const onSubbredditSelect = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <SubredditsList
        subreddits={subreddits}
        selectedSubreddit={subreddits[0].endpoint}
        onSubredditClick={onSubbredditSelect}
      />,
    );

    const secondSubreddit = screen.getByText(subreddits[1].name);

    await user.click(secondSubreddit);

    expect(onSubbredditSelect).toHaveBeenCalledWith(subreddits[1].endpoint);

    rerender(
      <SubredditsList
        subreddits={subreddits}
        selectedSubreddit={subreddits[1].endpoint}
        onSubredditClick={onSubbredditSelect}
      />,
    );

    const firstSubreddit = screen.getByText(subreddits[0].name);

    expect(firstSubreddit).not.toHaveClass("bg-indigo-400");
    expect(secondSubreddit).toHaveClass("bg-indigo-400");
  });
  it("should render correctly with no subreddits", () => {
    render(
      <SubredditsList
        subreddits={[]}
        selectedSubreddit={null}
        onSubredditClick={() => {}}
      />,
    );

    expect(screen.getByText("Subreddits")).toBeInTheDocument();
    const subredditElements = screen.queryAllByRole("subreddit");
    expect(subredditElements).toHaveLength(0);
  });
});
