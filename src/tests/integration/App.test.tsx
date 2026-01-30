import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import App from "../../App";
import { render, screen, waitFor } from "../test-utils";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  mockRedditPost2Response,
  mockRedditPostResponse,
} from "../mockResponses";
import userEvent from "@testing-library/user-event";

const serverUrl = "https://www.reddit.com/*/search.json";

const server = setupServer(
  http.get(serverUrl, () => {
    return HttpResponse.json(mockRedditPostResponse);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App Integration Tests", () => {
  it("should search for post and display results correctly", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Search"), "javascript");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      const posts = screen.getAllByTestId("post-card");
      expect(posts.length).toBe(5);
      expect(
        screen.queryByTestId("post-card-skeleton"),
      ).not.toBeInTheDocument();
      posts.forEach((post) => {
        const postTitle = post.querySelector('[data-testid="post-title"]');

        expect(postTitle).toHaveTextContent(/javascript/i);
      });
    });
  });
  it("should search for posts after subreddit selection", async () => {
    const user = userEvent.setup();
    server.use(
      http.get(serverUrl, () => {
        return HttpResponse.json(mockRedditPost2Response);
      }),
    );

    render(<App />);

    await user.click(screen.getByText("todayilearned"));

    await waitFor(() => {
      const posts = screen.getAllByTestId("post-card");
      expect(posts.length).toBe(3);
      expect(
        screen.queryByTestId("post-card-skeleton"),
      ).not.toBeInTheDocument();
      posts.forEach((post) => {
        const postTitle = post.querySelector('[data-testid="post-title"]');

        expect(postTitle).toHaveTextContent(/python/i);
      });
      expect(screen.getByText("todayilearned")).toHaveClass("bg-indigo-400");
    });
  });
  it("should show error message on server error", async () => {
    const user = userEvent.setup();
    server.use(
      http.get("https://www.reddit.com/*.json", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
      }),
    );

    render(<App />);

    await user.type(screen.getByPlaceholderText("Search"), "python");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(
        screen.getByText(/No posts found for python/i),
      ).toBeInTheDocument();
      expect(screen.queryByTestId("post-card")).not.toBeInTheDocument();
    });
  });
});
