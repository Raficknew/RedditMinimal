import { describe, expect, it } from "vitest";
import { render, screen } from "./test-utils";
import App from "../App";
import { fireEvent } from "@testing-library/dom";

describe("App Properly Renders", () => {
  it("should render the App component without crashing", () => {
    render(<App />);
    screen.debug();
  });
});
