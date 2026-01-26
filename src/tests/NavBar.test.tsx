import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { NavBar } from "../components/NavBar/NavBar";

describe("NavBar", () => {
  it("should render NavBar", () => {
    render(<NavBar setSearchParams={() => {}} />);

    const navBar = screen.getByRole("banner");
    const search = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button");

    expect(navBar).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(navBar).toHaveTextContent("Reddit minimal");
    expect(search).toHaveAttribute("type", "search");
    expect(search).toHaveValue("");
  });
  it("should update search input value on user input", async () => {
    const user = userEvent.setup();
    render(<NavBar setSearchParams={() => {}} />);

    const search = screen.getByPlaceholderText("Search");
    await user.type(search, "hello");

    expect(search).toHaveValue("hello");
  });
  it("should call setSearchParams once with correct value on form submit", async () => {
    const user = userEvent.setup();
    const setSearchParamsMock = vi.fn();

    render(<NavBar setSearchParams={setSearchParamsMock} />);

    const search = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button");

    await user.type(search, "test search");
    await user.click(button);

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      searchTerm: "test search",
    });
    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
  });
  it("should call setSearchParams once after pressing Enter", async () => {
    const user = userEvent.setup();
    const setSearchParamsMock = vi.fn();

    render(<NavBar setSearchParams={setSearchParamsMock} />);

    const search = screen.getByPlaceholderText("Search");

    await user.type(search, "test search 2");
    await user.keyboard("{Enter}");

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      searchTerm: "test search 2",
    });
    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
  });
  it("searches with empty input after form submit", async () => {
    const user = userEvent.setup();
    const setSearchParamsMock = vi.fn();

    render(<NavBar setSearchParams={setSearchParamsMock} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      searchTerm: "",
    });
  });
});
